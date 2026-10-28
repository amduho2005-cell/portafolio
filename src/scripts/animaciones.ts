import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { iniciarCarrusel } from './carrusel';
import { iniciarKonami, iniciarXP } from './microinteracciones';

gsap.registerPlugin(ScrollTrigger);

let mm: gsap.MatchMedia | undefined;
let pararXP: (() => void) | undefined;

// Las animaciones solo existen si la persona no pidió movimiento reducido; sin ellas todo se ve en su sitio
function iniciar() {
  mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    introHero();
    entradas();
  });
  // Fuera del bloque anterior: botones y flechas también sirven con reduced-motion
  iniciarCarrusel(mm);
  pararXP = iniciarXP();
}

function introHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const q = gsap.utils.selector(hero);

  gsap
    .timeline({ defaults: { ease: 'power4.out', duration: 0.8 } })
    .from(q('.hud'), { yPercent: -100, duration: 0.5 })
    .from(q('.nombre span'), { yPercent: 100, opacity: 0, stagger: 0.12 }, '-=0.2')
    .from(q('.rol, .frase'), { y: 20, opacity: 0, stagger: 0.08 }, '-=0.4')
    .from(q('.menu li'), { x: 40, opacity: 0, stagger: 0.08, ease: 'back.out(2)' }, '<')
    // Se revela con clip-path y no con scale: la tira está girada y cambiar su transform-origin la desplaza en vertical
    .fromTo(
      q('.marquesina'),
      { clipPath: 'inset(0% 100% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, clearProps: 'clipPath' },
      '-=0.3',
    );

  // El texto de la marquesina está repetido un número par de veces: moverlo -50% hace un bucle sin salto
  gsap.to(q('.marquesina span'), { xPercent: -50, duration: 30, ease: 'none', repeat: -1 });
}

// data-entrada: el elemento entra al hacer scroll. data-entrada="grupo": entran sus hijos, uno tras otro.
function entradas() {
  gsap.utils.toArray<HTMLElement>('[data-entrada]').forEach((el) => {
    gsap.from(el.dataset.entrada === 'grupo' ? el.children : el, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

// Con View Transitions el script se ejecuta una vez: hay que iniciar en cada página y limpiar antes del cambio
document.addEventListener('astro:page-load', iniciar);
document.addEventListener('astro:before-swap', () => {
  mm?.revert();
  pararXP?.();
});
// El código Konami escucha el documento, que sobrevive a la navegación: se registra una sola vez
iniciarKonami();
