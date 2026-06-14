// =====================================================
//  script.js — 동작 로직
//  내용 수정: content.js (전체) / projects.js (프로젝트)
// =====================================================

// ── NAV ──────────────────────────────────────────────
function renderNav() {
  const c = CONTENT.nav;
  document.getElementById('navLogo').innerHTML = c.logo + '<span class="dot">.</span>';

  const links = c.links.map(l =>
    l.button
      ? `<li><a href="${l.href}" class="btn btn--nav">${l.label}</a></li>`
      : `<li><a href="${l.href}">${l.label}</a></li>`
  ).join('');
  document.getElementById('navLinks').innerHTML = links;

  document.getElementById('mobileMenuLinks').innerHTML = c.links.map(l =>
    `<li><a href="${l.href}" class="mobile-link">${l.label}</a></li>`
  ).join('');
}

// ── HERO ─────────────────────────────────────────────
function renderHero() {
  const c = CONTENT.hero;
  document.getElementById('heroBgText').textContent = c.bgText;

  const ctaHtml = c.cta.map(b =>
    `<a href="${b.href}" class="btn btn--${b.style}">${b.label}</a>`
  ).join('');

  document.getElementById('heroContent').innerHTML = `
    <p class="hero__label">${c.label}</p>
    <h1 class="hero__title">
      ${c.title}<br />
      <span class="hero__name">${c.name}</span>${c.suffix}
    </h1>
    <p class="hero__desc">${c.desc.replace(/\n/g, '<br />')}</p>
    <div class="hero__cta">${ctaHtml}</div>
  `;
}

// ── ABOUT ─────────────────────────────────────────────
function renderAbout() {
  const c = CONTENT.about;
  document.getElementById('aboutLabel').textContent = c.sectionLabel;

  const paragraphs = c.paragraphs.map(p => `<p>${p}</p>`).join('');
  const stats = c.stats.map(s => `
    <div class="stat">
      <span class="stat__num">${s.num}<em>${s.suffix}</em></span>
      <span class="stat__label">${s.label}</span>
    </div>`).join('');

  document.getElementById('aboutText').innerHTML = `
    <h2 class="section-title">${c.title}<br /><em>${c.titleEm}</em></h2>
    ${paragraphs}
    <div class="about__stats">${stats}</div>
  `;

  const tags = c.tags.map(t =>
    `<div class="about__tag tag--${t.style}">${t.label}</div>`
  ).join('');

  document.getElementById('aboutVisual').innerHTML = `
    <div class="about__card">
      <div class="about__card-inner">
        <div class="about__avatar">${c.avatarLetter}</div>
        ${tags}
      </div>
    </div>
  `;
}

// ── WORK ──────────────────────────────────────────────
function renderWork() {
  const c = CONTENT.work;
  document.getElementById('workLabel').textContent = c.sectionLabel;
  document.getElementById('workTitle').textContent = c.title;

  document.getElementById('workGrid').innerHTML = PROJECTS.map((p, i) => {
    const stats = p.stats && p.stats.length
      ? `<div class="project-card__stats">${p.stats.map(s => `<span class="project-stat">${s}</span>`).join('')}</div>`
      : '';
    return `
      <article class="project-card" style="transition-delay:${i * 80}ms">
        <div class="project-card__meta">
          <span class="project-card__year">${p.year}</span>
          <span class="project-card__tag">${p.tag}</span>
        </div>
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.cardDesc}</p>
        ${stats}
        <a href="#" class="project-card__link" data-project="${p.id}">자세히 보기 →</a>
      </article>`;
  }).join('');
}

// ── SKILLS ────────────────────────────────────────────
function renderSkills() {
  const c = CONTENT.skills;
  document.getElementById('skillsLabel').textContent = c.sectionLabel;
  document.getElementById('skillsTitle').textContent = c.title;

  document.getElementById('skillsGrid').innerHTML = c.groups.map((g, i) => `
    <div class="skill-group" style="transition-delay:${i * 80}ms">
      <h4 class="skill-group__title"><span class="icon">${g.icon}</span> ${g.title}</h4>
      <ul>${g.items.map(item => `<li>${item}</li>`).join('')}</ul>
    </div>`).join('');
}

