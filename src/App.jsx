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
    body: 'Współdzielony backlog, cykliczne prezentacje aplikacji oraz raporty z kolejnych sprintów.',
  },
  {
    label: 'Wspólne standardy',
    title: 'Dopasowana architektura',
    body: 'Projektujemy rozwiązania zgodnie z zasadami bezpieczeństwa i jakości.',
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
    id: 'smarthome',
    title: 'Rozwiązania Smart Home',
    description:
      'Inteligentne systemy zarządzania domem - automatyzacja oświetlenia, ogrzewania, zabezpieczeń. Zdalne sterowanie i monitorowanie przez aplikację mobilną. Integracja z asystentami głosowymi.',
    bullets: ['Automatyzacja urządzeń domowych', 'Integracja z asystentami głosowymi', 'Aplikacje mobilne do zdalnego sterowania'],
    icon: 'smarthome',
  },
  {
    id: 'custom',
    title: 'Systemy IT na zamówienie',
    description: 'Dedykowane rozwiązania wewnętrzne, integracje procesów i automatyzacje dopasowane do specyfiki biznesu.',
    bullets: ['Integracje API / ESB', 'Wykorzystanie danych i AI', 'Monitoring i utrzymanie 24/7'],
    icon: 'custom',
  },
];

const scenarioCards = [
  {
    title: 'Budowa MVP od zera',
    description:
      'Pomagamy przejść od pomysłu do działającego produktu: discovery, makiety, development oraz przygotowanie do testów z użytkownikami.',
    bullets: ['Warsztaty produktowe i plan release\'ów', 'UX/UI oraz design system', 'Osadzenie procesu CI/CD'],
    icon: '💡',
  },
  {
    title: 'Modernizacja działającego rozwiązania',
    description:
      'Wspólnie mapujemy istniejący system i krok po kroku przeprowadzamy migrację technologii, integracje i poprawę doświadczenia użytkownika.',
    bullets: ['Audyt architektury i kodu', 'Planowanie etapów refaktoryzacji', 'Monitoring i obserwowalność'],
    icon: '🔧',
  },
  {
    title: 'Automatyzacja procesów biznesowych',
    description:
      'Digitalizujemy powtarzalne procesy w firmie poprzez dedykowane narzędzia, integracje systemów i automatyzację przepływów pracy. Oszczędność czasu i eliminacja błędów manualnych.',
    bullets: ['Analiza i mapowanie procesów', 'Automatyzacja przepływów pracy i RPA', 'Integracje między systemami'],
    icon: '⚡',
  },
];

