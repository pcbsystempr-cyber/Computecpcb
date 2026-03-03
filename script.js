// Chatbot Function - Opens external AI tutor
function openChatbot() {
    window.open('https://computec-ai-tutor-31755169330.us-west1.run.app/', '_blank');
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Theme Toggle (Dark/Light Mode)
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeButton(true);
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButton(isDark);
});

function updateThemeButton(isDark) {
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span');
    if (isDark) {
        icon.className = 'fas fa-sun';
        text.textContent = 'Modo Claro';
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = 'Modo Oscuro';
    }
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Animate growth bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const growthBars = entry.target.querySelectorAll('.growth-fill');
            growthBars.forEach(bar => {
                const growth = bar.getAttribute('data-growth');
                bar.style.width = growth + '%';
            });
        }
    });
}, observerOptions);

const projectionsSection = document.querySelector('.projections');
if (projectionsSection) {
    observer.observe(projectionsSection);
}

// Chatbot functionality removed - now opens external AI tutor

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Welcome Pop-up
const welcomePopup = document.getElementById('welcomePopup');
const closePopup = document.getElementById('closePopup');
const dontShowAgain = document.getElementById('dontShowAgain');

// Show popup on page load if not dismissed
window.addEventListener('load', () => {
    const popupDismissed = localStorage.getItem('popupDismissed');
    if (!popupDismissed) {
        setTimeout(() => {
            welcomePopup.classList.add('active');
        }, 1000);
    }
});

function closeWelcomePopup() {
    welcomePopup.classList.remove('active');
    if (dontShowAgain.checked) {
        localStorage.setItem('popupDismissed', 'true');
    }
}

closePopup.addEventListener('click', closeWelcomePopup);

// Close popup when clicking outside
welcomePopup.addEventListener('click', (e) => {
    if (e.target === welcomePopup) {
        closeWelcomePopup();
    }
});

// Gaming Day Page
function openGamingDayPage() {
    window.open('https://hackerpcb3-byte.github.io/Gaming_Day_4/', '_blank');
}

// Tech Service Page
function openTechServicePage() {
    window.open('https://hackerpcb1.github.io/Servicio-Tecnico/', '_blank');
}

// View Project Function
function viewProject(projectId) {
    // URLs de los proyectos - Agrega los enlaces reales aquí
    const projectUrls = {
        'casa-abierta': 'https://hackerpcb1.github.io/Casa-Abierta/',
        'gaming-day': 'https://hackerpcb3-byte.github.io/Gaming_Day_4/',
        'servicio-tecnico': 'https://hackerpcb1.github.io/Servicio-Tecnico/',
        'pablo-colon': '#', // Agregar URL cuando esté disponible
        'apoyo-socioemocional': '#' // Agregar URL cuando esté disponible
    };

    const url = projectUrls[projectId];

    if (url && url !== '#') {
        window.open(url, '_blank');
    } else {
        alert(`El proyecto "${projectId}" estará disponible pronto.\n\nNuestros estudiantes están trabajando en completar este proyecto.`);
    }
}

