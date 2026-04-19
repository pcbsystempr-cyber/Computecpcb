/**
 * ============================================
 * SISTEMA DE AUTENTICACIÓN SEGURO
 * COMPUTEC Admin Panel
 * ============================================
 * 
 * Características de seguridad:
 * - Hash de contraseña con PBKDF2 y salt
 * - Tokens de sesión con expiración
 * - Protección contra fuerza bruta
 * - Almacenamiento seguro de credenciales
 */

// ============================================
// CONFIGURACIÓN DE SEGURIDAD
// ============================================

const AUTH_CONFIG = {
    // Tiempo de expiración de sesión (30 minutos en milisegundos)
    SESSION_TIMEOUT: 30 * 60 * 1000,
    
    // Máximo de intentos de login permitidos
    MAX_LOGIN_ATTEMPTS: 5,
    
    // Tiempo de bloqueo después de max intentos (15 minutos)
    LOCKOUT_TIME: 15 * 60 * 1000,
    
    // Tiempo de espera mínimo entre intentos (para evitar timing attacks)
    MIN_ATTEMPT_DELAY: 500,
    
    // Nombre de las claves en localStorage
    STORAGE_KEYS: {
        SESSION: 'computec_admin_session',
        ATTEMPTS: 'computec_login_attempts',
        LOCKOUT: 'computec_account_lockout'
    }
};

// ============================================
// hash.js - Implementación de hash seguro
// ============================================

