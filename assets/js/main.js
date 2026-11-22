/*==================== DYNAMIC YEAR ====================*/
const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

/*==================== SHOW / HIDE MOBILE MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU ON LINK CLICK ====================*/
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('show-menu');
        }
    });
});

/*==================== SCROLL PROGRESS BAR ====================*/
const scrollProgressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    if (scrollProgressBar) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        scrollProgressBar.style.width = `${progress}%`;
    }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 120,
              sectionId = current.getAttribute('id');
        
        const navTarget = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
        if (navTarget) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navTarget.classList.add('active-link');
            } else {
                navTarget.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== SHOW SCROLL TOP BUTTON ====================*/
const scrollTop = document.getElementById('scroll-top');
function checkScrollTop() {
    if (scrollTop) {
        if (window.scrollY >= 400) {
            scrollTop.classList.add('show-scroll');
        } else {
            scrollTop.classList.remove('show-scroll');
        }
    }
}
window.addEventListener('scroll', checkScrollTop);

/*==================== DARK / LIGHT THEME TOGGLE ====================*/
const themeButton = document.getElementById('theme-button');
const themeIcon = document.getElementById('theme-icon');
const darkThemeClass = 'dark-theme';
const lightThemeClass = 'light-theme';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('jay-selected-theme');

// Apply stored theme or default to dark
if (selectedTheme === 'light') {
    document.body.classList.remove(darkThemeClass);
    document.body.classList.add(lightThemeClass);
    if (themeIcon) {
        themeIcon.classList.replace('bx-sun', 'bx-moon');
    }
} else {
    document.body.classList.add(darkThemeClass);
    document.body.classList.remove(lightThemeClass);
    if (themeIcon) {
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    }
}

if (themeButton) {
    themeButton.addEventListener('click', () => {
        if (document.body.classList.contains(darkThemeClass)) {
            document.body.classList.remove(darkThemeClass);
            document.body.classList.add(lightThemeClass);
            if (themeIcon) themeIcon.classList.replace('bx-sun', 'bx-moon');
            localStorage.setItem('jay-selected-theme', 'light');
        } else {
            document.body.classList.remove(lightThemeClass);
            document.body.classList.add(darkThemeClass);
            if (themeIcon) themeIcon.classList.replace('bx-moon', 'bx-sun');
            localStorage.setItem('jay-selected-theme', 'dark');
        }
    });
}

/*==================== TYPEWRITER EFFECT ====================*/
const typingElement = document.getElementById('typing-text');
const roles = [
    'M.Sc. IT Student & Developer',
    'Web & Full-Stack Enthusiast',
    'IoT & ESP32 Innovator',
    'Python & Software Programmer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 45;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 95;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400;
    }

    setTimeout(typeWriter, typeSpeed);
}
document.addEventListener('DOMContentLoaded', typeWriter);

/*==================== SKILLS CATEGORY TABS ====================*/
const skillTabs = document.querySelectorAll('.skills__tab');
const skillCards = document.querySelectorAll('.skill__card');

skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const targetCategory = tab.getAttribute('data-tab');

        skillCards.forEach(card => {
            const categories = card.getAttribute('data-category') || '';
            if (targetCategory === 'all' || categories.includes(targetCategory)) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });
    });
});

/*==================== WORK / PROJECTS FILTER ====================*/
const filterButtons = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work__card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        workCards.forEach(card => {
            const categories = card.getAttribute('data-category') || '';
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });
    });
});

