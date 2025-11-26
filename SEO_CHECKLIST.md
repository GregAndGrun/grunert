# ✅ SEO Checklist - Do weryfikacji po wdrożeniu

## 🚀 Przed publikacją:

### Pliki graficzne:
- [ ] Dodano `/public/favicon.ico`
- [ ] Dodano `/public/apple-touch-icon.png`
- [ ] Dodano `/public/logo.png`
- [ ] Opcjonalnie: Zamieniono obrazek OG na własny (obecnie Unsplash)

### Weryfikacja treści:
- [ ] Sprawdzono współrzędne GPS w schema (obecnie: 50.2945, 18.6714)
- [ ] Zweryfikowano adres (ul. Architektów 153, Gliwice)
- [ ] Sprawdzono godziny otwarcia (pon-pt 9:00-17:00)
- [ ] Sprawdzono linki social media w schema

---

## 🔍 Po publikacji - Testowanie:

### Schema.org / Structured Data:
- [ ] Google Rich Results Test: https://search.google.com/test/rich-results
  - Wklej: https://grunert.pl/
  - Sprawdź czy wszystkie schematy są poprawne
  
- [ ] Schema Validator: https://validator.schema.org/
  - Sprawdź JSON-LD
  - Upewnij się, że nie ma błędów

### Social Media:
- [ ] Facebook Debugger: https://developers.facebook.com/tools/debug/
  - Wklej: https://grunert.pl/
  - Sprawdź og:image, og:title, og:description
  - Kliknij "Scrape Again" jeśli nie widać zmian
  
- [ ] Twitter Card Validator: https://cards-dev.twitter.com/validator
  - Sprawdź podgląd karty
  - Upewnij się, że obrazek się wyświetla

### Google Search Console:
- [ ] Dodano stronę do GSC: https://search.google.com/search-console
- [ ] Przesłano sitemap.xml
- [ ] Zweryfikowano właściciela domeny
- [ ] Sprawdzono indeksowanie (może potrwać 1-2 dni)
- [ ] Sprawdzono Mobile Usability
- [ ] Sprawdzono Core Web Vitals

### Wyszukiwarka Google:
- [ ] Wpisz: `site:grunert.pl` - sprawdź czy strona jest indeksowana
- [ ] Wpisz: `"Grunert Software"` - sprawdź pozycję w wynikach
- [ ] Sprawdź czy pojawia się LocalBusiness w panelu po prawej (Google Knowledge Panel)

### Google Maps / Business:
- [ ] Zweryfikowano profil Google Business
- [ ] Dodano link do strony
- [ ] Sprawdzono czy dane są spójne (adres, telefon, godziny)

---

## 📊 Monitoring (po 7-14 dniach):

### Pozycje w Google:
- [ ] Monitoruj pozycje dla:
  - "tworzenie aplikacji internetowych"
  - "tworzenie aplikacji mobilnych"
  - "software house Gliwice"
  - "aplikacje webowe na zamówienie"
  
### Google Analytics / Search Console:
- [ ] Sprawdź wzrost ruchu organicznego
- [ ] Sprawdź CTR w wynikach wyszukiwania
- [ ] Sprawdź średnią pozycję
- [ ] Sprawdź rich snippets impressions

### Rich Snippets:
- [ ] Sprawdź czy pojawiają się:
  - Godziny otwarcia
  - Adres
  - Telefon
  - Breadcrumbs
  - FAQ

---

## 🛠️ Narzędzia pomocnicze:

### Do sprawdzenia SEO:
- **Lighthouse** (Chrome DevTools) - audyt SEO, wydajność, a11y
- **PageSpeed Insights** - https://pagespeed.web.dev/
- **GTmetrix** - https://gtmetrix.com/
- **Ahrefs** - pełny audyt SEO (płatny)
- **Screaming Frog** - analiza struktury strony

### Do monitorowania:
- **Google Search Console** - podstawowe dane SEO
- **Google Analytics 4** - ruch, konwersje
- **Bing Webmaster Tools** - dla wyszukiwarki Bing
- **Yandex Webmaster** - dla rynku rosyjskiego

---

## 🚨 Typowe problemy i rozwiązania:

### Facebook nie pokazuje obrazka OG:
```
Rozwiązanie: Użyj Facebook Debugger i kliknij "Scrape Again"
```

### Google nie indeksuje strony:
```
Rozwiązanie:
1. Sprawdź robots.txt - czy pozwala na indeksowanie
2. Sprawdź czy jest sitemap.xml
3. Wyślij ręcznie URL do indeksacji w GSC
```

### Schema errors w Rich Results Test:
```
Rozwiązanie:
1. Sprawdź błędy w konsoli
2. Upewnij się, że JSON-LD jest poprawny
3. Sprawdź czy wszystkie wymagane pola są wypełnione
```

### Breadcrumbs nie pokazują się w Google:
```
Rozwiązanie:
- Breadcrumbs mogą potrwać 2-4 tygodnie zanim się pojawią
- Muszą być zgodne ze strukturą URL (dla single-page może nie działać)
```

---

## 📈 KPI do śledzenia:

### Organiczny ruch:
- Liczba sesji z organic search
- Wzrost CTR
- Średnia pozycja w wynikach
- Liczba słów kluczowych w TOP 10

### Rich snippets:
- Impressions rich snippets
- CTR rich vs standard
- Featured snippets (pozycja 0)

### Lokalne SEO:
- Wyświetlenia w Google Maps
- Kliknięcia "Get directions"
- Telefony z Google Business Profile

### Konwersje:
- Leads z organic traffic
- Formularze kontaktowe (origin: organic)
- Czas na stronie (avg session duration)
- Bounce rate

---

## 🎯 Cele na 30/60/90 dni:

### 30 dni:
- [ ] Pełne indeksowanie przez Google
- [ ] Pojawienie się w wynikach lokalnych
- [ ] Pierwsze rich snippets

### 60 dni:
- [ ] TOP 20 dla głównych fraz
- [ ] Wzrost ruchu organicznego o 50%
- [ ] Knowledge Panel w Google

### 90 dni:
- [ ] TOP 10 dla 3-5 głównych fraz
- [ ] Wzrost ruchu organicznego o 100%
- [ ] Featured snippets dla FAQ

---

**Status**: ✅ Wszystkie techniczne usprawnienia SEO zaimplementowane
**Następny krok**: Dodaj pliki graficzne i przetestuj w narzędziach

**Pytania?** Sprawdź `SEO_IMPROVEMENTS.md` i `FAVICON_GUIDE.md`

