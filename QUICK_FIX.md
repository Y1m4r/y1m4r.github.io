# 🚀 Solución Rápida - EmailJS en Producción

## ⚡ Pasos Rápidos (5 minutos)

### 1️⃣ Configurar Secrets en GitHub

1. Ve a tu repositorio: `https://github.com/y1m4r/y1m4r.github.io`
2. **Settings** → **Secrets and variables** → **Actions**
3. Clic en **"New repository secret"**
4. Agrega estos 3 secrets:

```
Name: VITE_EMAILJS_SERVICE_ID
Value: [Tu Service ID de EmailJS]

Name: VITE_EMAILJS_TEMPLATE_ID
Value: [Tu Template ID de EmailJS]

Name: VITE_EMAILJS_PUBLIC_KEY
Value: [Tu Public Key de EmailJS]
```

### 2️⃣ Configurar GitHub Pages

1. **Settings** → **Pages**
2. En "Source", selecciona: **GitHub Actions**
3. Guarda

### 3️⃣ Hacer Deploy

```bash
git add .
git commit -m "fix: Configure EmailJS for production"
git push origin main
```

### 4️⃣ Verificar

1. Ve a **Actions** en tu repositorio
2. Espera a que termine el workflow "Deploy to GitHub Pages" (2-3 minutos)
3. Abre tu sitio: `https://y1m4r.github.io`
4. Abre la consola (F12) y verifica que aparezca:
   ```
   ✅ EmailJS Configuration Loaded
   ```

---

## 🔑 ¿Dónde obtener las credenciales?

### EmailJS Dashboard: https://dashboard.emailjs.com/

- **Service ID**: Email Services → Copia el ID
- **Template ID**: Email Templates → Copia el ID
- **Public Key**: Account → General → Copia la Public Key

---

## ✅ ¿Cómo saber si funciona?

### En la consola del navegador verás:

**✅ CORRECTO:**
```
✅ EmailJS Configuration Loaded: { serviceId: '...', templateId: '...', publicKey: '...', environment: 'production' }
📧 EmailJS initialized successfully
```

**❌ INCORRECTO:**
```
❌ EmailJS Configuration Missing: {
  serviceId: '✗ Missing',
  templateId: '✗ Missing',
  publicKey: '✗ Missing'
}
```

---

## 🆘 Problemas Comunes

### "Configuration Missing" en producción
- Verifica que los secrets estén bien escritos (con el prefijo `VITE_`)
- Verifica que GitHub Pages esté usando "GitHub Actions"
- Haz un nuevo push para forzar un rebuild

### "Error 401 - Unauthorized"
- La Public Key es incorrecta
- Verifica en EmailJS Dashboard → Account → General

### "Error 404 - Not Found"
- El Service ID o Template ID son incorrectos
- Verifica en EmailJS Dashboard

---

## 📖 Documentación Completa

Para más detalles, revisa: **SETUP_EMAILJS.md**

