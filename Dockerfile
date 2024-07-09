# Utiliser une image de base Node.js
FROM node:14-alpine

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /usr/src/app

# Copier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Installer webpack globalement
RUN npm install -g webpack

# Copier le code source dans le répertoire de travail
COPY . .

# Exposer les ports nécessaires (si applicable)
EXPOSE 6665

# Commande par défaut pour démarrer l'application
CMD [ "npm", "start" ]