const journeySteps = [
  { step: '01', title: 'Odkrycie i priorytety', body: 'Diagnozujemy potrzeby i ustalamy mierzalne cele.' },
  { step: '02', title: 'Projekt rozwiązania', body: 'Makiety, architektura i wspólny backlog.' },
  { step: '03', title: 'Wytwarzanie i testy', body: 'Iteracje, code review i automatyczne testy.' },
  { step: '04', title: 'Start i rozwój', body: 'Wdrożenie, monitoring i roadmapa kolejnych wydań.' },
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

// Kod wyświetlany w okienku na banerze (animacja pisania znak po znaku)
// Prosty, krótki scenariusz: przełączenie domu w tryb „wychodzę z domu”
const heroCode = [
  'const home = createSmartHome();',
  '',
  'await home.setAwayMode({',
  '  lights: "off",',
  '  temperature: 21,',
  '  security: "armed",',
  '});',
].join('\n');

const heroCodeLines = heroCode.split('\n');

// Proste kolorowanie składni w okienku kodu
const highlightHeroCodeLine = (line) => {
  if (!line) return '\u00A0';

  const tokens = [];
  const regex =
    /(\".*?\"|\/\/.*$|\b\d+(\.\d+)?\b|\b(const|let|await|async|function|return)\b|[A-Za-z_$][A-Za-z0-9_.$]*|\s+|[{}()[\].,;=])/g;

  let match;
  let lastIndex = 0;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: line.slice(lastIndex, match.index) });
    }

    const [value, , , keyword] = match;

    if (value.startsWith('//')) {
      tokens.push({ type: 'comment', value });
      lastIndex = regex.lastIndex;
      break;
    } else if (keyword) {
      tokens.push({ type: 'keyword', value });
    } else if (value.startsWith('"')) {
      tokens.push({ type: 'string', value });
    } else if (/^\d/.test(value)) {
      tokens.push({ type: 'number', value });
    } else if (/^[A-Za-z_$][A-Za-z0-9_.$]*$/.test(value)) {
      tokens.push({ type: 'function', value });
    } else {
      tokens.push({ type: 'text', value });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    tokens.push({ type: 'text', value: line.slice(lastIndex) });
  }

  return tokens.map((token, index) => {
    if (token.type === 'keyword') {
      return (
        <span key={index} className="keyword">
          {token.value}
        </span>
      );
    }
    if (token.type === 'string') {
      return (
        <span key={index} className="string">
          {token.value}
        </span>
      );
    }
    if (token.type === 'number') {
      return (
        <span key={index} className="number">
          {token.value}
        </span>
      );
    }
    if (token.type === 'function') {
      return (
        <span key={index} className="function">
          {token.value}
        </span>
      );
    }
    if (token.type === 'comment') {
      return (
        <span key={index} className="comment">
          {token.value}
        </span>
      );
    }
    return <span key={index}>{token.value}</span>;
  });
};

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

  if (type === 'smarthome') {
    return (
      <svg viewBox="0 0 80 80" role="img" aria-hidden="true">
        <path d="M40 15 L65 35 L65 65 L15 65 L15 35 Z" fill="none"></path>
        <rect x="35" y="48" width="10" height="17"></rect>
        <rect x="25" y="38" width="8" height="8" rx="1"></rect>
        <rect x="47" y="38" width="8" height="8" rx="1"></rect>
        <circle cx="40" cy="28" r="3"></circle>
        <path d="M37 25 Q40 20 43 25" fill="none" strokeWidth="1.5"></path>
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
  const [typedCode, setTypedCode] = useState('');
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const formEndpoint = 'https://formspree.io/f/mldzozga';

  // 3D Tilt effect - super płynna wersja z interpolacją
  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;

    let rafId = null;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const handleMouseMove = (e) => {
      if (window.innerWidth <= 768) return;
      
      const rect = visual.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      targetRotateX = ((y - centerY) / centerY) * -15;
      targetRotateY = ((x - centerX) / centerX) * 15;
    };

    const animate = () => {
      currentRotateX = lerp(currentRotateX, targetRotateX, 0.35);
      currentRotateY = lerp(currentRotateY, targetRotateY, 0.35);
      
      visual.style.transform = `perspective(1200px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) translateZ(0)`;
      
      rafId = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      targetRotateX = 0;
      targetRotateY = 0;
      // Szybszy powrót do neutralnej pozycji
      const resetSpeed = 0.25;
      const reset = () => {
        currentRotateX = lerp(currentRotateX, 0, resetSpeed);
        currentRotateY = lerp(currentRotateY, 0, resetSpeed);
        visual.style.transform = `perspective(1200px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) translateZ(0)`;
        if (Math.abs(currentRotateX) > 0.1 || Math.abs(currentRotateY) > 0.1) {
          requestAnimationFrame(reset);
        } else {
          visual.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0)';
        }
      };
      reset();
    };

    visual.addEventListener('mousemove', handleMouseMove);
    visual.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      visual.removeEventListener('mousemove', handleMouseMove);
      visual.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Animacja „pisania” kodu w banerze – znak po znaku
  useEffect(() => {
    let index = 0;
    const total = heroCode.length;
    const stepMs = 35; // szybkie pisanie

    const id = setInterval(() => {
      index += 1;
      setTypedCode(heroCode.slice(0, index));
      if (index >= total) {
        clearInterval(id);
      }
    }, stepMs);

    return () => clearInterval(id);
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
        <a href="#start" className="logo" onClick={closeNav}>
          <span>Grunert</span>
          <small>produkty cyfrowe</small>
        </a>
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
                <a href="#smarthome" onClick={closeNav}>
                  Smart Home
                </a>
              </li>
              <li>
                <a href="#custom" onClick={closeNav}>
                  Systemy IT
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#scenariusze" onClick={closeNav}>
              Scenariusze
            </a>
          </li>
          <li>
            <a href="#proces" onClick={closeNav}>
              Proces
            </a>
          </li>
          <li>
            <a href="#dlaczego" onClick={closeNav}>
              Dlaczego my
            </a>
          </li>
          <li>
            <a href="#onas" onClick={closeNav}>
              Firma
            </a>
          </li>
          <li>
            <a href="#kontakt" className="btn-link" onClick={closeNav}>
              Kontakt
            </a>
          </li>
        </ul>
      </nav>

      <header className="hero" id="start" ref={heroRef} itemScope itemType="https://schema.org/WebPageElement">
        <div className="hero-grid">
          <div className="hero-text" data-animate="slide-up">
            <p className="eyebrow">Software house klasy enterprise</p>
            <h1 itemProp="headline">Projektujemy i wdrażamy aplikacje, które przyspieszają digitalizację firm</h1>
            <p>
              Automatyzujemy procesy biznesowe poprzez dedykowane aplikacje i systemy IT. Od koncepcji po wdrożenie.
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
          <div className="hero-visual-3d" data-animate="fade-in" ref={visualRef}>
            <div className="animated-gradient" />
            <div className="floating-shape shape-1" />
            <div className="floating-shape shape-2" />
            <div className="floating-shape shape-3" />
            <div className="glass-card">
              <div className="code-window">
                <div className="window-header">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
                <div className="code-lines">
                  {heroCodeLines.map((fullLine, index) => {
                    const charsBefore = heroCodeLines
                      .slice(0, index)
                      .reduce((acc, line) => acc + line.length + 1, 0); // +1 za znak nowej linii
                    const lineEnd = charsBefore + fullLine.length;
                    const visibleSlice = typedCode.slice(
                      charsBefore,
                      Math.min(lineEnd, typedCode.length)
                    );
                    const content = visibleSlice || '\u00A0';

                    return (
                      <div className="code-line" key={index}>
                        {highlightHeroCodeLine(content)}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="highlights">
        {highlightCards.map((card) => (
          <div className="highlight-card" data-animate="fade-in" key={card.title}>
            <div className="highlight-icon">✓</div>
            <p>{card.label}</p>
            <strong>{card.title}</strong>
            <span>{card.body}</span>
          </div>
        ))}
      </section>

      <section id="uslugi" itemScope itemType="https://schema.org/ItemList">
        <div className="section-heading">
          <p className="eyebrow">Nasza oferta</p>
          <h2 itemProp="name">Kompletne wsparcie produktowe</h2>
          <p>Działamy end-to-end – od badań i strategii po rozwój i utrzymanie Twojego rozwiązania.</p>
        </div>
        <div className="services-showcase">
          {services.map((service, index) => (
            <article className="service-card-visual" id={service.id} data-animate="slide-up" key={service.id} itemScope itemType="https://schema.org/Service" itemProp="itemListElement">
              <div className="service-content">
                <div className="service-icon">
                  <ServiceIcon type={service.icon} />
                </div>
                <h3 itemProp="name">{service.title}</h3>
                <p itemProp="description">{service.description}</p>
                <ul>
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
              <div className="service-mockup">
                {service.id === 'mobilne' && (
                  <div className="iphone-mockup">
                    <div className="iphone-frame">
                      <div className="iphone-notch" />
                      <div className="iphone-screen">
                        <div className="app-demo">
                          <div className="demo-header">
                            <div className="demo-time">9:41</div>
                            <div className="demo-icons">
                              <span>📶</span>
                              <span>📡</span>
                              <span>🔋</span>
                            </div>
                          </div>
                          <div className="demo-app-screen">
                            <div className="app-top-bar">
                              <div className="app-avatar">👤</div>
                              <div className="app-greeting">
                                <div className="greeting-text">Witaj ponownie!</div>
                                <div className="greeting-sub">Masz 3 nowe powiadomienia</div>
                              </div>
                            </div>
                            <div className="app-menu">
                              <div className="menu-item">
                                <div className="menu-icon">📊</div>
                                <div className="menu-label">Dashboard</div>
                              </div>
                              <div className="menu-item active">
                                <div className="menu-icon">📝</div>
                                <div className="menu-label">Zadania</div>
                              </div>
                              <div className="menu-item">
                                <div className="menu-icon">💬</div>
                                <div className="menu-label">Wiadomości</div>
                              </div>
                              <div className="menu-item">
                                <div className="menu-icon">⚙️</div>
                                <div className="menu-label">Ustawienia</div>
                              </div>
                            </div>
                            <div className="app-cards">
                              <div className="app-card">
                                <div className="card-left">
                                  <div className="card-icon">✓</div>
                                  <div className="card-info">
                                    <div className="card-title">Spotkanie z klientem</div>
                                    <div className="card-time">14:30 - 15:30</div>
                                  </div>
                                </div>
                              </div>
                              <div className="app-card">
                                <div className="card-left">
                                  <div className="card-icon">📋</div>
                                  <div className="card-info">
                                    <div className="card-title">Przegląd projektu XYZ</div>
                                    <div className="card-time">Jutro, 10:00</div>
                                  </div>
                                </div>
                              </div>
                              <div className="app-card">
                                <div className="card-left">
                                  <div className="card-icon">💼</div>
                                  <div className="card-info">
                                    <div className="card-title">Raport miesięczny</div>
                                    <div className="card-time">Za 3 dni</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {service.id === 'web' && (
                  <div className="smart-home-mockup">
                    <div className="control-panel-device">
                      <div className="panel-frame">
                        <div className="panel-display">
                          <div className="browser-chrome">
                            <div className="chrome-dots">
                              <span className="dot red" />
                              <span className="dot yellow" />
                              <span className="dot green" />
                            </div>
                            <div className="chrome-address">
                              <span className="lock-icon">🔒</span>
                              <span className="url">grunert.pl/dashboard</span>
                            </div>
                            <div className="chrome-menu">⋮</div>
                          </div>
                          <div className="browser-viewport">
                            <div className="app-interface">
                              <div className="app-sidebar">
                                <div className="sidebar-logo">G</div>
                                <div className="sidebar-nav">
                                  <div className="nav-icon active" />
                                  <div className="nav-icon" />
                                  <div className="nav-icon" />
                                  <div className="nav-icon" />
                                </div>
                              </div>
                              <div className="app-main">
                                <div className="main-header">
                                  <div className="header-title">
                                    <div className="title-line" />
                                    <div className="subtitle-line" />
                                  </div>
                                  <div className="header-actions">
                                    <div className="action-btn" />
                                    <div className="action-btn primary" />
                                  </div>
                                </div>
                                <div className="main-content">
                                  <div className="content-grid">
                                    <div className="grid-card large">
                                      <div className="card-chart">
                                        <div className="chart-bar" style={{height: '60%'}} />
                                        <div className="chart-bar" style={{height: '80%'}} />
                                        <div className="chart-bar" style={{height: '45%'}} />
                                        <div className="chart-bar" style={{height: '90%'}} />
                                        <div className="chart-bar" style={{height: '70%'}} />
                                      </div>
                                    </div>
                                    <div className="grid-card">
                                      <div className="card-metric">
                                        <div className="metric-value" />
                                        <div className="metric-label" />
                                      </div>
                                    </div>
                                    <div className="grid-card">
                                      <div className="card-metric">
                                        <div className="metric-value" />
                                        <div className="metric-label" />
                                      </div>
                                    </div>
                                    <div className="grid-card wide">
                                      <div className="card-list">
                                        <div className="list-item" />
                                        <div className="list-item" />
                                        <div className="list-item" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="panel-stand"></div>
                    </div>
                  </div>
                )}
                {service.id === 'custom' && (
                  <div className="system-mockup">
                    <div className="integration-flow">
                      <div className="flow-header">
                        <div className="flow-title">Automatyzacja Procesów</div>
                      </div>
                      <div className="flow-diagram">
                        <div className="flow-node source">
                          <div className="node-icon">📊</div>
                          <div className="node-label">System A</div>
                        </div>
                        <div className="flow-arrow arrow-1">
                          <svg viewBox="0 0 100 20">
                            <path d="M 0 10 L 80 10" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path d="M 80 10 L 70 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path d="M 80 10 L 70 15" stroke="currentColor" strokeWidth="2" fill="none" />
                            <circle cx="40" cy="10" r="3" fill="currentColor">
                              <animate attributeName="cx" from="0" to="80" dur="2s" repeatCount="indefinite" />
                            </circle>
                          </svg>
                        </div>
                        <div className="flow-node center">
                          <div className="node-icon">⚙️</div>
                          <div className="node-label">Węzeł API</div>
                          <div className="node-pulse"></div>
                        </div>
                        <div className="flow-arrow arrow-2">
                          <svg viewBox="0 0 100 20">
                            <path d="M 0 10 L 80 10" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path d="M 80 10 L 70 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path d="M 80 10 L 70 15" stroke="currentColor" strokeWidth="2" fill="none" />
                            <circle cx="40" cy="10" r="3" fill="currentColor">
                              <animate attributeName="cx" from="0" to="80" dur="2s" repeatCount="indefinite" begin="0.5s" />
                            </circle>
                          </svg>
                        </div>
                        <div className="flow-node destination">
                          <div className="node-icon">💾</div>
                          <div className="node-label">System B</div>
                        </div>
                      </div>
                      <div className="flow-stats">
                        <div className="stat-item">
                          <div className="stat-value">98%</div>
                          <div className="stat-desc">Dostępność</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">24/7</div>
                          <div className="stat-desc">Monitoring</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">Auto</div>
                          <div className="stat-desc">Synchronizacja</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {service.id === 'smarthome' && (
                  <div className="web-app-showcase">
                    <div className="desktop-frame">
                      <div className="screen-container">
                        <div className="screen-glare" />
                        <div className="browser-window">
                          <div className="display-header">
                            <div className="header-icon">🏠</div>
                            <div className="header-info">
                              <div className="header-title">Panel Sterowania</div>
                              <div className="header-subtitle">Wszystkie systemy</div>
                            </div>
                            <div className="header-status">
                              <div className="status-dot active"></div>
                            </div>
                          </div>
                          <div className="display-content">
                            <div className="control-grid">
                              <div className="control-tile lights active">
                                <div className="tile-icon">💡</div>
                                <div className="tile-label">Oświetlenie</div>
                                <div className="tile-value">8/12</div>
                              </div>
                              <div className="control-tile climate">
                                <div className="tile-icon">🌡️</div>
                                <div className="tile-label">Klimat</div>
                                <div className="tile-value">22°C</div>
                              </div>
                              <div className="control-tile security active">
                                <div className="tile-icon">🔒</div>
                                <div className="tile-label">Zabezpieczenia</div>
                                <div className="tile-value">Aktywne</div>
                              </div>
                              <div className="control-tile energy">
                                <div className="tile-icon">⚡</div>
                                <div className="tile-label">Energia</div>
                                <div className="tile-value">5.2 kW</div>
                              </div>
                            </div>
                            <div className="scene-controls">
                              <div className="scene-btn">
                                <span className="scene-icon">💡</span>
                                <span className="scene-name">Światła</span>
                              </div>
                              <div className="scene-btn active">
                                <span className="scene-icon">🌡️</span>
                                <span className="scene-name">Klimat</span>
                              </div>
                              <div className="scene-btn">
                                <span className="scene-icon">🔒</span>
                                <span className="scene-name">Alarm</span>
                              </div>
                            </div>
                            <div className="status-bar">
                              <div className="status-item">
                                <span className="status-label">Urządzenia</span>
                                <span className="status-value">24 online</span>
                              </div>
                              <div className="status-item">
                                <span className="status-label">Automatyzacje</span>
                                <span className="status-value">5 aktywnych</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="scenariusze">
        <div className="section-heading">
          <p className="eyebrow">Jak współpracujemy?</p>
          <h2>Scenariusze, w których wspieramy zespoły produktowe</h2>
          <p>Zamiast chwalić się anonimowymi liczbami, stawiamy na transparentne przykłady wyzwań, które rozwiązujemy.</p>
        </div>
        <div className="case-studies">
          {scenarioCards.map((scenario) => (
            <article data-animate="fade-in" key={scenario.title}>
              <div className="scenario-icon">{scenario.icon}</div>
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
          <p className="eyebrow">Etapy współpracy</p>
          <h2>Cykl życia projektu</h2>
          <p>Wspólny backlog, mierzalne sprinty i regularne prezentacje postępów – abyś miał pełną kontrolę nad projektem.</p>
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

      <section id="dlaczego">
        <div className="section-heading">
          <p className="eyebrow">Dlaczego jesteśmy dobrym wyborem?</p>
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
              <li>Zespół dobrany do konkretnych zadań</li>
              <li>Wsparcie w dokumentacji i przekazaniu rozwiązania</li>
            </ul>
          </div>
          <div className="about-visual-new" data-animate="fade-in">
            <div className="team-grid">
              <div className="team-member member-1">
                <div className="member-avatar gradient-1">
                  <span className="avatar-initial">FE</span>
                </div>
                <div className="member-role">Frontend</div>
              </div>
              <div className="team-member member-2">
                <div className="member-avatar gradient-2">
                  <span className="avatar-initial">BE</span>
                </div>
                <div className="member-role">Backend</div>
              </div>
              <div className="team-member member-3">
                <div className="member-avatar gradient-3">
                  <span className="avatar-initial">PM</span>
                </div>
                <div className="member-role">Product</div>
              </div>
              <div className="team-member member-4">
                <div className="member-avatar gradient-4">
                  <span className="avatar-initial">UX</span>
                </div>
                <div className="member-role">UX/UI</div>
              </div>
              <div className="team-member member-5">
                <div className="member-avatar gradient-5">
                  <span className="avatar-initial">QA</span>
                </div>
                <div className="member-role">Quality</div>
              </div>
              <div className="team-member member-6">
                <div className="member-avatar gradient-6">
                  <span className="avatar-initial">DO</span>
                </div>
                <div className="member-role">DevOps</div>
              </div>
            </div>
            <div className="team-ring">
              <div className="ring outer-ring" />
              <div className="ring inner-ring" />
            </div>
            <div className="team-label">Nasz Zespół</div>
          </div>
        </div>
      </section>

      <section id="kontakt" itemScope itemType="https://schema.org/ContactPage">
        <div className="section-heading">
          <p className="eyebrow">Kontakt</p>
          <h2>Porozmawiajmy o Twoim projekcie</h2>
          <p>Odpowiemy w ciągu 24 godzin i zaproponujemy najlepszy model współpracy.</p>
        </div>
        <div className="contact-grid" itemScope itemType="https://schema.org/Organization">
          <div className="contact-box">
            <div className="contact-card-header">
              <div>
                <p className="contact-company">Grunert Software</p>
                <p className="contact-tagline">Partnerzy technologiczni</p>
              </div>
              <span className="contact-badge">Odpowiadamy w 24h</span>
            </div>
            <div className="contact-card-body">
              <div className="contact-row">
                <span>Email</span>
                <a href="mailto:biuro@grunert.pl" itemProp="email">biuro@grunert.pl</a>
              </div>
              <div className="contact-row">
                <span>Telefon</span>
                <a href="tel:+48796242695" itemProp="telephone">+48 796 242 695</a>
              </div>
              <div className="contact-row" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span>Adres</span>
                <div>
                  <span itemProp="streetAddress">ul. Architektów 153</span>, <span itemProp="addressLocality">Gliwice</span>
                </div>
              </div>
              <div className="contact-row">
                <span>Godziny</span>
                <div>pon–pt 9:00–17:00</div>
              </div>
            </div>
            <div className="contact-card-footer">
              <span>Preferujesz spotkanie? Zaproponujemy termin podczas pierwszej rozmowy.</span>
            </div>
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

      <footer itemScope itemType="https://schema.org/WPFooter">
        <p>© {currentYear} Grunert Software. Wszelkie prawa zastrzeżone.</p>
        <a href="#start" aria-label="Wróć na górę strony">Wróć na górę</a>
      </footer>
    </>
  );
};

export default App;

