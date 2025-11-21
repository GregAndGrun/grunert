import { useEffect, useRef, useState } from 'react';

const highlightCards = [
  {
    label: 'Warsztaty startowe',
    title: 'Strategia produktu',
    body: 'Regularne spotkania łączące cele biznesowe z roadmapą.',
  },
  {
    label: 'Transparentny proces',
    title: 'Pełna widoczność',
    body: 'Backlog współdzielony, cykliczne demo aplikacji oraz raporty sprintów.',
  },
  {
    label: 'Wspólne standardy',
    title: 'Architektura dopasowana',
    body: 'Projektujemy rozwiązania zgodnie z zasadami security & quality.',
  },
];

const services = [
  {
    id: 'web',
    title: 'Aplikacje Webowe',
    description:
      'Tworzenie aplikacji internetowych na zamówienie – od prostych stron po zaawansowane platformy SaaS. Specjalizujemy się w projektowaniu i wdrażaniu aplikacji webowych wykorzystujących React, Next.js i Angular. Tworzymy aplikacje internetowe dopasowane do potrzeb biznesu.',
    bullets: ['Tworzenie aplikacji internetowych w React, Next.js, Angular', 'Architektura mikroserwisowa', 'Integracje z systemami ERP/CRM'],
    icon: 'web',
  },
  {
    id: 'mobilne',
    title: 'Aplikacje Mobilne',
    description:
      'Tworzenie aplikacji mobilnych na iOS i Android. Oferujemy kompleksowe tworzenie aplikacji mobilnych – od koncepcji przez design po publikację w sklepach. Wykorzystujemy Flutter i React Native do tworzenia wydajnych aplikacji mobilnych.',
    bullets: ['Tworzenie aplikacji mobilnych native i cross-platform', 'QA automatyczne i manualne', 'Publikacja w App Store / Google Play'],
    icon: 'mobile',
  },
  {
    id: 'custom',
    title: 'Systemy IT na zamówienie',
    description: 'Dedykowane rozwiązania wewnętrzne, integracje procesów i automatyzacje dopasowane do specyfiki biznesu.',
    bullets: ['Integracje API / ESB', 'Data & AI enablement', 'Monitoring i utrzymanie 24/7'],
    icon: 'custom',
  },
];

const scenarioCards = [
  {
    title: 'Budowa MVP od zera',
    description:
      'Pomagamy przejść od pomysłu do działającego produktu: discovery, makiety, development oraz przygotowanie do testów z użytkownikami.',
    bullets: ['Warsztaty produktowe i plan release’ów', 'UX/UI oraz design system', 'Osadzenie procesu CI/CD'],
  },
  {
    title: 'Modernizacja działającego rozwiązania',
    description:
      'Wspólnie mapujemy istniejący system i krok po kroku przeprowadzamy migrację technologii, integracje i poprawę doświadczenia użytkownika.',
    bullets: ['Audyt architektury i kodu', 'Planowanie etapów refaktoryzacji', 'Monitoring i obserwowalność'],
  },
  {
    title: 'Zewnętrzny zespół produktowy',
    description:
      'Wzmacniamy działy IT dedykowanym zespołem scrumowym, który dowozi backlog i raportuje postępy według Twoich standardów.',
    bullets: ['Product owner + inżynierowie', 'Standaryzacja kodu i testów', 'Bezpośrednia komunikacja z interesariuszami'],
  },
];

const journeySteps = [
  { step: '01', title: 'Odkrycie i priorytety', body: 'Diagnozujemy potrzeby i ustalamy mierzalne cele.' },
  { step: '02', title: 'Projekt rozwiązania', body: 'Makiety, architektura i wspólny backlog.' },
  { step: '03', title: 'Wytwarzanie i testy', body: 'Iteracje, code review i automatyczne testy.' },
  { step: '04', title: 'Start i rozwój', body: 'Wdrożenie, monitoring i roadmapa kolejnych wydań.' },
];

const techStack = [
  { title: 'Frontend & Mobile', body: 'React, Next.js, Angular, Vue, Flutter, React Native.' },
  { title: 'Backend & Cloud', body: 'Node.js, .NET, Python, Nest.js, AWS, Azure, GCP, Kubernetes.' },
  { title: 'Data & AI', body: 'Event streaming, Lakehouse, integracje AI/ML, LLM ops.' },
  { title: 'Quality & Security', body: 'Testy automatyczne, SAST/DAST, monitoring, observability.' },
];

