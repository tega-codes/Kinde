// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Navbar hide/show on scroll
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        gsap.to(navbar, { y: -100, duration: 0.3 });
    } else {
        gsap.to(navbar, { y: 0, duration: 0.3 });
    }
    lastScrollTop = scrollTop;
});

// Hero animations
const heroVideo = document.querySelector('#hero video');
const heroContent = document.querySelector('.hero-content');
const heroH1 = document.querySelector('.hero-content h1');
const heroP = document.querySelector('.hero-content p');
const heroBtn = document.querySelector('#explore-btn');

gsap.set(heroContent, { opacity: 0, y: 50 });
gsap.set(heroH1, { opacity: 0, y: 30 });
gsap.set(heroP, { opacity: 0 });
gsap.set(heroBtn, { opacity: 0 });

gsap.to(heroVideo, { scale: 1.1, duration: 2, ease: 'power2.out' });
gsap.to(heroContent, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
gsap.to(heroH1, { opacity: 1, y: 0, duration: 1, delay: 1 });
gsap.to(heroP, { opacity: 1, duration: 1, delay: 1.2 });
gsap.to(heroBtn, { opacity: 1, duration: 1, delay: 1.4 });

// Hero parallax
gsap.to('#hero .hero-content', {
    yPercent: -50,
    ease: 'none',
    scrollTrigger: {
        trigger: '#hero',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});

gsap.to(heroVideo, {
    scale: 1.2,
    ease: 'none',
    scrollTrigger: {
        trigger: '#hero',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});

// Look Reveal animations
gsap.set('.image-container img', { rotation: -10, scale: 0.8 });
gsap.set('.text-container h2', { y: 50, opacity: 0 });
gsap.set('.text-container p', { y: 50, opacity: 0 });
gsap.set('.text-container button', { y: 50, opacity: 0 });

ScrollTrigger.create({
    trigger: '#look-reveal',
    start: 'top 80%',
    onEnter: () => {
        gsap.to('.image-container img', { rotation: 0, scale: 1, duration: 1.5, ease: 'power2.out' });
        gsap.to('.text-container h2', { y: 0, opacity: 1, duration: 1, delay: 0.3 });
        gsap.to('.text-container p', { y: 0, opacity: 1, duration: 1, delay: 0.5 });
        gsap.to('.text-container button', { y: 0, opacity: 1, duration: 1, delay: 0.7 });
    }
});

// Look Reveal parallax
gsap.to('.look-reveal-bg', {
    yPercent: 50,
    ease: 'none',
    scrollTrigger: {
        trigger: '#look-reveal',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});

// Lookbook Slider
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('next-slide');
const sliderSection = document.getElementById('lookbook-slider');
let currentSlide = 0;

// Set initial background
sliderSection.style.backgroundImage = `url(${slides[0].dataset.bg})`;

function changeSlide() {
    const current = slides[currentSlide];
    currentSlide = (currentSlide + 1) % slides.length;
    const next = slides[currentSlide];

    gsap.to(current, { x: -100, opacity: 0, duration: 0.8, ease: 'power2.inOut' });
    gsap.fromTo(next, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.inOut' });

    // Change background
    sliderSection.style.backgroundImage = `url(${next.dataset.bg})`;
}

nextBtn.addEventListener('click', changeSlide);

// Craft section animations
gsap.to('.craft-image img', {
    scale: 1.2,
    ease: 'none',
    scrollTrigger: {
        trigger: '#craft',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});

gsap.set('.craft-text', { opacity: 0 });
ScrollTrigger.create({
    trigger: '#craft',
    start: 'top 50%',
    onEnter: () => gsap.to('.craft-text', { opacity: 1, duration: 1 }),
    onLeaveBack: () => gsap.to('.craft-text', { opacity: 0, duration: 1 })
});

// Modal functionality
const modal = document.getElementById('modal');
const requestBtns = document.querySelectorAll('#request-btn, #footer-cta');
const closeBtn = document.querySelector('.close');

function openModal() {
    modal.style.display = 'flex';
    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo('.modal-content', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, delay: 0.1 });
}

function closeModal() {
    gsap.to('.modal-content', { scale: 0.8, opacity: 0, duration: 0.3 });
    gsap.to(modal, { opacity: 0, duration: 0.3, onComplete: () => modal.style.display = 'none' });
}

requestBtns.forEach(btn => btn.addEventListener('click', openModal));
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Form submission (placeholder)
document.getElementById('request-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submitted!');
    closeModal();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target);
        }
    });
});