// Career Modal Functions
function openCareerModal(careerId) {
    const careerData = {
        'desarrollador-software': {
            title: 'Desarrollador de Software',
            icon: 'fa-laptop-code',
            description: 'Los desarrolladores de software son profesionales que diseñan, crean, prueban y mantienen aplicaciones y sistemas informáticos. Utilizan lenguajes de programación para resolver problemas y crear soluciones tecnológicas innovadoras.',
            responsibilities: [
                'Diseñar y desarrollar aplicaciones y sistemas de software',
                'Escribir código limpio, eficiente y bien documentado',
                'Realizar pruebas y depuración de aplicaciones',
                'Colaborar con equipos multidisciplinarios',
                'Mantener y actualizar sistemas existentes',
                'Implementar medidas de seguridad en el código'
            ],
            skills: [
                'Dominio de lenguajes de programación (Python, Java, JavaScript, C++)',
                'Conocimiento de bases de datos (SQL, NoSQL)',
                'Frameworks y librerías modernas',
                'Control de versiones (Git)',
                'Metodologías ágiles (Scrum, Kanban)',
                'Resolución de problemas y pensamiento lógico'
            ],
            salary: '$35,000 - $75,000 anuales en Puerto Rico (dependiendo de experiencia)',
            companies: [
                'Evertec - Líder en procesamiento de transacciones',
                'Popular - Banco Popular de Puerto Rico',
                'FirstBank - Servicios financieros',
                'Wovenware - Desarrollo de software y AI',
                'EVERTEC - Soluciones tecnológicas',
                'Gobierno de Puerto Rico - Diversos departamentos',
                'Empresas de telecomunicaciones (Claro, Liberty)',
                'Startups tecnológicas locales'
            ],
            growth: 'El campo de desarrollo de software tiene un crecimiento proyectado del 22% hasta 2030. Es una de las carreras más demandadas en Puerto Rico y el mundo.',
            preparation: 'En COMPUTEC aprenderás programación básica en lenguajes de alta demanda, lógica de programación, y desarrollo de proyectos reales que te prepararán para esta carrera.',
            jobLinks: [
                { name: 'LinkedIn Jobs PR', url: 'https://www.linkedin.com/jobs/search/?keywords=desarrollador%20software&location=Puerto%20Rico' },
                { name: 'Indeed Puerto Rico', url: 'https://pr.indeed.com/jobs?q=desarrollador+software' },
                { name: 'Empleos Gobierno PR', url: 'https://www.trabajo.pr.gov/' }
            ]
        },
        'soporte-informatico': {
            title: 'Técnico en Soporte Informático',
            icon: 'fa-headset',
            description: 'Los técnicos de soporte informático ayudan a usuarios y organizaciones a resolver problemas técnicos con computadoras, software y redes. Son la primera línea de ayuda en cualquier empresa.',
            responsibilities: [
                'Diagnosticar y resolver problemas técnicos',
                'Instalar y configurar hardware y software',
                'Proporcionar asistencia técnica a usuarios',
                'Mantener documentación de problemas y soluciones',
                'Realizar mantenimiento preventivo de equipos',
                'Capacitar a usuarios en el uso de tecnología'
            ],
            skills: [
                'Conocimiento de sistemas operativos (Windows, macOS, Linux)',
                'Resolución de problemas de hardware y software',
                'Redes básicas y conectividad',
                'Excelentes habilidades de comunicación',
                'Paciencia y servicio al cliente',
                'Herramientas de diagnóstico y reparación'
            ],
            salary: '$25,000 - $45,000 anuales en Puerto Rico',
            companies: [
                'Hospitales y centros médicos',
                'Instituciones educativas',
                'Bancos y cooperativas',
                'Empresas de retail (Walmart, Costco)',
                'Gobierno de Puerto Rico',
                'Empresas de manufactura',
                'Hoteles y resorts',
                'Compañías de seguros'
            ],
            growth: 'Demanda constante con crecimiento del 9% proyectado. Cada empresa necesita soporte técnico.',
            preparation: 'COMPUTEC te especializa en diagnóstico, reparación y mantenimiento de computadoras, además de resolución de problemas tecnológicos.',
            jobLinks: [
                { name: 'LinkedIn Jobs PR', url: 'https://www.linkedin.com/jobs/search/?keywords=soporte%20tecnico&location=Puerto%20Rico' },
                { name: 'Indeed Puerto Rico', url: 'https://pr.indeed.com/jobs?q=soporte+informatico' },
                { name: 'Clasificados Online', url: 'https://www.clasificadosonline.com/empleos.asp' }
            ]
        },
        'administrador-redes': {
            title: 'Administrador de Redes',
            icon: 'fa-network-wired',
            description: 'Los administradores de redes diseñan, implementan y mantienen las redes de comunicación de una organización, asegurando conectividad confiable y segura.',
            responsibilities: [
                'Configurar y mantener routers, switches y firewalls',
                'Monitorear el rendimiento de la red',
                'Implementar medidas de seguridad de red',
                'Resolver problemas de conectividad',
                'Planificar expansiones de red',
                'Gestionar servidores y servicios de red'
            ],
            skills: [
                'Protocolos de red (TCP/IP, DNS, DHCP)',
                'Configuración de equipos Cisco/Juniper',
                'Seguridad de redes',
                'Virtualización y cloud computing',
                'Monitoreo de redes',
                'Certificaciones (CCNA, Network+)'
            ],
            salary: '$30,000 - $60,000 anuales en Puerto Rico',
            companies: [
                'Empresas de telecomunicaciones',
                'Instituciones financieras',
                'Gobierno de Puerto Rico',
                'Hospitales y sistemas de salud',
                'Universidades',
                'Empresas de manufactura',
                'Centros de datos',
                'Proveedores de servicios IT'
            ],
            growth: 'Crecimiento del 5% con demanda constante en infraestructura de red.',
            preparation: 'En COMPUTEC aprendes administración de redes, configuración de equipos y resolución de problemas de conectividad.',
            jobLinks: [
                { name: 'LinkedIn Jobs PR', url: 'https://www.linkedin.com/jobs/search/?keywords=administrador%20redes&location=Puerto%20Rico' },
                { name: 'Indeed Puerto Rico', url: 'https://pr.indeed.com/jobs?q=administrador+redes' },
                { name: 'Empleos Gobierno PR', url: 'https://www.trabajo.pr.gov/' }
            ]
        },
        'ciberseguridad': {
            title: 'Especialista en Ciberseguridad',
            icon: 'fa-user-shield',
            description: 'Los especialistas en ciberseguridad protegen sistemas, redes y datos de amenazas cibernéticas. Son guardianes digitales que previenen ataques y responden a incidentes de seguridad.',
            responsibilities: [
                'Monitorear sistemas en busca de amenazas',
                'Implementar medidas de seguridad',
                'Realizar auditorías de seguridad',
                'Responder a incidentes de seguridad',
                'Educar a empleados sobre seguridad',
                'Mantener políticas de seguridad actualizadas'
            ],
            skills: [
                'Conocimiento de amenazas y vulnerabilidades',
                'Herramientas de seguridad (firewalls, antivirus, IDS/IPS)',
                'Análisis de riesgos',
                'Ethical hacking y pentesting',
                'Cumplimiento normativo (HIPAA, PCI-DSS)',
                'Certificaciones (Security+, CEH, CISSP)'
            ],
            salary: '$40,000 - $80,000 anuales en Puerto Rico',
            companies: [
                'Bancos y instituciones financieras',
                'Empresas de seguros',
                'Hospitales y sistemas de salud',
                'Gobierno de Puerto Rico',
                'Evertec y procesadores de pagos',
                'Empresas de telecomunicaciones',
                'Consultoras de seguridad',
                'Empresas farmacéuticas'
            ],
            growth: 'Crecimiento explosivo del 33% proyectado. Una de las carreras más demandadas actualmente.',
            preparation: 'COMPUTEC te enseña fundamentos de ciberseguridad, ingeniería social, y prácticas de seguridad informática.',
            jobLinks: [
                { name: 'LinkedIn Jobs PR', url: 'https://www.linkedin.com/jobs/search/?keywords=ciberseguridad&location=Puerto%20Rico' },
                { name: 'Indeed Puerto Rico', url: 'https://pr.indeed.com/jobs?q=ciberseguridad' },
                { name: 'CyberSeek', url: 'https://www.cyberseek.org/index.html' }
            ]
        },
        'desarrollador-web': {
            title: 'Desarrollador Web',
            icon: 'fa-globe',
            description: 'Los desarrolladores web crean y mantienen sitios web y aplicaciones web. Combinan diseño, programación y experiencia de usuario para crear presencias digitales efectivas.',
            responsibilities: [
                'Diseñar y desarrollar sitios web responsivos',
                'Crear interfaces de usuario atractivas',
                'Desarrollar funcionalidades backend',
                'Optimizar rendimiento y SEO',
                'Integrar APIs y servicios externos',
                'Mantener y actualizar sitios existentes'
            ],
            skills: [
                'HTML5, CSS3, JavaScript',
                'Frameworks (React, Vue, Angular)',
                'Backend (Node.js, PHP, Python)',
                'Bases de datos',
                'Diseño responsivo',
                'Control de versiones (Git)'
            ],
            salary: '$30,000 - $65,000 anuales en Puerto Rico',
            companies: [
                'Agencias de marketing digital',
                'Empresas de e-commerce',
                'Startups tecnológicas',
                'Departamentos de IT corporativos',
                'Freelance y trabajo remoto',
                'Empresas de medios',
                'Instituciones educativas',
                'Gobierno de Puerto Rico'
            ],
            growth: 'Crecimiento del 13% con alta demanda de presencia digital.',
            preparation: 'En COMPUTEC aprendes programación web, HTML, CSS, JavaScript y desarrollo de proyectos web reales.',
            jobLinks: [
                { name: 'LinkedIn Jobs PR', url: 'https://www.linkedin.com/jobs/search/?keywords=desarrollador%20web&location=Puerto%20Rico' },
                { name: 'Indeed Puerto Rico', url: 'https://pr.indeed.com/jobs?q=desarrollador+web' },
                { name: 'Remote OK', url: 'https://remoteok.com/remote-web-developer-jobs' }
            ]
        },
        'programador-aplicaciones': {
            title: 'Programador de Aplicaciones',
            icon: 'fa-mobile-alt',
            description: 'Los programadores de aplicaciones desarrollan software para dispositivos móviles y de escritorio, creando apps que millones de personas usan diariamente.',
            responsibilities: [
                'Desarrollar aplicaciones móviles (iOS/Android)',
                'Crear aplicaciones de escritorio',
                'Diseñar interfaces intuitivas',
                'Integrar servicios en la nube',
                'Realizar pruebas de calidad',
                'Publicar y mantener apps en tiendas'
            ],
            skills: [
                'Desarrollo móvil (Swift, Kotlin, React Native)',
                'Desarrollo de escritorio (C#, Java, Electron)',
                'UI/UX design',
                'APIs y servicios web',
                'Bases de datos móviles',
                'Publicación en App Store/Play Store'
            ],
            salary: '$35,000 - $70,000 anuales en Puerto Rico',
            companies: [
                'Empresas de desarrollo de apps',
                'Startups tecnológicas',
                'Bancos (apps bancarias)',
                'Empresas de retail',
                'Agencias digitales',
                'Empresas de entretenimiento',
                'Servicios de delivery',
                'Trabajo remoto internacional'
            ],
            growth: 'Crecimiento del 22% con explosión de apps móviles.',
            preparation: 'COMPUTEC te enseña programación en lenguajes modernos y desarrollo de aplicaciones prácticas.',
            jobLinks: [
                { name: 'LinkedIn Jobs PR', url: 'https://www.linkedin.com/jobs/search/?keywords=programador%20aplicaciones&location=Puerto%20Rico' },
                { name: 'Indeed Puerto Rico', url: 'https://pr.indeed.com/jobs?q=programador+aplicaciones' },
                { name: 'AngelList', url: 'https://angel.co/jobs' }
            ]
        },
        'tecnico-mantenimiento': {
            title: 'Técnico en Mantenimiento',
            icon: 'fa-wrench',
            description: 'Los técnicos en mantenimiento se especializan en reparación física de computadoras, instalación de componentes y mantenimiento preventivo de equipos tecnológicos.',
            responsibilities: [
                'Diagnosticar fallas de hardware',
                'Reparar y reemplazar componentes',
                'Realizar mantenimiento preventivo',
                'Instalar y configurar equipos nuevos',
                'Recuperar datos de discos dañados',
                'Limpiar y optimizar equipos'
            ],
            skills: [
                'Conocimiento de componentes de hardware',
                'Herramientas de diagnóstico',
                'Soldadura y reparación electrónica',
                'Instalación de sistemas operativos',
                'Recuperación de datos',
                'Atención al cliente'
            ],
            salary: '$24,000 - $42,000 anuales en Puerto Rico',
            companies: [
                'Tiendas de reparación de computadoras',
                'Best Buy y retailers tecnológicos',
                'Escuelas y universidades',
                'Hospitales',
                'Empresas de manufactura',
                'Gobierno de Puerto Rico',
                'Negocio propio/freelance',
                'Empresas de servicios IT'
            ],
            growth: 'Demanda estable con necesidad constante de reparaciones.',
            preparation: 'COMPUTEC se especializa en diagnóstico, reparación y mantenimiento de computadoras - ¡es nuestro enfoque principal!',
            jobLinks: [
                { name: 'LinkedIn Jobs PR', url: 'https://www.linkedin.com/jobs/search/?keywords=tecnico%20mantenimiento&location=Puerto%20Rico' },
                { name: 'Indeed Puerto Rico', url: 'https://pr.indeed.com/jobs?q=tecnico+mantenimiento' },
                { name: 'Clasificados Online', url: 'https://www.clasificadosonline.com/empleos.asp' }
            ]
        },
        'analista-sistemas': {
            title: 'Analista de Sistemas',
            icon: 'fa-chart-line',
            description: 'Los analistas de sistemas estudian los procesos de negocio y diseñan soluciones tecnológicas para mejorar la eficiencia organizacional.',
            responsibilities: [
                'Analizar necesidades de negocio',
                'Diseñar soluciones tecnológicas',
                'Documentar requisitos de sistemas',
                'Coordinar con desarrolladores',
                'Realizar pruebas de sistemas',
                'Capacitar usuarios finales'
            ],
            skills: [
                'Análisis de procesos de negocio',
                'Modelado de sistemas',
                'Documentación técnica',
                'Gestión de proyectos',
                'Comunicación efectiva',
                'Conocimiento de bases de datos y software empresarial'
            ],
            salary: '$32,000 - $60,000 anuales en Puerto Rico',
            companies: [
                'Bancos y cooperativas',
                'Empresas de seguros',
                'Gobierno de Puerto Rico',
                'Hospitales',
                'Empresas de manufactura',
                'Consultoras IT',
                'Universidades',
                'Empresas de retail'
            ],
            growth: 'Crecimiento del 9% con demanda en transformación digital.',
            preparation: 'COMPUTEC te enseña a analizar problemas tecnológicos, diseñar soluciones y trabajar con sistemas informáticos.',
            jobLinks: [
                { name: 'LinkedIn Jobs PR', url: 'https://www.linkedin.com/jobs/search/?keywords=analista%20sistemas&location=Puerto%20Rico' },
                { name: 'Indeed Puerto Rico', url: 'https://pr.indeed.com/jobs?q=analista+sistemas' },
                { name: 'Empleos Gobierno PR', url: 'https://www.trabajo.pr.gov/' }
            ]
        }
    };
    const career = careerData[careerId];
    if (!career) return;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="career-header">
            <i class="fas ${career.icon} career-icon"></i>
            <h2>${career.title}</h2>
        </div>

        <div class="career-section">
            <h3><i class="fas fa-info-circle"></i> ¿Qué es?</h3>
            <p>${career.description}</p>
        </div>

        <div class="career-section">
            <h3><i class="fas fa-tasks"></i> Responsabilidades</h3>
            <ul class="career-list">
                ${career.responsibilities.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="career-section">
            <h3><i class="fas fa-star"></i> Habilidades Requeridas</h3>
            <ul class="career-list">
                ${career.skills.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="career-section salary-section">
            <h3><i class="fas fa-dollar-sign"></i> Salario Promedio</h3>
            <p class="salary-info">${career.salary}</p>
        </div>

        <div class="career-section">
            <h3><i class="fas fa-building"></i> Empresas que Contratan en Puerto Rico</h3>
            <ul class="companies-list">
                ${career.companies.map(company => `<li><i class="fas fa-check-circle"></i> ${company}</li>`).join('')}
            </ul>
        </div>

        <div class="career-section">
            <h3><i class="fas fa-chart-line"></i> Proyección de Crecimiento</h3>
            <p>${career.growth}</p>
        </div>

        <div class="career-section computec-section">
            <h3><i class="fas fa-graduation-cap"></i> Cómo COMPUTEC te Prepara</h3>
            <p>${career.preparation}</p>
        </div>

        <div class="career-section">
            <h3><i class="fas fa-search"></i> Buscar Empleos</h3>
            <div class="job-links">
                ${career.jobLinks.map(link => `
                    <a href="${link.url}" target="_blank" class="job-link-btn">
                        <i class="fas fa-external-link-alt"></i> ${link.name}
                    </a>
                `).join('')}
            </div>
        </div>
    `;

    document.getElementById('careerModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCareerModal() {
    document.getElementById('careerModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('careerModal');
    if (event.target === modal) {
        closeCareerModal();
    }
}

// Contact Form Functions
function submitContactForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // Get form values
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    const newsletter = document.getElementById('contactNewsletter').checked;
    
    // In a real implementation, you would send this data to a server
    // For now, we'll simulate a successful submission
    console.log('Form submitted:', {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        newsletter: newsletter
    });
    
    // Hide form and show success message
    form.style.display = 'none';
    formSuccess.style.display = 'block';
    
    // Scroll to success message
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function resetContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // Reset form
    form.reset();
    
    // Show form and hide success message
    form.style.display = 'flex';
    formSuccess.style.display = 'none';
}

// Tech Service Form - Ya no se usa, redirige a página externa
// const techServiceForm = document.getElementById('techServiceForm');
// if (techServiceForm) {
//     techServiceForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const teacherName = document.getElementById('teacherName').value;
//         const serviceType = document.getElementById('serviceType').value;
//         const priority = document.getElementById('priority').value;
//
//         alert(`¡Solicitud recibida!\n\nMaestro: ${teacherName}\nServicio: ${serviceType}\nPrioridad: ${priority}\n\nNos pondremos en contacto contigo pronto para atender tu solicitud.`);
//         techServiceForm.reset();
//     });
// }

// Smooth scroll animation for all sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Tour Guiado
let currentTourStep = 0;
const tourSteps = [
    {
        element: '#sobre-nosotros',
        title: '📚 Sobre COMPUTEC',
        description: 'Conoce nuestro programa especializado en tecnología, diagnóstico y reparación de computadoras.'
    },
    {
        element: '#cursos',
        title: '💻 Nuestros Cursos',
        description: 'Explora los 10 cursos principales que ofrecemos: desde programación hasta ciberseguridad y realidad virtual.'
    },
    {
        element: '#proyectos',
        title: '🚀 Proyectos Estudiantiles',
        description: 'Descubre los increíbles proyectos web creados por nuestros estudiantes de COMPUTEC.'
    },
    {
        element: '.employment-opportunities',
        title: '💼 Oportunidades de Empleo',
        description: 'Conoce las carreras disponibles para nuestros graduados. Haz clic en cualquiera para ver detalles completos.'
    },
    {
        element: '#contacto',
        title: '📧 Contáctanos',
        description: '¿Tienes preguntas? Aquí puedes enviarnos un mensaje o encontrar nuestra información de contacto.'
    }
];

function startTour() {
    closeWelcomePopup();
    currentTourStep = 0;
    document.getElementById('tourOverlay').style.display = 'block';
    showTourStep();
}

function showTourStep() {
    if (currentTourStep >= tourSteps.length) {
        endTour();
        return;
    }

    const step = tourSteps[currentTourStep];
    const element = document.querySelector(step.element);

    if (!element) {
        nextTourStep();
        return;
    }

    // Scroll to element
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Update tooltip content
    document.getElementById('tourTitle').textContent = step.title;
    document.getElementById('tourDescription').textContent = step.description;
    document.getElementById('tourStep').textContent = `Paso ${currentTourStep + 1} de ${tourSteps.length}`;

    // Position tooltip
    setTimeout(() => {
        const rect = element.getBoundingClientRect();
        const tooltip = document.querySelector('.tour-tooltip');
        const spotlight = document.querySelector('.tour-spotlight');

        // Position spotlight
        spotlight.style.top = `${rect.top + window.scrollY - 20}px`;
        spotlight.style.left = `${rect.left - 20}px`;
        spotlight.style.width = `${rect.width + 40}px`;
        spotlight.style.height = `${rect.height + 40}px`;

        // Position tooltip
        const tooltipTop = rect.bottom + window.scrollY + 20;
        tooltip.style.top = `${tooltipTop}px`;
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';

        // Show elements
        spotlight.style.opacity = '1';
        tooltip.style.opacity = '1';
    }, 500);
}

function nextTourStep() {
    currentTourStep++;
    if (currentTourStep < tourSteps.length) {
        showTourStep();
    } else {
        endTour();
    }
}

function skipTour() {
    endTour();
}

function endTour() {
    const overlay = document.getElementById('tourOverlay');
    overlay.style.display = 'none';
    document.querySelector('.tour-spotlight').style.opacity = '0';
    document.querySelector('.tour-tooltip').style.opacity = '0';
    currentTourStep = 0;
}
