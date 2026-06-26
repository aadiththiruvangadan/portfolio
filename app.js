/**
 * Aadith Thiruvangadan - Project Portfolio Script
 * Handles theme toggling, project tab transitions, ScrollSpy, and image modals.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollSpy();
    initKeyboardAccessibility();
});

// ==========================================================================
// THEME TOGGLE FUNCTIONALITY
// ==========================================================================
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    // Check saved theme or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        setLightTheme();
    } else {
        setDarkTheme();
    }

    // Toggle click listener
    themeBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            setLightTheme();
        } else {
            setDarkTheme();
        }
    });
}

function setLightTheme() {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
    
    const themeIcon = document.querySelector('#theme-toggle-btn i');
    if (themeIcon) {
        themeIcon.className = 'fa-solid fa-sun';
    }
}

function setDarkTheme() {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    
    const themeIcon = document.querySelector('#theme-toggle-btn i');
    if (themeIcon) {
        themeIcon.className = 'fa-solid fa-moon';
    }
}

// ==========================================================================
// PROJECT TABS SWITCHER
// ==========================================================================
function switchProject(projectNum) {
    const tabs = document.querySelectorAll('.project-tab-btn');
    const contents = document.querySelectorAll('.project-content-wrapper');

    tabs.forEach((tab, index) => {
        if (index + 1 === projectNum) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    contents.forEach((content, index) => {
        if (index + 1 === projectNum) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    // Smooth scroll project title into view if user is already looking at projects
    const projectsSection = document.getElementById('projects');
    const rect = projectsSection.getBoundingClientRect();
    if (rect.top < 100 && rect.bottom > 200) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==========================================================================
// IMAGE LIGHTBOX MODAL
// ==========================================================================
function openModal(imgSrc, captionText) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img-element');
    const modalCaption = document.getElementById('modal-caption');

    if (!modal || !modalImg || !modalCaption) return;

    modalImg.src = imgSrc;
    modalCaption.textContent = captionText;
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    if (!modal) return;
    
    modal.classList.remove('open');
    document.body.style.overflow = ''; // Restore scroll
}

// ==========================================================================
// SCROLL SPY FOR NAVIGATION
// ==========================================================================
function initScrollSpy() {
    const sections = document.querySelectorAll('.scroll-spy');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Offset for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Fallback for top of page
        if (window.scrollY < 200) {
            currentSectionId = 'about'; // default active
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================================================
// KEYBOARD ACCESSIBILITY & ESCAPE CLOSE
// ==========================================================================
function initKeyboardAccessibility() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}
