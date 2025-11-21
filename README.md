# Grunert Software - Website

Strona internetowa Grunert Software - software house specjalizująca się w aplikacjach webowych, mobilnych i systemach IT.

## Technologie

- React 18
- Vite
- CSS3 (custom properties, animations)

## Instalacja i uruchomienie

```bash
# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego
npm run dev

# Build produkcyjny
npm run build

# Podgląd builda produkcyjnego
npm run preview
```

## Optymalizacja SEO

Strona została zoptymalizowana pod kątem widoczności w Google. Zawiera:

- **Meta tagi**: title, description, keywords, Open Graph
- **Structured data (JSON-LD)**: Organization, FAQPage, Service, BreadcrumbList
- **robots.txt**: Plik w katalogu `public/robots.txt`
- **sitemap.xml**: Plik w katalogu `public/sitemap.xml`

### Konfiguracja Google Search Console

Aby strona była widoczna w Google, wykonaj następujące kroki:

1. **Dodaj stronę do Google Search Console**
   - Przejdź do [Google Search Console](https://search.google.com/search-console)
   - Kliknij "Dodaj właściwość"
   - Wybierz "Prefiks URL" i wprowadź `https://grunert.pl`
   - Zweryfikuj własność domeny (metoda zalecana: plik HTML lub meta tag)

2. **Prześlij sitemap**
   - W Google Search Console przejdź do sekcji "Sitemaps"
   - Wprowadź adres: `https://grunert.pl/sitemap.xml`
   - Kliknij "Prześlij"
   - Google rozpocznie indeksowanie strony (może to zająć kilka dni)

3. **Weryfikacja structured data**
   - Użyj narzędzia [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Wklej URL strony lub kod HTML
   - Sprawdź czy wszystkie schematy są poprawnie rozpoznane

4. **Monitorowanie**
   - Regularnie sprawdzaj raporty w Google Search Console
   - Monitoruj liczbę zaindeksowanych stron
   - Sprawdzaj błędy indeksowania i naprawiaj je

### Aktualizacja sitemap.xml

Jeśli dodasz nowe podstrony, zaktualizuj plik `public/sitemap.xml`:

```xml
<url>
  <loc>https://grunert.pl/nowa-podstrona</loc>
  <lastmod>2025-01-20</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

Następnie prześlij zaktualizowany sitemap ponownie w Google Search Console.

## Deployment

### Automatyczny deployment przez GitHub Actions

Projekt jest skonfigurowany do automatycznego wdrażania na home.pl po każdym pushu do głównej gałęzi (main/master).

#### Konfiguracja GitHub Secrets

1. Przejdź do repozytorium na GitHub
2. Kliknij **Settings** → **Secrets and variables** → **Actions**
3. Dodaj następujące secrets:
   - `FTP_SERVER` - adres serwera FTP (np. `ftp.grunert.pl` lub `grunert.pl`)
   - `FTP_USERNAME` - nazwa użytkownika FTP
   - `FTP_PASSWORD` - hasło FTP
   - `FTP_SERVER_DIR` - ścieżka do katalogu www na serwerze (np. `/public_html` lub `/www`)

#### Jak to działa

- Po każdym `git push` do gałęzi `main` lub `master`, GitHub Actions automatycznie:
  1. Buduje projekt (`npm run build`)
  2. Wgrywa pliki z katalogu `dist/` na serwer home.pl przez FTP
  3. Wyświetla status deploymentu w zakładce **Actions**

#### Ręczne uruchomienie deploymentu

Możesz też ręcznie uruchomić deployment:
1. Przejdź do zakładki **Actions** w repozytorium
2. Wybierz workflow **Deploy to home.pl**
3. Kliknij **Run workflow**

### Ważne pliki do wdrożenia

- `dist/index.html` - główny plik HTML
- `dist/assets/` - zoptymalizowane pliki CSS i JS
- `dist/robots.txt` - kopiowany z `public/robots.txt`
- `dist/sitemap.xml` - kopiowany z `public/sitemap.xml`

Upewnij się, że pliki `robots.txt` i `sitemap.xml` są dostępne w głównym katalogu domeny (np. `https://grunert.pl/robots.txt`).

### Ręczny deployment (alternatywa)

Jeśli chcesz wgrać pliki ręcznie:

```bash
npm run build
```

Następnie wgraj zawartość katalogu `dist/` na serwer hostingowy przez FTP.

## Licencja

© 2025 Grunert Software. Wszelkie prawa zastrzeżone.