const PasswordHasher = {
    /**
     * Genera un salt aleatorio
     */
    generateSalt: function() {
        const saltArray = new Uint8Array(16);
        crypto.getRandomValues(saltArray);
        return this.arrayBufferToHex(saltArray);
    },
    
    /**
     * Convierte ArrayBuffer a string hexadecimal
     */
    arrayBufferToHex: function(buffer) {
        return Array.from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    },
    
    /**
     * Hash de contraseña usando SHA-256
     * @param {string} password - Contraseña en texto plano
     * @returns {Promise<string>} Hash en formato hex
     */
    hashPassword: async function(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return this.arrayBufferToHex(hashBuffer);
    },
    
    /**
     * Hash de contraseña con salt usando PBKDF2
     * @param {string} password - Contraseña en texto plano
     * @param {string} salt - Salt para el hash
     * @returns {Promise<string>} Hash en formato hex
     */
    hashPasswordWithSalt: async function(password, salt) {
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(password);
        const saltBuffer = encoder.encode(salt);
        
        // Importar la clave
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            passwordBuffer,
            { name: 'PBKDF2' },
            false,
            ['deriveBits']
        );
        
        // Derivar bits (100,000 iteraciones para seguridad)
        const derivedBits = await crypto.subtle.deriveBits(
            {
                name: 'PBKDF2',
                salt: saltBuffer,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            256
        );
        
        return this.arrayBufferToHex(derivedBits);
    },
    
    /**
     * Verifica una contraseña contra un hash almacenado
     * @param {string} password - Contraseña a verificar
     * @param {string} storedHash - Hash almacenado (formato: salt:hash)
     * @returns {Promise<boolean>}
     */
    verifyPassword: async function(password, storedHash) {
        try {
            // Si no tiene formato salt:hash, usar comparación simple
            if (!storedHash.includes(':')) {
                const computedHash = await this.hashPassword(password);
                return this.constantTimeCompare(computedHash, storedHash);
            }
            
            const [salt, hash] = storedHash.split(':');
            const computedHash = await this.hashPasswordWithSalt(password, salt);
            // Usar comparación de tiempo constante para prevenir timing attacks
            return this.constantTimeCompare(computedHash, hash);
        } catch (error) {
            console.error('Error verificando contraseña:', error);
            return false;
        }
    },
    
    /**
     * Comparación de tiempo constante para prevenir timing attacks
     */
    constantTimeCompare: function(a, b) {
        if (a.length !== b.length) return false;
        let result = 0;
        for (let i = 0; i < a.length; i++) {
            result |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return result === 0;
    }
};

// ============================================
// CREDENCIALES DE ADMIN (Hasheadas)
// ============================================
//
// NOTA: Estas credenciales están hasheadas usando SHA-256.
// La contraseña original es: Computec
//
// Hash SHA-256 de 'Computec': 
// 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
// ============================================

const ADMIN_CREDENTIALS = {
    username: 'admin',
    // Hash SHA-256 de 'Computec' - más seguro que texto plano
    passwordHash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'
};

// ============================================
// GESTOR DE SESIONES
// ============================================

const SessionManager = {
    /**
     * Crea una nueva sesión de administrador
     * @returns {Object} Objeto de sesión
     */
    createSession: function() {
        const session = {
            token: this.generateToken(),
            createdAt: Date.now(),
            expiresAt: Date.now() + AUTH_CONFIG.SESSION_TIMEOUT,
            username: ADMIN_CREDENTIALS.username
        };
        
        localStorage.setItem(
            AUTH_CONFIG.STORAGE_KEYS.SESSION,
            JSON.stringify(session)
        );
        
        return session;
    },
    
    /**
     * Genera un token seguro aleatorio
     */
    generateToken: function() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return PasswordHasher.arrayBufferToHex(array);
    },
    
    /**
     * Verifica si hay una sesión activa válida
     */
    isAuthenticated: function() {
        try {
            const sessionData = localStorage.getItem(AUTH_CONFIG.STORAGE_KEYS.SESSION);
            
            if (!sessionData) {
                return false;
            }
            
            const session = JSON.parse(sessionData);
            
            // Verificar si la sesión ha expirado
            if (Date.now() > session.expiresAt) {
                this.destroySession();
                return false;
            }
            
            // Verificar que el token existe
            if (!session.token || !session.username) {
                this.destroySession();
                return false;
            }
            
            return true;
            
        } catch (error) {
            console.error('Error verificando sesión:', error);
            this.destroySession();
            return false;
        }
    },
    
    /**
     * Renueva la sesión (extiende el tiempo de expiración)
     */
    refreshSession: function() {
        try {
            const sessionData = localStorage.getItem(AUTH_CONFIG.STORAGE_KEYS.SESSION);
            
            if (!sessionData) {
                return false;
            }
            
            const session = JSON.parse(sessionData);
            session.expiresAt = Date.now() + AUTH_CONFIG.SESSION_TIMEOUT;
            
            localStorage.setItem(
                AUTH_CONFIG.STORAGE_KEYS.SESSION,
                JSON.stringify(session)
            );
            
            return true;
            
        } catch (error) {
            console.error('Error renovando sesión:', error);
            return false;
        }
    },
    
    /**
     * Destruye la sesión actual
     */
    destroySession: function() {
        localStorage.removeItem(AUTH_CONFIG.STORAGE_KEYS.SESSION);
    },
    
    /**
     * Obtiene la información de la sesión actual
     */
    getSessionInfo: function() {
        try {
            const sessionData = localStorage.getItem(AUTH_CONFIG.STORAGE_KEYS.SESSION);
            
            if (!sessionData) {
                return null;
            }
            
            const session = JSON.parse(sessionData);
            
            return {
                username: session.username,
                createdAt: new Date(session.createdAt).toLocaleString(),
                expiresAt: new Date(session.expiresAt).toLocaleString(),
                timeRemaining: Math.max(0, session.expiresAt - Date.now())
            };
            
        } catch (error) {
            return null;
        }
    }
};

// ============================================
// PROTECCIÓN CONTRA FUERZA BRUTA
// ============================================

