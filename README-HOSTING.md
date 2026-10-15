# 🚀 Guía de Hosting - Clínica Dental Sonrisa Perfecta

## 📋 Archivos para Subir al Hosting

### Archivos Principales (Obligatorios)
```
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script.js               # JavaScript funcional
├── robots.txt              # Directivas para motores de búsqueda
├── sitemap.xml             # Mapa del sitio para SEO
├── .htaccess               # Configuración Apache
└── images/                 # Carpeta de imágenes
    ├── 4.png               # Dentista profesional (Hero)
    ├── 3.png               # Interior clínica (About)
    ├── 1.jpg               # Antes blanqueamiento
    ├── 11.jpg              # Después blanqueamiento
    ├── 2.jpg               # Antes ortodoncia
    └── 22.jpg              # Después ortodoncia
```

### Archivos Opcionales (Recomendados)
```
├── favicon.ico             # Icono del sitio
├── apple-touch-icon.png    # Icono para iOS
├── favicon-32x32.png       # Icono 32x32
├── favicon-16x16.png       # Icono 16x16
└── btn-agar-cita.html      # Demo del botón (opcional)
```

## ⚙️ Configuración Necesaria

### 1. Actualizar URLs en el código
Antes de subir, reemplaza:
- `[tu-sitio-web.com]` → Tu dominio real (ej: www.clinicasonrisaperfecta.com)
- `[Tu Ciudad]` → Tu ciudad real
- `[Tu Dirección]` → Tu dirección completa
- `[Latitud]` y `[Longitud]` → Coordenadas de Google Maps

### 2. Archivos a modificar:
- `index.html` (líneas 6, 21-26, 42-44, 55-56, 110, 120-121)
- `sitemap.xml` (todas las URLs)
- `.htaccess` (líneas de HTTPS si tienes SSL)

## 🔧 Requisitos del Hosting

### Mínimos Recomendados
- ✅ **HTML5, CSS3, JavaScript ES6+**
- ✅ **Apache con mod_rewrite** (para URLs amigables)
- ✅ **Soporte para .htaccess**
- ✅ **Gzip compression** (opcional pero recomendado)
- ✅ **SSL Certificate** (HTTPS obligatorio para SEO)

### Hostings Compatibles
- Hostinger
- GoDaddy
- Bluehost
- SiteGround
- Hostgator
- Cualquier hosting con Apache/Linux

## 📤 Pasos para Subir

### 1. Subir archivos
```bash
# Subir todos los archivos al directorio public_html o www
# Mantener la estructura de carpetas intacta
```

### 2. Verificar permisos
```bash
# Archivos: 644
# Directorios: 755
# .htaccess: 644
```

### 3. Activar HTTPS (si tienes SSL)
Descomenta las líneas en `.htaccess`:
```apache
# Forzar HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## ✅ Verificación Post-Instalación

### Checklist de Funcionalidad
- [ ] Página carga correctamente
- [ ] Todos los enlaces funcionan
- [ ] Botones de WhatsApp redirigen correctamente
- [ ] Botón de Facebook funciona
- [ ] Formulario envía datos a WhatsApp
- [ ] Imágenes se muestran correctamente
- [ ] Diseño responsive en móvil
- [ ] Navegación suave entre secciones
- [ ] Animaciones y efectos hover funcionan

### SEO Verification
- [ ] Meta tags visibles en el código fuente
- [ ] Open Graph funciona (probar en Facebook Debugger)
- [ ] Twitter Cards funcionan (probar en Card Validator)
- [ ] Schema markup válido (Google Rich Results Test)
- [ ] robots.txt accesible: `tudominio.com/robots.txt`
- [ ] sitemap.xml accesible: `tudominio.com/sitemap.xml`

## 🚀 Optimización Adicional

### Google Search Console
1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Agrega tu propiedad
3. Sube el sitemap.xml
4. Verifica indexación

### Google Analytics (Opcional)
```html
<!-- Agregar antes de </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Facebook Pixel (Opcional)
```html
<!-- Agregar después de <body> -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

## 🐛 Problemas Comunes

### Imágenes no cargan
- Verificar que los nombres de archivo coincidan exactamente
- Checkear mayúsculas/minúsculas (Linux es case-sensitive)
- Asegurar que la carpeta images existe

### Enlaces rotos
- Reemplazar `[tu-sitio-web.com]` con tu dominio real
- Verificar que todos los archivos estén subidos

### CSS no carga
- Verificar que styles.css esté en el directorio raíz
- Checkear permisos del archivo (644)

### Formulario no funciona
- Verificar que script.js esté subido
- Checkear que el número de WhatsApp sea correcto

## 📞 Soporte

Si tienes problemas durante la instalación:
1. Revisa este README detenidamente
2. Verifica que todos los archivos estén subidos
3. Checkea los permisos de archivos
4. Contacta a tu proveedor de hosting si es necesario

---
**¡Listo para recibir pacientes! 🦷✨**