// ── CONTACT ───────────────────────────────────────────
function renderContact() {
  const c = CONTENT.contact;
  document.getElementById('contactLabel').textContent = c.sectionLabel;

  const links = c.links.map(l =>
    `<a href="${l.href}" class="contact__link">${l.label}</a>`
  ).join('');

  document.getElementById('contactInner').innerHTML = `
    <h2 class="section-title">${c.title}</h2>
    <p class="contact__desc">${c.desc.replace(/\n/g, '<br />')}</p>
    <div class="contact__email-wrap">
      <button class="btn btn--primary btn--lg" id="emailCopyBtn">${c.emailLabel}</button>
      <div class="contact__email-box" id="emailBox">
        <span class="contact__email-text" id="emailText">${c.email}</span>
        <button class="contact__copy-btn" id="emailCopyIcon" title="복사">복사</button>
      </div>
    </div>
    <div class="contact__links">${links}</div>
  `;

  document.getElementById('emailCopyBtn').addEventListener('click', () => {
    document.getElementById('emailBox').classList.toggle('is-visible');
  });

  document.getElementById('emailCopyIcon').addEventListener('click', () => {
    navigator.clipboard.writeText(c.email).then(() => {
      const btn = document.getElementById('emailCopyIcon');
      btn.textContent = '복사됨!';
      setTimeout(() => { btn.textContent = '복사'; }, 2000);
    });
  });
}

// ── FOOTER ────────────────────────────────────────────
function renderFooter() {
  const c = CONTENT.footer;
  document.getElementById('footerLeft').textContent  = c.left;
  document.getElementById('footerRight').textContent = c.right;
}

// ── MODAL ─────────────────────────────────────────────
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');

function openModal(projectId) {
  const data = PROJECTS.find(p => p.id === projectId);
  if (!data) return;

  const imageWrap = document.getElementById('modalImageWrap');
  const modal     = document.querySelector('.modal');
  const imgList   = data.images?.length ? data.images : (data.image ? [data.image] : []);

  if (imgList.length) {
    imageWrap.innerHTML = imgList.map(src =>
      `<img src="${src}" alt="${data.title} 이미지" class="modal__img" loading="lazy" />`
    ).join('');
    imageWrap.classList.add('has-image');
    modal.classList.add('has-image');
  } else {
    imageWrap.innerHTML = '';
    imageWrap.classList.remove('has-image');
    modal.classList.remove('has-image');
  }

  document.getElementById('modalYear').textContent    = data.year;
  document.getElementById('modalTag').textContent     = data.tag;
  document.getElementById('modalTitle').textContent   = data.title;
  document.getElementById('modalSummary').textContent = data.summary;
  document.getElementById('modalTasks').innerHTML     = data.tasks.map(t => `<li>${t}</li>`).join('');
  document.getElementById('modalResults').innerHTML   = data.results.map(r => `<li>${r}</li>`).join('');

  modalOverlay.setAttribute('aria-hidden', 'false');
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function bindModalLinks() {
  document.querySelectorAll('[data-project]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      openModal(link.dataset.project);
    });
  });
}

// ── NAV 스크롤 / 햄버거 ───────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));

// 모바일 메뉴는 renderNav() 이후 동적으로 생성되므로 이벤트 위임 사용
mobileMenu.addEventListener('click', e => {
  if (e.target.classList.contains('mobile-link')) mobileMenu.classList.remove('open');
});

// ── 페이드인 애니메이션 ───────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function initFadeIn() {
  document.querySelectorAll(
    '.section-label, .section-title, .about__text p, .about__stats, .about__card, ' +
    '.project-card, .skill-group, .contact__inner'
  ).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

// ── 초기화 ────────────────────────────────────────────
document.title = CONTENT.pageTitle;
renderNav();
renderHero();
renderAbout();
renderWork();
renderSkills();
renderContact();
renderFooter();
bindModalLinks();
initFadeIn();
