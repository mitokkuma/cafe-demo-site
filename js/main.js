/* =========================================================
   〇〇 COFFEE & BAKERY — Demo landing page
   ========================================================= */
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');

  const header = document.querySelector('.site-header');
  const toTop = document.querySelector('.to-top');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Header background / back-to-top button ---------- */
  let ticking = false;
  const updateOnScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    if (toTop) toTop.classList.toggle('is-visible', y > 720);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }, { passive: true });
  updateOnScroll();

  /* ---------- Mobile drawer ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const drawer = document.getElementById('drawer');
  const background = [document.querySelector('main'), document.querySelector('.site-footer'), toTop];

  const setDrawer = (open) => {
    if (!toggle || !drawer) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    drawer.classList.toggle('is-open', open);
    drawer.inert = !open;
    header.classList.toggle('menu-open', open);
    document.body.classList.toggle('is-locked', open);
    background.forEach((el) => { if (el) el.inert = open; });
    if (open) {
      const first = drawer.querySelector('a');
      if (first) first.focus({ preventScroll: true });
    }
  };

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      setDrawer(toggle.getAttribute('aria-expanded') !== 'true');
    });
    drawer.addEventListener('click', (event) => {
      if (event.target.closest('a')) setDrawer(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
        setDrawer(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 1080px)').addEventListener('change', (event) => {
      if (event.matches) setDrawer(false);
    });
  }

  /* ---------- Current section in the navigation ---------- */
  const navLinks = [...document.querySelectorAll('.global-nav a, .drawer-nav a')];
  const spyTargets = [document.querySelector('.hero'), ...['about', 'menu', 'features', 'sns', 'access'].map((id) => document.getElementById(id))].filter(Boolean);

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          if (id && link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spyTargets.forEach((el) => spy.observe(el));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const revealer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach((el) => revealer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Menu tabs ---------- */
  const tablist = document.querySelector('.menu-tabs[role="tablist"]');
  if (tablist) {
    const tabs = [...tablist.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

    const select = (index, moveFocus = false) => {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (panels[i]) panels[i].hidden = !selected;
      });
      if (moveFocus) tabs[index].focus();
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (event) => {
        const keys = {
          ArrowRight: (i + 1) % tabs.length,
          ArrowDown: (i + 1) % tabs.length,
          ArrowLeft: (i - 1 + tabs.length) % tabs.length,
          ArrowUp: (i - 1 + tabs.length) % tabs.length,
          Home: 0,
          End: tabs.length - 1,
        };
        if (event.key in keys) {
          event.preventDefault();
          select(keys[event.key], true);
        }
      });
    });

    select(0);

    // Preload the photos of the other (hidden) tabs once the menu comes into view
    const preload = () => panels.forEach((panel) => {
      if (panel) panel.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = 'eager'; });
    });
    if ('IntersectionObserver' in window) {
      const warmer = new IntersectionObserver((entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          preload();
          observer.disconnect();
        }
      }, { rootMargin: '400px 0px' });
      warmer.observe(tablist);
    } else {
      preload();
    }
  }

  /* ---------- Takeout link: highlight the takeout card ---------- */
  const takeoutCard = document.getElementById('takeout');
  document.querySelectorAll('[data-takeout-link]').forEach((link) => {
    link.addEventListener('click', () => {
      if (!takeoutCard) return;
      takeoutCard.classList.remove('is-highlight');
      window.setTimeout(() => {
        void takeoutCard.offsetWidth;
        takeoutCard.classList.add('is-highlight');
        takeoutCard.focus({ preventScroll: true });
      }, reduceMotion.matches ? 0 : 500);
    });
  });
  if (takeoutCard) {
    takeoutCard.addEventListener('animationend', () => takeoutCard.classList.remove('is-highlight'));
  }

  /* ---------- Weekly hours: mark today (Japan time) ---------- */
  const week = document.querySelector('[data-week]');
  if (week) {
    const today = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'Asia/Tokyo' })
      .format(new Date())
      .toLowerCase();
    const cell = week.querySelector(`[data-day="${today}"]`);
    if (cell) {
      cell.classList.add('is-today');
      cell.setAttribute('aria-current', 'date');
      const label = document.createElement('span');
      label.className = 'week-today';
      label.textContent = 'Today';
      cell.appendChild(label);
    }
  }
})();
