# TasaCartas — cómo publicarla (≈15 min)

1. **Dominio**: compra uno sin la palabra "pokemon" (ej. tasacartas.com). Usar la marca en el dominio es lo que más riesgo legal tiene.
2. **Sube la carpeta a GitHub** (repositorio nuevo con estos archivos).
3. **Vercel** (vercel.com, plan gratis): "Add New Project" → elige el repositorio → Deploy.
4. **Clave de IA**: en console.anthropic.com crea una API key. En Vercel → Settings → Environment Variables añade `ANTHROPIC_API_KEY`. Redeploy.
   - Pon un **límite de gasto mensual** en la consola de Anthropic: cada tasación cuesta dinero y cualquiera podría abusar.
5. **Dominio propio**: Vercel → Settings → Domains.
6. **Sustituye `TU-DOMINIO.com`** por tu dominio real en `index.html`, `robots.txt` y `sitemap.xml`.
7. **Google**: entra en search.google.com/search-console, verifica el dominio y envía `https://TU-DOMINIO.com/sitemap.xml`.

## Salir arriba en Google
Nadie lo garantiza; suele llevar semanas o meses. Ayuda: indexar en Search Console, que la web cargue rápido, enlaces desde foros/redes/blogs de TCG, y publicar contenido útil (guías de "cuánto vale la carta X").

## Sobre el álbum
Esta versión guarda el álbum en el navegador de cada persona (sin cuentas). Para inicio de sesión real y álbum en la nube, añade Supabase o Firebase Auth.
