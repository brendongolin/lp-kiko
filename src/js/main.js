// Main JS - LP Kiko

document.addEventListener('DOMContentLoaded', () => {
    console.log('LP Kiko carregada com sucesso.');

    // ===== Mobile Menu Toggle =====
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Respect prefers-reduced-motion for animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reveal Animations on Scroll (Sections & Timelines)
    const revealElements = document.querySelectorAll('section, .timeline-item');
    const cascadeContainers = document.querySelectorAll('.reveal-cascade');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                
                // If it's a cascade container, stagger its reveal-items
                if (entry.target.classList.contains('reveal-cascade') && !prefersReducedMotion) {
                    const items = entry.target.querySelectorAll('.reveal-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('reveal-active');
                        }, index * 100); // 100ms stagger delay
                    });
                } else if (entry.target.classList.contains('reveal-cascade') && prefersReducedMotion) {
                    // Instantly reveal all if reduced motion is preferred
                    const items = entry.target.querySelectorAll('.reveal-item');
                    items.forEach(item => item.classList.add('reveal-active'));
                }
            }
        });
    }, { threshold: 0.05 });

    // Register simple reveal elements
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Register cascade containers
    cascadeContainers.forEach(el => {
        revealObserver.observe(el);
        // Initially ensure all children have reveal-item initialized if not present
        const items = el.querySelectorAll('.reveal-item');
        if (prefersReducedMotion) {
            items.forEach(item => item.classList.add('reveal-active'));
        }
    });

    // Parallax effect on Hero Background Image
    const heroBg = document.querySelector('.hero-parallax');
    if (heroBg && !prefersReducedMotion) {
        let ticked = false;
        window.addEventListener('scroll', () => {
            if (!ticked) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    // Slow scroll translation with slight zoom to prevent white gaps
                    heroBg.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0) scale(1.1)`;
                    ticked = false;
                });
                ticked = true;
            }
        }, { passive: true });
    }

    // WhatsApp Tracking Hook
    const waButtons = document.querySelectorAll('a[href*="wa.me"]');
    waButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log('Conversão: Clique no WhatsApp');
            if (typeof fbq !== 'undefined') fbq('track', 'Contact');
            if (typeof gtag !== 'undefined') {
                gtag('event', 'generate_lead', { 'service_name': 'consultoria_veterinaria_kiko' });
            }
        });
    });
});

// Styles de revelação progressiva
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .reveal-active {
        opacity: 1;
        transform: translateY(0);
    }
    section.reveal-active {
        transition-delay: 0.05s;
    }
`;
document.head.appendChild(style);

