/**
 * BJ VEYDEATH — PORTFOLIO APPLICATION LOGIC
 * GitHub Pages Compatible · Zero Dependencies · Clean DOM Architecture
 */

(function () {
  'use strict';

  /* ==========================================================================
     01. CENTRAL CONFIGURATION
     All projects, contact channels, and profile data are managed here.
     ========================================================================== */
  const CONFIG = {
    profile: {
      name: 'BJ VeyDeath',
      expandedName: 'BlackJack VeyDeath',
      shortName: 'Vey',
      role: 'Cybersecurity Researcher & Developer',
      logoUrl: 'https://www.upload.ee/image/19946539/bj.jpg',
      headline: 'Exploring Systems. Building Ideas. Understanding Security.',
      intro:
        'An independent technical explorer interested in cybersecurity, security research, and software development. Focused on understanding how systems work, investigating technical challenges, and building digital solutions through experimentation and continuous learning.',
    },

    /**
     * Contact details.
     * Direct collaboration channels.
     * Unavailable or unset channels (WhatsApp/Instagram) remain null and are
     * omitted automatically to prevent broken buttons.
     */
    contacts: [
      {
        type: 'github',
        label: 'GitHub Profile',
        handle: 'github.com/0xBJVD',
        url: 'https://github.com/0xBJVD',
        canCopy: true,
      },
      {
        type: 'whatsapp',
        label: 'WhatsApp',
        handle: null, // Set to valid number/handle when available
        url: null,
        canCopy: false,
      },
      {
        type: 'instagram',
        label: 'Instagram',
        handle: null, // Set to valid username when available
        url: null,
        canCopy: false,
      },
    ],

    /**
     * Curated Technical Projects & Experiments.
     * Only displays real actions when URLs exist.
     * Clear status labeling maintains authentic integrity without exaggerated claims.
     */
    projects: [
      {
        id: 'web-defense-audit',
        title: 'Defensive Headers & CSP Audit Lab',
        category: 'SECURITY',
        technologies: ['HTTP Headers', 'CSP Spec', 'CORS Security', 'Browser Sandbox'],
        status: 'Research Prototype / Active',
        description:
          'An experimental audit utility exploring how Content Security Policy directives, strict transport policies, and cookie flags behave across diverse browser rendering engines to prevent cross-origin injection.',
        repoUrl: null, // Repository in active development
        previewUrl: null,
        featured: true,
      },
      {
        id: 'vibe-coding-review-framework',
        title: 'Vibe Coding Architecture & Verification Rig',
        category: 'EXPERIMENTS',
        technologies: ['AI Workflows', 'TypeScript', 'AST Inspection', 'Review Bounds'],
        status: 'Methodology / Lab Notes',
        description:
          'Structured workflow guidelines and evaluation criteria for AI-assisted development. Investigates LLM failure modes, token hallucination bounds, and rigorous human-in-the-loop review practices.',
        repoUrl: null,
        previewUrl: null,
        featured: false,
      },
      {
        id: 'bj-veydeath-portfolio',
        title: 'BJ VeyDeath Minimalist Editorial Engine',
        category: 'DEVELOPMENT',
        technologies: ['HTML5', 'CSS3 Variables', 'Vanilla JS', 'GitHub Pages'],
        status: 'Deployed / Production',
        description:
          'A zero-dependency, high-contrast dark editorial personal technical portfolio crafted for GitHub Pages with military minimalism, responsive layouts, and strict accessible typography.',
        repoUrl: 'https://github.com/0xBJVD',
        previewUrl: './index.html',
        featured: false,
      },
      {
        id: 'network-protocol-inspector',
        title: 'Socket Stream & Protocol Frame Inspector',
        category: 'RESEARCH',
        technologies: ['Python', 'TCP/IP', 'TLS Handshake', 'PCAP Tracing'],
        status: 'Investigation / Ongoing',
        description:
          'Low-level packet and stream tracing scripts designed to dissect TLS negotiation parameters, examine payload fragmentation, and evaluate how edge proxies handle non-standard TCP frames.',
        repoUrl: null,
        previewUrl: null,
        featured: false,
      },
      {
        id: 'auth-boundary-tester',
        title: 'Session Boundary & JWT Lifecycle Prober',
        category: 'SECURITY',
        technologies: ['OAuth 2.0', 'JWT Validation', 'Session State', 'REST APIs'],
        status: 'Experimental Lab',
        description:
          'Hands-on test cases analyzing edge cases in OAuth grant state verification, token expiration synchronization, and privilege escalation vulnerabilities across distributed micro-services.',
        repoUrl: null,
        previewUrl: null,
        featured: false,
      },
      {
        id: 'system-documentation-vault',
        title: 'Security Research & Findings Repository',
        category: 'RESEARCH',
        technologies: ['Markdown', 'Threat Modeling', 'Vulnerability Analysis'],
        status: 'Documentation / Active',
        description:
          'Structured documentation repository cataloging vulnerability classifications, defensive architectures, and reproducible test cases derived from hands-on lab experiments.',
        repoUrl: null,
        previewUrl: null,
        featured: false,
      },
    ],
  };

  /* ==========================================================================
     02. DOM UTILITIES & SANITIZATION
     ========================================================================== */
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function showToast(message) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${escapeHTML(message)}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  /* ==========================================================================
     03. PROJECT SHOWCASE RENDERING & FILTERING
     ========================================================================== */
  function renderProjects(filterCategory = 'ALL') {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const filtered =
      filterCategory === 'ALL'
        ? CONFIG.projects
        : CONFIG.projects.filter(
            (p) => p.category.toUpperCase() === filterCategory.toUpperCase()
          );

    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; background-color: var(--bg-card); border: 1px solid var(--border-color);">
          <p style="color: var(--text-muted); font-family: var(--font-mono); font-size: 0.85rem;">
            No projects currently categorized under "${escapeHTML(filterCategory)}".
          </p>
        </div>
      `;
      return;
    }

    filtered.forEach((project) => {
      const card = document.createElement('article');
      card.className = `project-card ${project.featured ? 'featured' : ''} reveal-init`;

      // Build Action Buttons safely
      let actionsHTML = '';
      const hasActions = project.repoUrl || project.previewUrl;

      if (project.previewUrl) {
        actionsHTML += `
          <a href="${escapeHTML(project.previewUrl)}" class="project-btn" target="${project.previewUrl.startsWith('http') ? '_blank' : '_self'}" rel="noopener noreferrer">
            <span>Live Preview</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        `;
      }

      if (project.repoUrl) {
        actionsHTML += `
          <a href="${escapeHTML(project.repoUrl)}" class="project-btn" target="_blank" rel="noopener noreferrer">
            <span>Source Code</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </a>
        `;
      }

      if (!hasActions) {
        actionsHTML = `
          <span class="project-btn-static">
            [Lab Documentation · In Progress]
          </span>
        `;
      }

      // Technologies text with typographical separators
      const techListHTML = project.technologies
        .map((tech) => `<span class="project-tech-item">${escapeHTML(tech)}</span>`)
        .join('<span style="opacity: 0.35"> / </span>');

      card.innerHTML = `
        <div>
          <div class="project-card-header">
            <div class="project-meta-row">
              <span class="project-meta-category">${escapeHTML(project.category)}</span>
              <span class="project-meta-sep">·</span>
              <span class="project-meta-status">${escapeHTML(project.status)}</span>
            </div>
            <h3 class="project-title">${escapeHTML(project.title)}</h3>
          </div>
          <p class="project-desc">${escapeHTML(project.description)}</p>
        </div>
        <div>
          <div class="project-tech-list">
            ${techListHTML}
          </div>
          <div class="project-actions">
            ${actionsHTML}
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    // Re-observe newly rendered project cards
    setupScrollReveals();
  }

  function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filterCategory = btn.getAttribute('data-filter') || 'ALL';
        renderProjects(filterCategory);
      });
    });
  }

  /* ==========================================================================
     04. CONTACT CHANNELS RENDERING
     ========================================================================== */
  function renderContacts() {
    const container = document.getElementById('contact-channels-list');
    if (!container) return;

    // Filter out contacts with null url/handle
    const validContacts = CONFIG.contacts.filter((c) => c.url && c.handle);

    container.innerHTML = '';
    validContacts.forEach((contact) => {
      const card = document.createElement('div');
      card.className = 'contact-card';

      let iconSvg = '';
      if (contact.type === 'email') {
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
      } else if (contact.type === 'github') {
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`;
      } else {
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
      }

      card.innerHTML = `
        <div class="contact-channel-left">
          ${iconSvg}
          <div>
            <div class="contact-label">${escapeHTML(contact.label)}</div>
            <div class="contact-handle">${escapeHTML(contact.handle)}</div>
          </div>
        </div>
        <div class="contact-channel-actions">
          ${
            contact.canCopy
              ? `<button class="btn-outline copy-trigger" data-copy="${escapeHTML(contact.handle)}" title="Copy address" aria-label="Copy ${escapeHTML(contact.label)}">
                  <span>Copy</span>
                </button>`
              : ''
          }
          <a href="${escapeHTML(contact.url)}" class="btn-cta" target="${contact.url.startsWith('mailto') ? '_self' : '_blank'}" rel="noopener noreferrer">
            <span>Connect</span>
          </a>
        </div>
      `;

      container.appendChild(card);
    });

    // Wire copy buttons
    const copyButtons = container.querySelectorAll('.copy-trigger');
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy');
        if (textToCopy) {
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              showToast(`Copied to clipboard: ${textToCopy}`);
            })
            .catch(() => {
              showToast(`Address: ${textToCopy}`);
            });
        }
      });
    });
  }

  /* ==========================================================================
     05. MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  function setupMobileNav() {
    const menuBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    if (!menuBtn || !drawer) return;

    let isOpen = false;

    function toggleMenu(openState) {
      isOpen = typeof openState === 'boolean' ? openState : !isOpen;
      drawer.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuBtn.innerHTML = isOpen
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    }

    menuBtn.addEventListener('click', () => toggleMenu());

    // Close when mobile links are clicked
    const links = drawer.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleMenu(false);
      }
    });
  }

  /* ==========================================================================
     06. LOGO & IMAGE FALLBACK HANDLER
     If external URL fails, switch to military monogram SVG frame gracefully.
     ========================================================================== */
  function setupImageFallbacks() {
    const images = document.querySelectorAll('.commander-img, .brand-avatar img');
    images.forEach((img) => {
      img.addEventListener('error', function () {
        this.style.display = 'none';
        const parent = this.parentElement;
        if (parent) {
          const fallback = parent.querySelector('.image-fallback');
          if (fallback) {
            fallback.style.display = 'flex';
          }
        }
      });
    });
  }

  /* ==========================================================================
     07. DYNAMIC COPYRIGHT YEAR
     ========================================================================== */
  function setupCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const elements = document.querySelectorAll('.current-year');
    elements.forEach((el) => {
      el.textContent = currentYear;
    });
  }

  /* ==========================================================================
     08. SCROLL REVEAL (IntersectionObserver with reduced-motion support)
     ========================================================================== */
  let revealObserver = null;

  function setupScrollReveals() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-init').forEach((el) => {
        el.classList.add('reveal-visible');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-init').forEach((el) => {
        el.classList.add('reveal-visible');
      });
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
    }

    document.querySelectorAll('.reveal-init:not(.reveal-visible)').forEach((el) => {
      revealObserver.observe(el);
    });
  }

  /* ==========================================================================
     09. INITIALIZATION ENTRY POINT
     ========================================================================== */
  function init() {
    setupCopyrightYear();
    setupMobileNav();
    setupImageFallbacks();
    renderProjects('ALL');
    setupProjectFilters();
    renderContacts();
    setupScrollReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