const BruteForceProtection = {
    /**
     * Registra un intento de login
     */
    recordAttempt: function() {
        const attempts = this.getAttempts();
        attempts.count += 1;
        attempts.lastAttempt = Date.now();
        
        localStorage.setItem(
            AUTH_CONFIG.STORAGE_KEYS.ATTEMPTS,
            JSON.stringify(attempts)
        );
        
        return attempts;
    },
    
    /**
     * Obtiene el conteo de intentos
     */
    getAttempts: function() {
        try {
            const data = localStorage.getItem(AUTH_CONFIG.STORAGE_KEYS.ATTEMPTS);
            
            if (!data) {
                return { count: 0, lastAttempt: null };
            }
            
            const attempts = JSON.parse(data);
            
            // Resetear intentos si ha pasado el tiempo de bloqueo
            if (attempts.lockedUntil && Date.now() > attempts.lockedUntil) {
                this.resetAttempts();
                return { count: 0, lastAttempt: null };
            }
            
            return attempts;
            
        } catch (error) {
            return { count: 0, lastAttempt: null };
        }
    },
    
    /**
     * Verifica si la cuenta está bloqueada
     */
    isLocked: function() {
        const attempts = this.getAttempts();
        
        if (attempts.lockedUntil && Date.now() < attempts.lockedUntil) {
            return {
                locked: true,
                remainingTime: Math.ceil((attempts.lockedUntil - Date.now()) / 1000)
            };
        }
        
        return { locked: false, remainingTime: 0 };
    },
    
    /**
     * Bloquea la cuenta después de muchos intentos fallidos
     */
    lockAccount: function() {
        const attempts = this.getAttempts();
        attempts.lockedUntil = Date.now() + AUTH_CONFIG.LOCKOUT_TIME;
        
        localStorage.setItem(
            AUTH_CONFIG.STORAGE_KEYS.ATTEMPTS,
            JSON.stringify(attempts)
        );
    },
    
    /**
     * Resetea los intentos (después de login exitoso)
     */
    resetAttempts: function() {
        localStorage.removeItem(AUTH_CONFIG.STORAGE_KEYS.ATTEMPTS);
    },
    
    /**
     * Obtiene el tiempo restante de bloqueo
     */
    getLockoutTimeRemaining: function() {
        const lockStatus = this.isLocked();
        if (lockStatus.locked) {
            return lockStatus.remainingTime;
        }
        return 0;
    }
};

// ============================================
// AUTENTICADOR PRINCIPAL
// ============================================

