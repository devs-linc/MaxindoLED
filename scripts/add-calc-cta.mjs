import fs from 'node:fs';

// ---- 1) Home: calculator promo band before the EVENT TYPES section ----
const homeFile = 'src/pages/[lang]/index.astro';
let home = fs.readFileSync(homeFile, 'utf8');
const homeAnchor = '  <!-- EVENT TYPES -->';
const homeBand = `  <!-- CALCULATOR CTA -->
  <section class="container-x py-10 md:py-14">
    <div class="overflow-hidden rounded-3xl border border-line bg-cream p-8 md:p-12">
      <div class="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div class="max-w-xl">
          <span class="icon-badge amber mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="11" x2="8.01" y2="11"/><line x1="12" y1="11" x2="12.01" y2="11"/><line x1="16" y1="11" x2="16.01" y2="11"/><line x1="8" y1="15" x2="8.01" y2="15"/><line x1="12" y1="15" x2="12.01" y2="15"/><line x1="16" y1="15" x2="16" y2="18"/><line x1="8" y1="18" x2="12" y2="18"/></svg>
          </span>
          <h2 class="section-title">{lang === 'id' ? 'Hitung Estimasi Biaya Sewa' : 'Estimate Your Rental Cost'}</h2>
          <p class="lead mt-3">{lang === 'id' ? 'Gunakan kalkulator sewa kami untuk memperkirakan biaya peralatan acara Anda dalam hitungan detik, lalu kirim penawarannya langsung ke WhatsApp.' : 'Use our rental calculator to estimate your event equipment cost in seconds, then send the quote straight to WhatsApp.'}</p>
        </div>
        <a class="btn-primary shrink-0" href={localizedPath(lang, '/calculator')}>
          {lang === 'id' ? 'Buka Kalkulator' : 'Open Calculator'}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  </section>

`;
if (home.includes(homeBand.trim().slice(0, 40))) {
  console.log('home band already present — skipping');
} else if (home.includes(homeAnchor)) {
  home = home.replace(homeAnchor, homeBand + homeAnchor);
  fs.writeFileSync(homeFile, home);
  console.log('home calculator band inserted');
} else {
  console.log('HOME ANCHOR NOT FOUND');
}

// ---- 2) Equipment catalog index: calculator button under the header ----
const eqFile = 'src/pages/[lang]/equipment/index.astro';
let eq = fs.readFileSync(eqFile, 'utf8');
const eqAnchor = '      <p class="lead mt-5">{copy.intro}</p>';
const eqBtn = `      <p class="lead mt-5">{copy.intro}</p>
      <div class="mt-7 flex flex-wrap gap-3">
        <a class="btn-primary" href={localizedPath(lang, '/calculator')}>
          {lang === 'id' ? 'Hitung Estimasi Sewa' : 'Calculate Rental Estimate'}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>`;
if (eq.includes('/calculator')) {
  console.log('equipment calc button already present — skipping');
} else if (eq.includes(eqAnchor)) {
  eq = eq.replace(eqAnchor, eqBtn);
  fs.writeFileSync(eqFile, eq);
  console.log('equipment calculator button inserted');
} else {
  console.log('EQUIPMENT ANCHOR NOT FOUND');
}