const whyCards = [
  {
    title: 'Stały dostęp do product ownera',
    body: 'Bezpośredni kontakt z osobą decyzyjną – reagujemy na feedback w trakcie sprintu.',
  },
  {
    title: 'Raportowanie w czasie rzeczywistym',
    body: 'Wspólne narzędzia do backlogu, czasu pracy oraz statusów zadań.',
  },
  {
    title: 'Standardy inżynierskie',
    body: 'CI/CD, testy automatyczne i zadbanie o utrzymanie po wdrożeniu.',
  },
];

const faqItems = [
  {
    title: 'Jak wygląda pierwszy krok?',
    body: 'Umawiamy krótkie spotkanie online, sprawdzamy potrzeby i decydujemy o warsztacie discovery.',
  },
  {
    title: 'Czy mogę zacząć małym zakresem?',
    body: 'Tak – definiujemy MVP lub pilotaż, aby szybko zweryfikować koncepcję przy zachowaniu jakości.',
  },
  {
    title: 'Jak raportujecie postępy?',
    body: 'Korzystamy ze wspólnych narzędzi (Jira, Linear, ClickUp) i podsumowujemy każdy sprint.',
  },
  {
    title: 'Ile kosztuje tworzenie aplikacji internetowej?',
    body: 'Koszt tworzenia aplikacji internetowej zależy od zakresu projektu. Oferujemy bezpłatną konsultację, podczas której przygotujemy wycenę dopasowaną do Twoich potrzeb.',
  },
  {
    title: 'Jak długo trwa tworzenie aplikacji mobilnej?',
    body: 'Czas tworzenia aplikacji mobilnej zależy od złożoności projektu. Proste aplikacje mobilne mogą być gotowe w 2-3 miesiące, bardziej złożone projekty wymagają 4-6 miesięcy. Dokładny harmonogram ustalamy po analizie wymagań.',
  },
  {
    title: 'Czy tworzycie aplikacje internetowe od zera?',
    body: 'Tak, specjalizujemy się w tworzeniu aplikacji internetowych od zera. Zaczynamy od warsztatów discovery, przez projektowanie UX/UI, aż po development i wdrożenie. Tworzymy również aplikacje internetowe poprzez modernizację istniejących rozwiązań.',
  },
];

