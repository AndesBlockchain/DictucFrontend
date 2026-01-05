
#!/bin/bash

echo "🚀 Iniciando deploy..."

# Guardar cambios locales en archivos no trackeados
git stash

# Configurar estrategia de merge si no está configurada
git config pull.rebase false

# Actualizar código
echo "📦 Descargando último código..."
git pull origin main

# Restaurar cambios locales
git stash pop 2>/dev/null || true

# Instalar/actualizar dependencias
echo "📚 Actualizando dependencias..."
yarn install

# Rebuild admin panel de Strapi
echo "🔨 Rebuilding Gatsby"
gatsby clean

# Reiniciar aplicación con PM2
echo "♻️  Reiniciando aplicación..."
pm2 restart gatsby

echo "✅ Deploy completado!"
pm2 status
