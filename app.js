/**
 * Aadith Thiruvangadan - Project Portfolio Script
 * Handles theme toggling, ScrollSpy, dynamic SVG modal lightboxes, and printing.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollSpy();
    initModalViewer();
    initKeyboardAccessibility();
});

// ==========================================================================
// THEME TOGGLE FUNCTIONALITY
// ==========================================================================
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    // Check saved theme or default to system preference (but default light if none)
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        setDarkTheme();
    } else {
        setLightTheme();
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
        themeIcon.className = 'fa-solid fa-moon';
    }
}

function setDarkTheme() {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    
    const themeIcon = document.querySelector('#theme-toggle-btn i');
    if (themeIcon) {
        themeIcon.className = 'fa-solid fa-sun';
    }
}

// ==========================================================================
// DYNAMIC SVG MODAL LIGHTBOX
// ==========================================================================
function initModalViewer() {
    const containers = document.querySelectorAll('.screenshot-container');
    const modal = document.getElementById('image-modal');
    const svgContainer = document.getElementById('modal-svg-container');
    const modalImg = document.getElementById('modal-img-element');
    const modalCaption = document.getElementById('modal-caption');

    if (!modal || !svgContainer || !modalImg || !modalCaption) return;

    containers.forEach(container => {
        // Strip out inline onclick to avoid duplication
        container.removeAttribute('onclick');

        container.addEventListener('click', (e) => {
            const svgChild = container.querySelector('svg');
            const imgChild = container.querySelector('img');
            let caption = container.getAttribute('data-caption');
            if (!caption && imgChild) {
                caption = imgChild.getAttribute('alt');
            }
            if (!caption && container.nextElementSibling && container.nextElementSibling.classList.contains('caption')) {
                caption = container.nextElementSibling.textContent;
            }
            if (!caption) {
                caption = 'Project interface view mockup';
            }

            if (svgChild) {
                // Clear any previous SVGs
                svgContainer.innerHTML = '';
                
                // Clone the SVG
                const clonedSvg = svgChild.cloneNode(true);
                
                // Scale SVG for lightbox modal view
                clonedSvg.setAttribute('width', '100%');
                clonedSvg.setAttribute('height', 'auto');
                clonedSvg.style.maxWidth = '600px';
                clonedSvg.style.display = 'block';

                svgContainer.appendChild(clonedSvg);
                svgContainer.style.display = 'block';
                modalImg.style.display = 'none';
            } else {
                // Fallback to image if no SVG
                const img = container.querySelector('img');
                if (img) {
                    modalImg.src = img.src;
                    modalImg.style.display = 'block';
                    svgContainer.style.display = 'none';
                }
            }

            modalCaption.textContent = caption;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        });
    });
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
        const scrollPosition = window.scrollY + 140; // Offset for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Fallback for top of page
        if (window.scrollY < 180) {
            currentSectionId = 'about'; // Default active is about
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
// KEYBOARD ACCESSIBILITY
// ==========================================================================
function initKeyboardAccessibility() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}