const ServiceIcon = ({ type }) => {
  if (type === 'web') {
    return (
      <svg viewBox="0 0 80 80" role="img" aria-hidden="true">
        <rect x="10" y="18" width="60" height="44" rx="10"></rect>
        <rect x="20" y="28" width="20" height="6" rx="3"></rect>
        <rect x="20" y="40" width="40" height="6" rx="3"></rect>
        <circle cx="58" cy="31" r="4"></circle>
      </svg>
    );
  }

  if (type === 'mobile') {
    return (
      <svg viewBox="0 0 80 80" role="img" aria-hidden="true">
        <rect x="24" y="10" width="32" height="60" rx="10"></rect>
        <rect x="32" y="18" width="16" height="6" rx="3"></rect>
        <circle cx="40" cy="58" r="4"></circle>
        <rect x="28" y="32" width="24" height="18" rx="6"></rect>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 80 80" role="img" aria-hidden="true">
      <polygon points="40,12 68,28 68,52 40,68 12,52 12,28"></polygon>
      <circle cx="40" cy="40" r="10"></circle>
      <rect x="36" y="26" width="8" height="12" rx="3"></rect>
    </svg>
  );
};

const App = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const formEndpoint = 'https://formspree.io/f/mldzozga';

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) {
      return;
    }

    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      return;
    }

    const ctx = canvas.getContext('2d');
    const particleCount = 80;
    let particles = [];
    let animationFrameId;
    let width;
    let height;
    let mx = 0;
    let my = 0;

    const createParticles = () => {
      if (window.innerWidth <= 768) {
        return;
      }
      width = canvas.width = window.innerWidth;
      height = canvas.height = hero.offsetHeight;
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        size: 1 + Math.random() * 0.2,
      }));
    };

    const handleMouseMove = (event) => {
      mx = event.clientX;
      my = event.clientY;
    };

    const animate = () => {
      if (window.innerWidth <= 768) {
        return;
      }
      ctx.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        const nextParticle = particle;
        nextParticle.x += nextParticle.vx;
        nextParticle.y += nextParticle.vy;

        if (nextParticle.x < 0 || nextParticle.x > width) nextParticle.vx *= -1;
        if (nextParticle.y < 0 || nextParticle.y > height) nextParticle.vy *= -1;

        ctx.fillStyle = 'rgba(34,211,238,0.8)';
        ctx.beginPath();
        ctx.arc(nextParticle.x, nextParticle.y, nextParticle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const opacity = 1 - dist / 140;
            ctx.strokeStyle = `rgba(34,211,238,${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      particles = particles.map((particle) => {
        const nextParticle = particle;
        const dx = nextParticle.x - mx;
        const dy = nextParticle.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const angle = Math.atan2(dy, dx);
          const force = ((120 - dist) / 10) * 0.02;
          nextParticle.vx += Math.cos(angle) * force;
          nextParticle.vy += Math.sin(angle) * force;
        }
        return nextParticle;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    createParticles();
    window.addEventListener('resize', createParticles);
    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', createParticles);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

  const closeNav = () => setNavOpen(false);

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const payload = Object.fromEntries(formData.entries());

    setIsSubmitting(true);
    setFormStatus(null);

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Dziękujemy! Wrócimy do Ciebie w ciągu 24h.' });
        formEl.reset();
      } else {
        const data = await response.json().catch(() => null);
        setFormStatus({
          type: 'error',
          message: data?.error || 'Nie udało się wysłać formularza. Spróbuj ponownie później.',
        });
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Wystąpił błąd sieci. Spróbuj ponownie lub napisz na biuro@grunert.pl.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav aria-label="Główne">
        <div className="logo">
          <span>Grunert</span>
          <small>digital products</small>
        </div>
        <button
          className={`nav-toggle${navOpen ? ' open' : ''}`}
          aria-label="Przełącz menu"
          aria-expanded={navOpen}
          onClick={toggleNav}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links${navOpen ? ' open' : ''}`}>
          <li>
            <a href="#onas" onClick={closeNav}>
              Firma
            </a>
          </li>
          <li className="has-sub">
            <a href="#uslugi" onClick={closeNav}>
              Usługi
            </a>
            <ul className="subnav">
              <li>
                <a href="#web" onClick={closeNav}>
                  Aplikacje internetowe
                </a>
              </li>
              <li>
                <a href="#mobilne" onClick={closeNav}>
                  Aplikacje mobilne
                </a>
              </li>
              <li>
                <a href="#custom" onClick={closeNav}>
                  Systemy IT
                </a>
              </li>
              <li>
                <a href="#tech" onClick={closeNav}>
                  Doradztwo technologiczne
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#proces" onClick={closeNav}>
              Proces
            </a>
          </li>
          <li>
            <a href="#scenariusze" onClick={closeNav}>
              Scenariusze
            </a>
          </li>
          <li>
            <a href="#dlaczego" onClick={closeNav}>
              Dlaczego my
            </a>
          </li>
          <li>
            <a href="#kontakt" className="btn-link" onClick={closeNav}>
              Kontakt
            </a>
          </li>
        </ul>
      </nav>

      <header className="hero" id="start" ref={heroRef}>
        <div className="hero-grid">
          <div className="hero-text" data-animate="slide-up">
            <p className="eyebrow">Software house klasy enterprise</p>
            <h1>Projektujemy i wdrażamy aplikacje, które przyspieszają digitalizację firm</h1>
            <p>
              Od strategii i warsztatów, przez projektowanie UX/UI, aż po development i utrzymanie w chmurze.
              Specjalizujemy się w tworzeniu aplikacji internetowych i mobilnych, które przyspieszają digitalizację firm.
              Łączymy technologię z celami biznesowymi.
            </p>
            <div className="hero-cta">
              <a className="btn primary" href="#kontakt">
                Umów konsultację
              </a>
              <a className="btn ghost" href="#scenariusze">
                Zobacz realizacje
              </a>
            </div>
          </div>
          <div className="hero-visual" data-animate="fade-in">
            <canvas id="particle-bg" ref={canvasRef} className="particle-canvas" />
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
          </div>
        </div>
      </header>

      <section className="highlights">
        {highlightCards.map((card) => (
          <div className="highlight-card" data-animate="fade-in" key={card.title}>
            <p>{card.label}</p>
            <strong>{card.title}</strong>
            <span>{card.body}</span>
          </div>
        ))}
      </section>

      <section id="uslugi">
        <div className="section-heading">
          <p className="eyebrow">Nasza oferta</p>
          <h2>Kompletne wsparcie produktowe</h2>
          <p>Działamy end-to-end – od badań i strategii po rozwój i utrzymanie Twojego rozwiązania.</p>
        </div>
        <div className="grid">
          {services.map((service) => (
            <div className="card" id={service.id} data-animate="slide-up" key={service.id}>
              <div className="service-icon">
                <ServiceIcon type={service.icon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="scenariusze">
        <div className="section-heading">
          <p className="eyebrow">Kiedy współpracujemy</p>
          <h2>Scenariusze, w których wspieramy zespoły produktowe</h2>
          <p>Zamiast chwalić się anonimowymi liczbami, stawiamy na transparentne przykłady wyzwań, które rozwiązujemy.</p>
        </div>
        <div className="case-studies">
          {scenarioCards.map((scenario) => (
            <article data-animate="fade-in" key={scenario.title}>
              <h3>{scenario.title}</h3>
              <p>{scenario.description}</p>
              <ul>
                {scenario.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="proces">
        <div className="section-heading">
          <p className="eyebrow">Jak pracujemy</p>
          <h2>Transparentny proces współpracy</h2>
          <p>Wspólny backlog, mierzalne sprinty i regularne demosy – abyś miał pełną kontrolę nad projektem.</p>
        </div>
        <div className="journey">
          {journeySteps.map((item) => (
            <div className="journey-card" data-animate="slide-up" key={item.step}>
              <div className="journey-step">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tech">
        <div className="section-heading">
          <p className="eyebrow">Technologia</p>
          <h2>Stos technologiczny dopasowany do Twoich celów</h2>
        </div>
        <div className="tech-grid" data-animate="fade-in">
          {techStack.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="dlaczego">
        <div className="section-heading">
          <p className="eyebrow">Dlaczego klienci wybierają współpracę</p>
          <h2>Konkrety zamiast haseł</h2>
        </div>
        <div className="testimonials">
          {whyCards.map((card) => (
            <figure data-animate="fade-in" key={card.title}>
              <blockquote>{card.body}</blockquote>
              <figcaption>{card.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="onas">
        <div className="section-heading">
          <p className="eyebrow">O nas</p>
          <h2>Zespół partnerów technologicznych</h2>
          <p>Senior developerzy, architekci i konsultanci produktowi – pracujemy jak rozszerzenie Twojego działu cyfrowego.</p>
        </div>
        <div className="about-content">
          <div className="about-text" data-animate="slide-up">
            <p>
              Grunert Software to studio produktów cyfrowych skupione na bliskiej współpracy z klientem. Każdy projekt
              prowadzimy w duchu partnerskim – bez obietnic bez pokrycia, z naciskiem na rzetelną komunikację.
            </p>
            <ul>
              <li>Jedno źródło prawdy dla roadmapy i backlogu</li>
              <li>Zespół dobrany do konkretnych zadań, a nie „z łapanki”</li>
              <li>Wsparcie w dokumentacji i przekazaniu rozwiązania</li>
            </ul>
          </div>
          <div className="about-visual" data-animate="fade-in" aria-hidden="true">
            <div className="about-orb orb-a" />
            <div className="about-orb orb-b" />
            <div className="about-orb orb-c" />
            <span>Grunert Software</span>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>Najczęstsze pytania na starcie współpracy</h2>
        </div>
        <div className="faq-grid">
          {faqItems.map((item) => (
            <article data-animate="slide-up" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="kontakt">
        <div className="section-heading">
          <p className="eyebrow">Kontakt</p>
          <h2>Porozmawiajmy o Twoim projekcie</h2>
          <p>Odpowiemy w ciągu 24 godzin i zaproponujemy najlepszy model współpracy.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-box">
            <p>
              Email: <a href="mailto:biuro@grunert.pl">biuro@grunert.pl</a>
            </p>
            <p>
              Telefon: <a href="tel:+48796242695">+48 796 242 695</a>
            </p>
            <p>Adres: ul. Architektów 153, Gliwice</p>
            <p>Godziny: pon–pt 9:00–17:00</p>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
            <label htmlFor="name">Imię i nazwisko</label>
            <input id="name" name="name" type="text" placeholder="Twoje imię" required />
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="nazwa@firma.pl" required />
            <label htmlFor="message">Opis projektu</label>
            <textarea id="message" name="message" rows="4" placeholder="Zakres projektu, terminy, budżet" required />
            <button type="submit" className="btn primary">
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij'}
            </button>
            {formStatus && (
              <p className={`form-feedback ${formStatus.type}`}>{formStatus.message}</p>
            )}
          </form>
        </div>
      </section>

      <footer>
        <p>© {currentYear} Grunert Software. Wszelkie prawa zastrzeżone.</p>
        <a href="#start">Wróć na górę</a>
      </footer>
    </>
  );
};

export default App;

