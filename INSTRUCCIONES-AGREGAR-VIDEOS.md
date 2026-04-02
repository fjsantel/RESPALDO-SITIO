# Instrucciones para Agregar Videos al Portfolio

Este documento explica cómo agregar nuevos videos al portfolio de franciscosantelices.cl

---

## 📋 Tipos de Videos

Hay **2 tipos** de espacios para videos en el portfolio:

### 1️⃣ Videos en el SLIDER (navegables con flechas ‹ ›)
- Aparecen al inicio del portfolio
- Se navegan con botones anterior/siguiente
- Comparten un solo espacio de reproducción

### 2️⃣ Videos STANDALONE (sección independiente)
- Tienen su propia sección completa
- Aparecen como bloques separados al hacer scroll
- Ejemplo: BFA 2025, INDH, TH Hunter, ACTIVEIT

---

## 🎬 OPCIÓN 1: Agregar Video al SLIDER

### Pasos:

1. **Obtener el ID del video de YouTube**
   - URL del video: `https://youtu.be/ABC123XYZ`
   - ID del video: `ABC123XYZ`

2. **Editar el archivo `video-config.js`**

   Ubicación: `/video-config.js`

3. **Agregar el nuevo video al array**

   ```javascript
   {
       // VIDEO 7 - OCTAVO VIDEO
       index: 7,
       videoId: 'ABC123XYZ',
       url: 'https://www.youtube.com/embed/ABC123XYZ?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=ABC123XYZ&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1',
       title: 'TÍTULO DEL VIDEO<br><span class="subtitle">Subtítulo o Cliente</span>',
       description: 'Descripción completa del proyecto aquí.'
   },
   ```

4. **Guardar los cambios**

5. **Instrucción para Claude:**
   ```
   Agrega el video https://youtu.be/ABC123XYZ al slider del portfolio.
   Título: [Tu título]
   Subtítulo: [Tu subtítulo]
   Descripción: [Tu descripción]
   ```

---

## 🎥 OPCIÓN 2: Agregar Video STANDALONE (Sección Independiente)

### Pasos:

1. **Obtener el ID del video de YouTube**
   - URL del video: `https://youtu.be/ABC123XYZ`
   - ID del video: `ABC123XYZ`

2. **Decidir DESPUÉS de qué video debe aparecer**
   - Ejemplo: "después de TH Hunter"
   - Ejemplo: "después de ACTIVEIT"

3. **Instrucción para Claude:**
   ```
   Crea una sección standalone para el video https://youtu.be/ABC123XYZ
   Debe aparecer justo después de [NOMBRE DEL VIDEO ANTERIOR]
   Usa la misma información del link de YouTube para título y descripción.
   ```

### Lo que Claude hará automáticamente:

✅ Duplicará el bloque HTML del video de referencia
✅ Cambiará el ID del video
✅ Actualizará título y descripción
✅ Agregará los estilos CSS necesarios
✅ Configurará el control de sonido JavaScript
✅ Asegurará responsive design en todos los dispositivos

---

## 📝 Ejemplos de Uso

### Ejemplo 1: Agregar al Slider
```
Claude, agrega el video https://youtu.be/6-xb76aL0cU al slider.
Título: WORKCENTER
Subtítulo: Centros Privados de Negocios
Usa la descripción del video de YouTube.
```

### Ejemplo 2: Crear Sección Standalone
```
Claude, necesito crear un espacio para el video https://youtu.be/yyw-3OpEMcI
Duplica el bloque de TH Hunter y colócalo justo después.
Reemplaza el link y usa la descripción de YouTube.
```

---

## ✅ Verificación después de agregar

1. Abre el portfolio en navegador o Live Server
2. Verifica que el video aparece correctamente
3. Prueba el botón "ACTIVAR SONIDO"
4. Verifica en móvil que el diseño sea responsive

---

## 🔄 Actualizar el sitio en producción

Después de hacer cambios, Claude ejecutará automáticamente:

```bash
git add .
git commit -m "feat: add [nombre del video] to portfolio"
git push
```

Cloudflare Pages detectará los cambios y actualizará franciscosantelices.cl automáticamente (2-5 minutos).

---

## 📂 Archivos Relevantes

- **video-config.js** → Videos del slider
- **portfolio.html** → Estructura HTML
- **styles.css** → Estilos CSS
- **video-config.js** → Configuración de videos navegables

---

## 🆘 Soporte

Si tienes dudas, simplemente dile a Claude:
```
Claude, necesito agregar un nuevo video al portfolio
```

Y Claude te guiará en el proceso.
