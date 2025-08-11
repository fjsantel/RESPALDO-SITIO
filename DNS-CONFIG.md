# Configuración DNS para www.franciscosantelices.cl

## 📋 Configuración Requerida en tu Proveedor de Dominio

### Registros DNS a Configurar:

```
Tipo: CNAME
Nombre: www
Valor: fjsantel.github.io
TTL: 3600 (1 hora)
```

```
Tipo: A
Nombre: @ (o franciscosantelices.cl)
Valor: 185.199.108.153
TTL: 3600
```

```
Tipo: A  
Nombre: @ (o franciscosantelices.cl)
Valor: 185.199.109.153
TTL: 3600
```

```
Tipo: A
Nombre: @ (o franciscosantelices.cl) 
Valor: 185.199.110.153
TTL: 3600
```

```
Tipo: A
Nombre: @ (o franciscosantelices.cl)
Valor: 185.199.111.153  
TTL: 3600
```

## 🔧 Pasos para Activar el Dominio:

### 1. En GitHub:
- Ve a Settings → Pages en tu repositorio
- En "Custom domain" ingresa: `www.franciscosantelices.cl`
- Marca "Enforce HTTPS"

### 2. En tu Proveedor de Dominio (ej: NIC Chile):
- Configura los registros DNS arriba mencionados
- Espera la propagación (24-48 horas máximo)

### 3. Verificación:
- El archivo `CNAME` ya está creado en tu repositorio
- Los meta tags ya apuntan al dominio final
- El `.htaccess` está configurado para redirecciones

## ⚡ Beneficios del Dominio Personalizado:

✅ **SEO Mejorado**: www.franciscosantelices.cl es más profesional
✅ **Branding**: Tu nombre como URL principal  
✅ **Credibilidad**: Los clientes confían más en dominios propios
✅ **Flexibilidad**: Puedes cambiar de hosting manteniendo la URL

## 🌐 URLs Finales:

- **Principal**: https://www.franciscosantelices.cl
- **Redirect**: franciscosantelices.cl → www.franciscosantelices.cl
- **GitHub Pages**: Automáticamente redirige al dominio personalizado

---
*Configuración preparada por Francisco Santelices Ariztía - Agencia de Contenido Audiovisual*