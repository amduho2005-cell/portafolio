// sessionStorage puede fallar (modo privado, almacenamiento bloqueado): el sitio funciona igual sin él
const leer = (clave: string) => {
  try {
    return sessionStorage.getItem(clave);
  } catch {
    return null;
  }
};
const guardar = (clave: string, valor: string) => {
  try {
    sessionStorage.setItem(clave, valor);
  } catch {}
};

let temporizador: number | undefined;

function avisar(texto: string) {
  const aviso = document.querySelector<HTMLElement>('.aviso-juego');
  if (!aviso) return;
  aviso.textContent = texto;
  aviso.classList.add('visible');
  clearTimeout(temporizador);
  temporizador = window.setTimeout(() => aviso.classList.remove('visible'), 1800);
}

// XP: +100 la primera vez que cada sección marcada con data-xp-id entra en pantalla, durante toda la visita
export function iniciarXP() {
  const vistos = new Set<string>(JSON.parse(leer('xp') ?? '[]'));
  const contador = document.querySelector<HTMLElement>('[data-xp]');
  const pintar = () => {
    if (contador) contador.textContent = `XP ${String(vistos.size * 100).padStart(3, '0')}`;
  };
  pintar();

  const observador = new IntersectionObserver(
    (entradas) =>
      entradas.forEach((e) => {
        const id = (e.target as HTMLElement).dataset.xpId!;
        if (!e.isIntersecting || vistos.has(id)) return;
        vistos.add(id);
        guardar('xp', JSON.stringify([...vistos]));
        pintar();
        avisar('+100 XP');
      }),
    // Cuenta cuando la sección llega al 60% superior de la pantalla (sirve también para secciones muy altas)
    { rootMargin: '0px 0px -40% 0px' },
  );
  document.querySelectorAll('[data-xp-id]').forEach((el) => observador.observe(el));
  return () => observador.disconnect();
}

// Easter egg: código Konami activa o desactiva el modo fiesta
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let progreso = 0;

// Cuántas teclas del código llevamos tras pulsar `tecla`. Si falla, un ↑ puede ser el inicio de un nuevo intento
// (y tras ↑↑, un tercer ↑ deja la cuenta en 2, no en 1)
export function avanzarKonami(progreso: number, tecla: string) {
  if (tecla === KONAMI[progreso]) return progreso + 1;
  if (tecla === 'ArrowUp') return progreso === 2 ? 2 : 1;
  return 0;
}

const aplicarFiesta = () => document.documentElement.classList.toggle('fiesta', leer('fiesta') === '1');

export function iniciarKonami() {
  document.addEventListener('keydown', (e) => {
    const tecla = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    progreso = avanzarKonami(progreso, tecla);
    if (progreso < KONAMI.length) return;
    progreso = 0;
    const activo = leer('fiesta') !== '1';
    guardar('fiesta', activo ? '1' : '0');
    aplicarFiesta();
    avisar(activo ? '¡Modo fiesta!' : 'Modo normal');
  });
  // Al navegar, Astro reemplaza los atributos de <html>: hay que volver a aplicar la clase
  document.addEventListener('astro:after-swap', aplicarFiesta);
  aplicarFiesta();
}
