// ==========================
// ELEMENTOS
// ==========================

const reveals = document.querySelectorAll('.reveal');
const buttons = document.querySelectorAll('.category-btn');
const cards = document.querySelectorAll('.card');
const searchInput = document.getElementById('searchInput');
const header = document.querySelector('.header');
const heroBg = document.querySelector('.hero-bg');

let currentCategory = 'todos';

// ==========================
// REVEAL ANIMATION
// ==========================

function revealOnScroll() {
    reveals.forEach(item => {
        const windowHeight = window.innerHeight;
        const elementTop = item.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

revealOnScroll();

// ==========================
// HEADER SCROLL
// ==========================

function handleHeader() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeader);

handleHeader();

// ==========================
// PARALLAX HERO
// ==========================

function parallaxHero() {
    if (!heroBg) return;

    const offset = window.scrollY * 0.2;

    heroBg.style.transform =
        `translateY(${offset}px) scale(1.08)`;
}

window.addEventListener('scroll', parallaxHero);

// ==========================
// FILTRO PRINCIPAL
// ==========================

function filterCards() {
    const searchValue =
        searchInput.value.toLowerCase().trim();

    cards.forEach(card => {
        const category =
            card.dataset.category;

        const text =
            card.innerText.toLowerCase();

        const categoryMatch =
            currentCategory === 'todos' ||
            category === currentCategory;

        const searchMatch =
            text.includes(searchValue);

        if (categoryMatch && searchMatch) {
            card.style.display = 'block';

            setTimeout(() => {
                card.style.opacity = '1';
            }, 50);
        } else {
            card.style.display = 'none';
        }
    });
}

// ==========================
// CATEGORIAS
// ==========================

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn =>
            btn.classList.remove('active')
        );

        button.classList.add('active');

        currentCategory =
            button.dataset.category;

        filterCards();
    });
});

// ==========================
// BUSCA
// ==========================

searchInput.addEventListener('input', () => {
    filterCards();
});

// ==========================
// SCROLL SUAVE
// ==========================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target =
                document.querySelector(
                    this.getAttribute('href')
                );

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

// ==========================
// EFEITO HOVER PREMIUM
// ==========================

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect =
            card.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        card.style.background =
            `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(255,122,0,.12),
                rgba(255,255,255,.03) 45%
            )
            `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});

// ==========================
// ANIMAÇÃO DE ENTRADA
// ==========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==========================
// CONTADOR DE PRODUTOS
// ==========================

function updateVisibleCount() {
    const visibleCards =
        [...cards].filter(card =>
            card.style.display !== 'none'
        );

    const counter =
        document.getElementById('productCount');

    if (!counter) return;

    counter.innerHTML =
        `${visibleCards.length} itens encontrados`;
}

const originalFilterCards = filterCards;

filterCards = function () {
    originalFilterCards();

    updateVisibleCount();
};

filterCards();

// ==========================
// MOSTRAR CATEGORIAS APENAS NO CARDÁPIO
// ==========================

const categoriesBar = document.querySelector('.categories');
const menuSection = document.querySelector('#menu');
const reviewsSection = document.querySelector('.reviews');

function handleCategoriesVisibility() {
    if (
        !categoriesBar ||
        !menuSection ||
        !reviewsSection
    ) return;

    const start =
        menuSection.offsetTop - 400;

    const end =
        reviewsSection.offsetTop - 150;

    const scroll =
        window.scrollY;

    if (
        scroll >= start &&
        scroll < end
    ) {
        categoriesBar.classList.add(
            'show-categories'
        );
    } else {
        categoriesBar.classList.remove(
            'show-categories'
        );
    }
}

window.addEventListener(
    'scroll',
    handleCategoriesVisibility
);

window.addEventListener(
    'resize',
    handleCategoriesVisibility
);

handleCategoriesVisibility();