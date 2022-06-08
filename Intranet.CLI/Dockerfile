
FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY next.config.js ./next.config.js

#COPY pages ./pages
#COPY public ./public
#COPY styles ./styles

CMD ["yarn", "dev"]


#FROM node:16.14.0-alpine as build
#WORKDIR /app
#COPY package.json ./
#RUN npm install
#COPY . .
#RUN npm run build

#FROM node:16.14.0-alpine as final
#EXPOSE 3100
#WORKDIR /app
#COPY --from=build /app/public ./public
#COPY --from=build /app/.next ./.next
#COPY --from=build /app/package.json ./package.json
#COPY --from=build /app/node_modules ./node_modules

CMD ["npm", "start"]