/*==================== 3D INTERACTIVE PARTICLE NEBULA ====================*/
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight || 650;
    let centerX = width / 2;
    let centerY = height / 2;

    const fov = 420;
    const particleCount = Math.min(Math.floor(width / 18), 70);
    const maxZ = 280;
    const minZ = -280;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = canvas.parentElement.offsetHeight || 650;
        centerX = width / 2;
        centerY = height / 2;
    });

    // Mouse movement rotates 3D particle camera
    window.addEventListener('mousemove', (e) => {
        const normX = (e.clientX - centerX) / (width / 2);
        const normY = (e.clientY - centerY) / (height / 2);
        targetRotY = normX * 0.45;
        targetRotX = -normY * 0.45;
    });

    class Particle3D {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = (Math.random() - 0.5) * width * 1.2;
            this.y = (Math.random() - 0.5) * height * 1.2;
            this.z = (Math.random() - 0.5) * (maxZ - minZ);
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.vz = (Math.random() - 0.5) * 0.7;
            this.baseRadius = Math.random() * 2.2 + 1.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.z += this.vz;

            const boundX = width * 0.65;
            const boundY = height * 0.65;

            if (this.x < -boundX || this.x > boundX) this.vx *= -1;
            if (this.y < -boundY || this.y > boundY) this.vy *= -1;
            if (this.z < minZ || this.z > maxZ) this.vz *= -1;
        }

        getProjected(rotX, rotY) {
            // Rotate around Y axis
            const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
            const x1 = this.x * cosY + this.z * sinY;
            const z1 = -this.x * sinY + this.z * cosY;

            // Rotate around X axis
            const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
            const y2 = this.y * cosX - z1 * sinX;
            const z2 = this.y * sinX + z1 * cosX;

            const scale = fov / (fov + z2 + 350);
            return {
                x: centerX + x1 * scale,
                y: centerY + y2 * scale,
                scale: Math.max(0.1, scale),
                z: z2
            };
        }
    }

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle3D());
    }

    function animate3DParticles() {
        ctx.clearRect(0, 0, width, height);

        // Smooth camera damping
        currentRotX += (targetRotX - currentRotX) * 0.05;
        currentRotY += (targetRotY - currentRotY) * 0.05;

        const projected = [];
        const isDark = document.body.classList.contains('dark-theme');

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            const p = particles[i].getProjected(currentRotX, currentRotY);
            projected.push(p);

            // Draw 3D Particle
            const alpha = Math.min(1, Math.max(0.15, (p.z - minZ) / (maxZ - minZ) * 0.9));
            const radius = particles[i].baseRadius * p.scale;

            ctx.fillStyle = isDark
                ? `rgba(99, 102, 241, ${alpha * 0.85})`
                : `rgba(79, 70, 229, ${alpha * 0.65})`;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.5, radius), 0, Math.PI * 2);
            ctx.fill();

            // Glow for closer particles
            if (p.scale > 0.8) {
                ctx.fillStyle = `rgba(34, 211, 238, ${alpha * 0.4})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(1, radius * 1.8), 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Draw 3D connection webs
        for (let i = 0; i < projected.length; i++) {
            for (let j = i + 1; j < projected.length; j++) {
                const dx = projected[i].x - projected[j].x;
                const dy = projected[i].y - projected[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 115) {
                    const depthAlpha = (1 - dist / 115) * 0.28 * Math.min(projected[i].scale, projected[j].scale);
                    ctx.strokeStyle = isDark
                        ? `rgba(34, 211, 238, ${depthAlpha * 1.2})`
                        : `rgba(79, 70, 229, ${depthAlpha * 0.9})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(projected[i].x, projected[i].y);
                    ctx.lineTo(projected[j].x, projected[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate3DParticles);
    }
    animate3DParticles();
}

