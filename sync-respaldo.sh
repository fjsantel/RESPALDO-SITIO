#!/bin/bash

# Script para sincronizar manualmente con RESPALDO-SITIO
# Manual sync script for RESPALDO-SITIO repository

echo "🔄 Iniciando sincronización con RESPALDO-SITIO..."

# Verificar que estamos en la rama main
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "⚠️  Cambiando a rama main..."
    git checkout main
fi

# Verificar si el remote respaldo existe
if ! git remote get-url respaldo > /dev/null 2>&1; then
    echo "📡 Agregando remote respaldo..."
    git remote add respaldo https://github.com/fjsantel/RESPALDO-SITIO.git
fi

# Actualizar remote respaldo
echo "📥 Actualizando información de repositorios..."
git fetch respaldo

# Hacer push forzado a respaldo
echo "🚀 Sincronizando contenido con RESPALDO-SITIO..."
git push respaldo main --force

# Verificar resultado
if [ $? -eq 0 ]; then
    echo "✅ Sincronización completada exitosamente!"
    echo ""
    echo "📂 Repositorio principal: https://fjsantel.github.io/francisco-santelices-agencia-contenido/"
    echo "🔄 Repositorio respaldo: https://fjsantel.github.io/RESPALDO-SITIO/"
    echo ""
    echo "⏱️  Los sitios se actualizarán en GitHub Pages en 1-2 minutos."
else
    echo "❌ Error en la sincronización. Verifica los permisos del repositorio."
    exit 1
fi