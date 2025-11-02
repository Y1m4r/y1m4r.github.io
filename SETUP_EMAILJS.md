# 📧 Configuración de EmailJS para Producción

Este documento explica cómo configurar correctamente EmailJS para que funcione tanto en desarrollo local como en producción (GitHub Pages).

## 🔍 Problema Identificado

El email funciona en `localhost` pero no en producción porque las variables de entorno no están disponibles durante el build de producción.

## ✅ Solución Implementada

### 1. Variables de Entorno en Desarrollo Local

#### Paso 1: Crear archivo `.env`
Crea un archivo `.env` en la raíz del proyecto con tus credenciales de EmailJS:

```env
VITE_EMAILJS_SERVICE_ID=tu_service_id_aqui
VITE_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
VITE_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

#### Paso 2: Obtener las credenciales de EmailJS
1. Ve a [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. **Service ID**: En la sección "Email Services", copia el ID del servicio
3. **Template ID**: En "Email Templates", copia el ID de tu template
4. **Public Key**: En "Account" → "General", copia tu Public Key

#### Paso 3: Verificar en desarrollo
```bash
npm run dev
```

Abre la consola del navegador y verifica que aparezca:
```
✅ EmailJS Configuration Loaded: { serviceId: '...', templateId: '...', publicKey: '...', environment: 'development' }
📧 EmailJS initialized successfully
```

---

### 2. Variables de Entorno en Producción (GitHub Pages)

#### Opción A: Usando GitHub Actions (Recomendado) ✨

Ya se ha creado el archivo `.github/workflows/deploy.yml` que automatiza el deployment.

**Pasos para configurar:**

1. **Ir a tu repositorio en GitHub**
2. **Settings** → **Secrets and variables** → **Actions**
3. **Clic en "New repository secret"**
4. **Agregar los siguientes secrets:**

   | Name | Value |
   |------|-------|
   | `VITE_EMAILJS_SERVICE_ID` | Tu Service ID de EmailJS |
   | `VITE_EMAILJS_TEMPLATE_ID` | Tu Template ID de EmailJS |
   | `VITE_EMAILJS_PUBLIC_KEY` | Tu Public Key de EmailJS |

5. **Habilitar GitHub Pages con GitHub Actions:**
   - Ve a **Settings** → **Pages**
   - En "Source", selecciona **"GitHub Actions"**
   - Guarda los cambios

6. **Hacer push a la rama main:**
   ```bash
   git add .
   git commit -m "Configure EmailJS with GitHub Actions"
   git push origin main
   ```

7. **Verificar el deployment:**
   - Ve a la pestaña **Actions** en tu repositorio
   - Verifica que el workflow "Deploy to GitHub Pages" se ejecute correctamente
   - Una vez completado, tu sitio estará actualizado con las variables de entorno

#### Opción B: Build Manual (No Recomendado)

Si prefieres hacer el build manualmente:

```bash
# En tu máquina local con el archivo .env configurado
npm run build

# Hacer deploy del directorio dist
npm run deploy
```

⚠️ **Advertencia**: Esta opción no es recomendada porque:
- Expone tus variables de entorno en el código compilado
- No es escalable ni segura
- Requiere rebuild manual cada vez que cambies algo

---

## 🔧 Mejoras Implementadas

### 1. Validación de Configuración
El servicio ahora valida que todas las variables estén configuradas y muestra logs detallados:

```javascript
// ✅ Configuración correcta
✅ EmailJS Configuration Loaded: { ... }
📧 EmailJS initialized successfully

// ❌ Configuración incorrecta
❌ EmailJS Configuration Missing: {
  serviceId: '✗ Missing',
  templateId: '✗ Missing',
  publicKey: '✗ Missing',
  environment: 'production'
}
```

### 2. Logs Mejorados
Ahora puedes ver exactamente qué está pasando:

```javascript
// Al enviar un email
📤 Enviando email con datos: { name: '...', email: '...', messageLength: 150, time: '...' }

// Si tiene éxito
✅ Email enviado exitosamente: { status: 200, text: 'OK', ... }

// Si falla
❌ Error detallado de EmailJS: { status: 401, text: 'Unauthorized', ... }
```

### 3. Manejo de Errores Mejorado
Mensajes de error más descriptivos según el tipo de problema:
- **400**: Error en los datos del template
- **401**: Error de autenticación (Public Key incorrecta)
- **404**: Template o servicio no encontrado

---

## 🧪 Cómo Verificar que Funciona

### En Desarrollo Local:
1. Abre la consola del navegador
2. Busca los logs de configuración de EmailJS
3. Envía un email de prueba
4. Verifica que llegue a tu bandeja de entrada

### En Producción:
1. Abre tu sitio en producción: `https://y1m4r.github.io`
2. Abre la consola del navegador (F12)
3. Verifica los logs de configuración
4. Si ves `❌ EmailJS Configuration Missing`, las variables no están configuradas
5. Si ves `✅ EmailJS Configuration Loaded`, todo está bien

---

## 📝 Checklist de Verificación

- [ ] Archivo `.env` creado en local con las 3 variables
- [ ] Secrets configurados en GitHub (si usas GitHub Actions)
- [ ] GitHub Pages configurado para usar GitHub Actions
- [ ] Workflow ejecutado exitosamente
- [ ] Logs de configuración correctos en consola
- [ ] Email de prueba enviado y recibido

---

## 🚨 Solución de Problemas

### Problema: "EmailJS no está configurado correctamente"
**Causa**: Las variables de entorno no están disponibles.

**Solución**:
1. Verifica que los secrets estén configurados en GitHub
2. Verifica que el workflow se haya ejecutado correctamente
3. Verifica que GitHub Pages esté usando "GitHub Actions" como source

### Problema: "Error de autenticación (401)"
**Causa**: La Public Key es incorrecta.

**Solución**:
1. Ve a [EmailJS Dashboard](https://dashboard.emailjs.com/) → Account → General
2. Copia la Public Key correcta
3. Actualiza el secret `VITE_EMAILJS_PUBLIC_KEY` en GitHub

### Problema: "Template no encontrado (404)"
**Causa**: El Template ID es incorrecto.

**Solución**:
1. Ve a [EmailJS Dashboard](https://dashboard.emailjs.com/) → Email Templates
2. Copia el Template ID correcto
3. Actualiza el secret `VITE_EMAILJS_TEMPLATE_ID` en GitHub

---

## 📚 Recursos Adicionales

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Pages with GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)

---

## 🎯 Buenas Prácticas Implementadas

✅ **Separación de configuración**: Variables de entorno separadas del código  
✅ **Seguridad**: Secrets no expuestos en el código fuente  
✅ **Automatización**: CI/CD con GitHub Actions  
✅ **Validación**: Verificación temprana de configuración  
✅ **Logging**: Logs detallados para debugging  
✅ **Manejo de errores**: Mensajes descriptivos según el tipo de error  
✅ **Documentación**: Instrucciones claras y completas  

---

**¿Necesitas ayuda?** Revisa los logs en la consola del navegador para identificar el problema específico.

