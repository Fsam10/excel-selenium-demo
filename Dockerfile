FROM node:20-slim

# Installer dépendances nécessaires à Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Définir le chemin vers Chromium
ENV CHROME_BIN=/usr/bin/chromium

# Copier le projet
WORKDIR /app
COPY . .

# Installer les dépendances du projet
RUN npm install
RUN npm install -g webpack webpack-cli webpack-dev-server

# Exposer le port utilisé par Webpack
EXPOSE 3000

# Lancer Webpack + attendre 5s + exécuter le test Selenium
CMD sh -c "npm run start & sleep 6 && node tests/selenium.test.js"