/*==================== TOAST NOTIFICATION HELPER ====================*/
function showToast(message, icon = 'bx-check-circle') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class='bx ${icon}' style="font-size: 1.25rem; color: #10b981;"></i><span>${message}</span>`;
    
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutToast 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

/*==================== COPY EMAIL TO CLIPBOARD ====================*/
function copyEmailToClipboard() {
    const email = 'jayajothi.it@gmail.com';
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
            showToast('Email copied to clipboard: ' + email);
        }).catch(() => fallbackCopy(email));
    } else {
        fallbackCopy(email);
    }
}

function fallbackCopy(text) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast('Email copied to clipboard: ' + text);
}

const heroCopyBtn = document.getElementById('copy-email-hero');
if (heroCopyBtn) {
    heroCopyBtn.addEventListener('click', copyEmailToClipboard);
}

const contactEmailCard = document.getElementById('contact-email-card');
if (contactEmailCard) {
    contactEmailCard.addEventListener('click', copyEmailToClipboard);
}



/*==================== PROJECT CASE STUDY MODAL DATA & EVENTS ====================*/
const projectDetails = {
    1: {
        tag: 'M.Sc. 3rd Sem • IoT & Web',
        title: 'Smart Current Monitoring System (IoT)',
        problem: 'Excessive and unmonitored power consumption in residential and academic buildings often leads to unexpected electrical overheads and inability to detect energy leakage in real time.',
        workflow: 'Integrated non-invasive current sensors with an ESP32 microcontroller, streamed continuous energy telemetry via HTTP/REST APIs, recorded time-series measurements in MySQL, and engineered a responsive PHP/JavaScript web dashboard with live gauge widgets and analytical consumption charts.',
        insights: [
            'Monitored live electrical current and voltage draw continuously with sub-second sensor updates.',
            'Displayed dynamic web graphs enabling users to track peak hour usage patterns.',
            'Created threshold alerts notifying administrators of unexpected current spikes and overloads.'
        ],
        tech: ['ESP32', 'IoT', 'C/C++ Arduino', 'PHP', 'MySQL', 'Web Dashboard', 'Sensors']
    },
    2: {
        tag: 'M.Sc. 1st Sem • Web Development',
        title: 'Intelligent Conversational AI Chatbot',
        problem: 'Users frequently need instant answers to repetitive administrative and technical inquiries without waiting for manual human intervention.',
        workflow: 'Designed a lightweight, responsive conversational interface using HTML5, modern CSS, and JavaScript. Programmed server-side request processing in PHP to parse queries, match intents, fetch accurate answers from a MySQL knowledge base, and persist chat logs.',
        insights: [
            'Delivered instant automated query assistance 24/7 with zero response lag.',
            'Structured a scalable relational schema to log user questions and analyze frequently asked topics.',
            'Implemented responsive chat UI with typing indicators and conversational history.'
        ],
        tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Chatbot Logic', 'Full-Stack']
    },
    3: {
        tag: 'M.Sc. 2nd Sem • System Design',
        title: 'Academic Timetable & Notification System',
        problem: 'Manual timetable generation in educational institutions results in classroom conflicts, overlapping faculty schedules, and delayed communication during sudden room or hour changes.',
        workflow: 'Architected a relational database schema mapping courses, faculty, slots, and lecture halls. Developed scheduling validation algorithms in PHP to prevent clash scenarios and integrated an automated notification dispatch system to push real-time alerts to students.',
        insights: [
            'Completely eliminated lecture hall double-booking and schedule clash errors.',
            'Automated instant notifications for timetable adjustments and cancellations.',
            'Significantly enhanced coordination between department faculty, students, and administration.'
        ],
        tech: ['PHP', 'MySQL', 'JavaScript', 'Notification Alerts', 'Database Modeling', 'Scheduling Logic']
    },
    4: {
        tag: 'BCA Capstone • Group Project',
        title: 'Full-Stack Event Management System',
        problem: 'Coordinating campus and corporate events manually requires tedious paperwork, decentralized guest lists, and error-prone venue allocation.',
        workflow: 'Collaborated within a multidisciplinary team to gather requirements, design wireframes, build responsive frontend forms, and develop backend authentication, booking workflows, and MySQL relational storage.',
        insights: [
            'Successfully coordinated and delivered the complete software development lifecycle in a team.',
            'Streamlined event registrations, ticketing, and hall reservations in a centralized portal.',
            'Strengthened core competencies in full-stack web development, teamwork, and problem-solving.'
        ],
        tech: ['BCA Project', 'PHP', 'MySQL', 'HTML5/CSS3', 'JavaScript', 'Teamwork & Collaboration']
    },
    5: {
        tag: 'Frontend & 3D Engineering',
        title: 'Interactive 3D Responsive Portfolio',
        problem: 'Modern developers need a distinctive digital presence that exhibits creative frontend engineering, responsive design, and attention to detail.',
        workflow: 'Developed a mobile-first, zero-dependency portfolio with a custom 3D card tilt engine, specular glare reflections, 3D particle nebula, and seamless dark/light theme switching.',
        insights: [
            'Engineered 60 FPS smooth 3D tilt effects using CSS perspective and vanilla JavaScript.',
            'Integrated dynamic 3D orbital rings and 3D constellation canvas.',
            'Ensured 100% fluid mobile, tablet, and desktop responsive adaptation.'
        ],
        tech: ['HTML5', 'CSS3 3D', 'Vanilla JavaScript', 'Canvas 3D', 'Responsive Design']
    },
    6: {
        tag: 'M.Sc. 4th Sem • Upcoming Milestone',
        title: 'Industry Internship & Applied Software Development',
        problem: 'Applying academic computer science principles to production-scale software architectures requires practical industry immersion and real-world mentorship.',
        workflow: 'Actively preparing technical fundamentals across Web Development, Python Programming, IoT, and Database Systems to contribute effectively to software engineering teams as an immediate joiner.',
        insights: [
            'Solid foundation in BCA (63%) and advanced M.Sc. IT coursework.',
            'Proven track record of delivering 4 end-to-end academic software and IoT projects.',
            'Passionate learner eager to write clean code, solve real-world problems, and deliver impactful solutions.'
        ],
        tech: ['Software Development', 'Python', 'Web Dev', 'IoT', 'Immediate Joiner']
    }
};

const projectModal = document.getElementById('project-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');

function openProjectModal(id) {
    const project = projectDetails[id];
    if (!project || !projectModal) return;

    document.getElementById('modal-project-tag').textContent = project.tag;
    document.getElementById('modal-project-title').textContent = project.title;
    document.getElementById('modal-project-problem').textContent = project.problem;
    document.getElementById('modal-project-workflow').textContent = project.workflow;

    const insightsList = document.getElementById('modal-project-insights');
    insightsList.innerHTML = '';
    project.insights.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        insightsList.appendChild(li);
    });

    const techPills = document.getElementById('modal-project-tech');
    techPills.innerHTML = '';
    project.tech.forEach(t => {
        const span = document.createElement('span');
        span.textContent = t;
        techPills.appendChild(span);
    });

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Modal Trigger Buttons
document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        openProjectModal(id);
    });
});

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
}

if (projectModal) {
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
}

/*==================== RESUME PREVIEW MODAL ====================*/
const resumeModal = document.getElementById('resume-modal');
const resumeCloseBtn = document.getElementById('resume-close-btn');

function openResumeModal() {
    if (resumeModal) {
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeResumeModal() {
    if (resumeModal) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

const navResumeBtn = document.getElementById('nav-resume-btn');
const heroResumeBtn = document.getElementById('hero-resume-btn');
const aboutResumeBtn = document.getElementById('about-resume-btn');

if (navResumeBtn) navResumeBtn.addEventListener('click', openResumeModal);
if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModal);
if (aboutResumeBtn) aboutResumeBtn.addEventListener('click', openResumeModal);

if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', closeResumeModal);
}

if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            closeResumeModal();
        }
    });
}

// Global Escape Key to close active modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
        closeResumeModal();
    }
});

/*==================== CONTACT FORM SUBMISSION FEEDBACK ====================*/
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', () => {
        showToast('Sending message... Thank you for reaching out!');
    });
}

/*==================== SCROLL REVEAL ANIMATIONS ====================*/
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '45px',
        duration: 1500,
        delay: 150,
        reset: false
    });

    sr.reveal('.home__badge, .home__title, .home__role, .home__description, .home__cta-group, .home__quick-row, .home__social', { interval: 90 });
    sr.reveal('.home__visual', { origin: 'right', delay: 250 });
    sr.reveal('.stat__card', { interval: 90, origin: 'bottom', delay: 200 });
    
    sr.reveal('.section__subtitle, .section-title', {});
    sr.reveal('.about__visual', { origin: 'left', delay: 200 });
    sr.reveal('.about__content', { origin: 'right', delay: 250 });
    
    sr.reveal('.skills__level-banner', { origin: 'top', delay: 100 });
    sr.reveal('.skills__tab', { interval: 70 });
    sr.reveal('.skill__card', { interval: 80, origin: 'bottom' });
    
    
    sr.reveal('.timeline__item', { interval: 100, origin: 'left' });
    
    sr.reveal('.filter-btn', { interval: 70 });
    sr.reveal('.work__card', { interval: 90, origin: 'bottom' });
    
    sr.reveal('.contact__info', { origin: 'left', delay: 200 });
    sr.reveal('.contact__form-wrapper', { origin: 'right', delay: 250 });
}


/*==================== 3D TILT & SPECULAR GLARE ENGINE ====================*/
function init3DTiltEngine() {
    const tiltElements = document.querySelectorAll('[data-tilt="true"]');
    const maxTiltAngle = 14;

    tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Compute normalized 3D tilt angles
            const rotateX = ((y - centerY) / centerY) * -maxTiltAngle;
            const rotateY = ((x - centerX) / centerX) * maxTiltAngle;

            // Set mouse position for specular glare effect
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Apply 3D perspective rotation
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.035, 1.035, 1.035)`;
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // 3D Mouse Parallax on Hero Visual Blob
    const heroVisual = document.querySelector('.home__blob-wrapper');
    if (heroVisual) {
        window.addEventListener('mousemove', (e) => {
            const xVal = (e.clientX - window.innerWidth / 2) / 35;
            const yVal = (e.clientY - window.innerHeight / 2) / 35;
            heroVisual.style.transform = `perspective(1000px) rotateY(${xVal}deg) rotateX(${-yVal}deg)`;
        });
    }
}

document.addEventListener('DOMContentLoaded', init3DTiltEngine);
