import fs from 'node:fs';
const repl = (f, from, to) => {
  let s = fs.readFileSync(f, 'utf8');
  if (!s.includes(from)) { console.log('NOT FOUND in', f, JSON.stringify(from)); return; }
  fs.writeFileSync(f, s.split(from).join(to));
  console.log('fixed', f);
};
repl('src/i18n/ui.ts', "    nav.calculator: Kalkulator,", "    'nav.calculator': 'Kalkulator',");
repl('src/i18n/ui.ts', "    nav.calculator: Calculator,", "    'nav.calculator': 'Calculator',");
const bad = "  { key: nav.calculator, path: /calculator },";
const good = "  { key: 'nav.calculator', path: '/calculator' },";
repl('src/components/Header.astro', bad, good);
repl('src/components/Footer.astro', bad, good);
