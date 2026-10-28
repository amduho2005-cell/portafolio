import { gsap } from 'gsap';

// Carrusel de proyectos en dos modos:
// - nativo (móvil o reduced-motion): la pista hace scroll horizontal con snap; botones y flechas la desplazan
// - fijado (escritorio sin reduced-motion): la sección se fija y el scroll vertical mueve la pista
export function iniciarCarrusel(mm: gsap.MatchMedia) {
  const seccion = document.querySelector<HTMLElement>('.carrusel');
  const pista = seccion?.querySelector<HTMLElement>('.pista');
  const lista = pista?.querySelector<HTMLElement>('ol');
  if (!seccion || !pista || !lista) return;

  const slides = Array.from(lista.children) as HTMLElement[];
  const anuncio = seccion.querySelector<HTMLElement>('[data-anuncio]');
  const controles = seccion.querySelector<HTMLElement>('.controles');
  const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let actual = -1;
  let fijado = false;

  // Desplazamiento de la pista que deja la slide i alineada al inicio (la última no puede pasar del final)
  const puntos = () => {
    const max = lista.scrollWidth - pista.clientWidth;
    return slides.map((s) => Math.min(s.offsetLeft - slides[0].offsetLeft, max));
  };
  const masCercano = (x: number) => {
    const p = puntos();
    return p.reduce((mejor, v, i) => (Math.abs(v - x) < Math.abs(p[mejor] - x) ? i : mejor), 0);
  };

  function activar(i: number) {
    if (i === actual) return;
    actual = i;
    slides.forEach((s, j) => s.classList.toggle('activa', j === i));
    seccion!.style.setProperty('--fondo-carrusel', `var(--${slides[i].dataset.color})`);
    if (anuncio) anuncio.textContent = `Proyecto ${i + 1} de ${slides.length}: ${slides[i].dataset.titulo}`;
  }

  let irA = (i: number) => pista.scrollTo({ left: puntos()[i], behavior: sinMovimiento ? 'auto' : 'smooth' });

  pista.addEventListener('scroll', () => activar(masCercano(pista.scrollLeft)), { passive: true });
  pista.addEventListener('keydown', (e) => {
    const paso = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!paso) return;
    e.preventDefault();
    irA(gsap.utils.clamp(0, slides.length - 1, actual + paso));
  });
  controles?.querySelectorAll<HTMLButtonElement>('[data-paso]').forEach((b) =>
    b.addEventListener('click', () => irA(gsap.utils.clamp(0, slides.length - 1, actual + Number(b.dataset.paso)))),
  );
  // En modo fijado, al tabular a una tarjeta oculta el navegador movería la pista por su cuenta: la devolvemos
  // a 0 y llevamos el scroll de la página a esa tarjeta
  lista.addEventListener('focusin', (e) => {
    if (!fijado) return;
    pista.scrollLeft = 0;
    const i = slides.findIndex((s) => s.contains(e.target as Node));
    if (i !== -1 && i !== actual) irA(i);
  });
  if (controles) controles.hidden = false;
  activar(0);

  mm.add('(min-width: 992px) and (prefers-reduced-motion: no-preference)', () => {
    const distancia = () => lista.scrollWidth - pista.clientWidth;
    fijado = true;
    seccion.classList.add('animado');
    pista.scrollLeft = 0;
    gsap.set(pista, { overflowX: 'hidden' });

    const st = gsap.to(lista, {
      x: () => -distancia(),
      ease: 'none',
      scrollTrigger: {
        trigger: seccion,
        pin: true,
        start: 'top top',
        end: () => `+=${distancia()}`,
        scrub: 0.5,
        invalidateOnRefresh: true,
        snap: {
          snapTo: (v) => puntos()[masCercano(v * distancia())] / distancia(),
          duration: 0.4,
          ease: 'power2.inOut',
          inertia: false, // encaja en el nivel más cercano, sin proyectar la velocidad del scroll
        },
        onUpdate: (self) => activar(masCercano(self.progress * distancia())),
      },
    }).scrollTrigger!;

    const irANativo = irA;
    irA = (i) => window.scrollTo({ top: st.start + (puntos()[i] / distancia()) * (st.end - st.start), behavior: 'smooth' });

    return () => {
      fijado = false;
      seccion.classList.remove('animado');
      irA = irANativo;
    };
  });
}
