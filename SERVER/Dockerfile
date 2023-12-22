# Use an official Node.js runtime as a parent image
FROM node:slim

# Set the working directory in the container
WORKDIR /SERVER

# Copy only the package files to Docker
COPY package*.json ./

# Install app dependencies with the exact versions
RUN npm ci

# Copy the current directory contents into the container at /SERVER
COPY . /SERVER

# Define environment variable
ENV NODE_ENV=production

ENV SALT=10 
ENV PORT=4080
ENV MONGODB_URI=mongodb+srv://adeyemoadams005:lP3EzdtOTVHx9NBe@mern-app.fcrszte.mongodb.net/?retryWrites=true&w=majority
ENV MONGO_URI='mongodb://127.0.0.1:27017/PICK-N-PAY'

ENV EXPIRY_KEY_EMAIL=7d
ENV EXPIRY_KEY_ACCESS=15s
ENV EXPIRY_KEY_REFRESH=45s
ENV EXPIRY_KEY_RESET=1h
ENV SESSION_SECRET=1c195c4214ea2c33da9c4f28b2bedb9ea9979446a5a113f11f0b0013c442ce8230915b007cb57e51c1195dc8eae1d4ce1ebfc3562b5efc06054d17f26bc806ee
ENV VERIFY_EMAIL_TOKEN_SECRET=9da31afc3caee6c877c45b283caa87ecb002948c151651400f6b69c7902908fae9cd5809337d90911876cc40b981b35209ca1494e70753131e1465a88ffcc3a5
ENV ACCESS_TOKEN_SECRET=74c1d784d3836c39ef0eac4ad2396f7daa39800940d71049514a26a470e299855f0703f743704b1aa611c11d3c99e74e262073f3b5a1b2e926dfe25f404b52da
ENV REFRESH_TOKEN_SECRET=fdfcb63cd35f2a4806b4a1d41eacf232e9df53b7a34054e47c42e50a31777653137f79f51fa91a1c9fbd791d5d6eaf15534e3eb02dec52ad9f261e6aa21418cb
ENV RESET_PASSWORD_TOKEN_SECRET=c7d316a661cff0acddae1fa700faeddd7e9546b593be4b7447ae00ef0208d53a60f957400992bfa163a82df8fd3f4c30251e7af395140022e53405c8c439d738

ENV SMTP_HOST=smtp.gmail.com
ENV SMTP_PORT=465
ENV SMTP_SERVICE=gmail
ENV SMTP_MAIL=adeyemoadams005@gmail.com
ENV SMTP_PASSWORD=mntsalccewhzlayp

ENV GOOGLESPREADSHEETID=1fHJbXCrCk4yfjqvVG-Kzbkh-l723FGKJq3EzGSq6DXI

ENV FRONTEND_URL=http://localhost:5173

# Make port 4080 available to the world outside this container
EXPOSE 4080

# Run the command
ENTRYPOINT ["npm", "start"]