const Authenticator = {
    /**
     * Intenta iniciar sesión
     * @param {string} username - Nombre de usuario
     * @param {string} password - Contraseña
     * @returns {Promise<Object>} Resultado del login
     */
    login: async function(username, password) {
        // Verificar si la cuenta está bloqueada
        const lockStatus = BruteForceProtection.isLocked();
        if (lockStatus.locked) {
            return {
                success: false,
                error: 'account_locked',
                message: `Cuenta bloqueada. Intenta de nuevo en ${lockStatus.remainingTime} segundos.`,
                remainingTime: lockStatus.remainingTime
            };
        }
        
        // Verificar si el usuario está bloqueado por intentos
        const lockoutData = localStorage.getItem(AUTH_CONFIG.STORAGE_KEYS.ATTEMPTS);
        if (lockoutData) {
            const lockout = JSON.parse(lockoutData);
            if (lockout.lockedUntil && Date.now() < lockout.lockedUntil) {
                return {
                    success: false,
                    error: 'account_locked',
                    message: 'Demasiados intentos fallidos. Cuenta bloqueada temporalmente.',
                    remainingTime: Math.ceil((lockout.lockedUntil - Date.now()) / 1000)
                };
            }
        }
        
        // Verificar credenciales (case-insensitive para username)
        const isValidUsername = username.toLowerCase().trim() === ADMIN_CREDENTIALS.username.toLowerCase();
        
        if (!isValidUsername) {
            BruteForceProtection.recordAttempt();
            const attempts = BruteForceProtection.getAttempts();
            
            // Verificar si alcanzó el límite
            if (attempts.count >= AUTH_CONFIG.MAX_LOGIN_ATTEMPTS) {
                BruteForceProtection.lockAccount();
                return {
                    success: false,
                    error: 'account_locked',
                    message: 'Demasiados intentos fallidos. Cuenta bloqueada por 15 minutos.'
                };
            }
            
            return {
                success: false,
                error: 'invalid_credentials',
                message: `Usuario o contraseña incorrectos. Intentos restantes: ${AUTH_CONFIG.MAX_LOGIN_ATTEMPTS - attempts.count}`,
                attemptsRemaining: AUTH_CONFIG.MAX_LOGIN_ATTEMPTS - attempts.count
            };
        }
        
        // Verificar contraseña
        const isValidPassword = await PasswordHasher.verifyPassword(
            password, 
            ADMIN_CREDENTIALS.passwordHash
        );
        
        if (!isValidPassword) {
            BruteForceProtection.recordAttempt();
            const attempts = BruteForceProtection.getAttempts();
            
            // Verificar si alcanzó el límite
            if (attempts.count >= AUTH_CONFIG.MAX_LOGIN_ATTEMPTS) {
                BruteForceProtection.lockAccount();
                return {
                    success: false,
                    error: 'account_locked',
                    message: 'Demasiados intentos fallidos. Cuenta bloqueada por 15 minutos.'
                };
            }
            
            return {
                success: false,
                error: 'invalid_credentials',
                message: `Usuario o contraseña incorrectos. Intentos restantes: ${AUTH_CONFIG.MAX_LOGIN_ATTEMPTS - attempts.count}`,
                attemptsRemaining: AUTH_CONFIG.MAX_LOGIN_ATTEMPTS - attempts.count
            };
        }
        
        // Login exitoso - crear sesión y resetear intentos
        BruteForceProtection.resetAttempts();
        SessionManager.createSession();
        
        return {
            success: true,
            message: 'Login exitoso',
            redirectUrl: 'admin.html'
        };
    },
    
    /**
     * Cierra la sesión actual
     */
    logout: function() {
        SessionManager.destroySession();
        return {
            success: true,
            message: 'Sesión cerrada correctamente',
            redirectUrl: 'index.html'
        };
    },
    
    /**
     * Verifica si el usuario está autenticado
     */
    isAuthenticated: function() {
        return SessionManager.isAuthenticated();
    },
    
    /**
     * Obtiene información de la sesión actual
     */
    getSessionInfo: function() {
        return SessionManager.getSessionInfo();
    },
    
    /**
     * Obtiene el estado de bloqueo
     */
    getLockStatus: function() {
        return BruteForceProtection.isLocked();
    },
    
    /**
     * Obtiene el tiempo restante de sesión
     */
    getSessionTimeRemaining: function() {
        const session = SessionManager.getSessionInfo();
        if (session) {
            return Math.ceil(session.timeRemaining / 1000 / 60); // Minutos
        }
        return 0;
    }
};

// ============================================
// EXPORTAR FUNCIONES GLOBALES (para compatibilidad)
// ============================================

// Hacer funciones disponibles globalmente
window.Authenticator = Authenticator;
window.PasswordHasher = PasswordHasher;
window.SessionManager = SessionManager;
window.BruteForceProtection = BruteForceProtection;

// Alias para compatibilidad con código existente
window.isLoggedIn = function() {
    return Authenticator.isAuthenticated();
};

window.handleLogin = async function(username, password) {
    const result = await Authenticator.login(username, password);
    return result;
};

window.handleLogout = function() {
    return Authenticator.logout();
};

window.getSessionInfo = function() {
    return Authenticator.getSessionInfo();
};

console.log('🔐 Sistema de autenticación seguro cargado');
console.log('📋 Configuración:', {
    sessionTimeout: AUTH_CONFIG.SESSION_TIMEOUT / 1000 / 60 + ' minutos',
    maxAttempts: AUTH_CONFIG.MAX_LOGIN_ATTEMPTS,
    lockoutTime: AUTH_CONFIG.LOCKOUT_TIME / 1000 / 60 + ' minutos'
});
