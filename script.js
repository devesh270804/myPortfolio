    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function animCursor() {
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animCursor);
    }
    animCursor();
    document.querySelectorAll('a,button,.project-card,.design-thumb').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.transform = 'translate(-50%,-50%) scale(1.9)';
        ring.style.borderColor = 'rgba(94,92,230,0.6)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.borderColor = 'rgba(94,92,230,0.4)';
      });
    });

    /* ── Scroll Progress ── */
    const prog = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      prog.style.width = pct + '%';
    }, { passive: true });

    /* ── Nav Scroll ── */
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    /* ── Hamburger ── */
    const ham = document.getElementById('hamburger');
    const mob = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-close');

    function toggleMenu(open) {
      mob.classList.toggle('open', open);
      ham.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    ham.addEventListener('click', () => toggleMenu(!mob.classList.contains('open')));
    closeBtn.addEventListener('click', () => toggleMenu(false));
    document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => toggleMenu(false)));

    /* ── Reveal on Scroll ── */
    const reveals = document.querySelectorAll('.reveal');
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    reveals.forEach(r => revObs.observe(r));

    /* ── Skill Bars ── */
    const skillObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-fill').forEach(bar => bar.style.width = bar.dataset.width + '%');
          skillObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.skill-group').forEach(g => skillObs.observe(g));

    /* ── Counter Animation ── */
    function animCount(el, target, duration = 1200) {
      let start = null;
      const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * target);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + (target >= 10 ? '+' : '');
      };
      requestAnimationFrame(step);
    }
    const cntObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('[data-count]').forEach(el => animCount(el, parseInt(el.dataset.count)));
          cntObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    cntObs.observe(document.getElementById('hero'));

    /* ── Testimonials Slider ── */
    const track = document.getElementById('t-track');
    let tIdx = 0;
    const tcards = track.querySelectorAll('.testimonial-card');
    function slideTo(i) {
      tIdx = Math.max(0, Math.min(i, tcards.length - 2));
      const w = tcards[0].offsetWidth + 24;
      track.style.transform = `translateX(-${tIdx * w}px)`;
    }
    document.getElementById('t-next').addEventListener('click', () => slideTo(tIdx + 1));
    document.getElementById('t-prev').addEventListener('click', () => slideTo(tIdx - 1));

    /* ── Smooth anchor scroll offset ── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const tgt = document.querySelector(a.getAttribute('href'));
        if (tgt) {
          e.preventDefault();
          window.scrollTo({ top: tgt.getBoundingClientRect().top + window.scrollY - 84, behavior: 'smooth' });
        }
      });
    });

    /* ── Staggered card entry for project cards ── */
    const cardObs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          cardObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.project-card, .achievement-card').forEach(c => {
      c.classList.add('reveal');
      cardObs.observe(c);
    });