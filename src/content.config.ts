import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Casos de estudio: el frontmatter son los metadatos; el cuerpo MDX, las secciones (problema, proceso…)
const proyectos = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/proyectos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumen: z.string().max(140),
      orden: z.number().int(),
      portada: image(),
      portadaAlt: z.string(),
      // Color de fondo del carrusel cuando este proyecto está activo (texto siempre en --tinta)
      color: z.enum(['lavanda', 'lima', 'lavanda-suave']),
      rol: z.string(),
      duracion: z.string(),
      tipo: z.string(),
      herramientas: z.array(z.string()).min(1),
      enlace: z.url().optional(),
    }),
});

export const collections = { proyectos };
