# Usa la imagen oficial de Node.js como base
FROM node:18

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json (o yarn.lock) y luego instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto en el que la aplicación estará corriendo
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["npm", "start"]
