FROM node AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG REACT_APP_RENT_RECEIPT_API_URL=https://rentreceiptapi-s4rewjutdq-od.a.run.app
ENV REACT_APP_RENT_RECEIPT_API_URL=$REACT_APP_RENT_RECEIPT_API_URL

RUN echo "\nREACT_APP_RENT_RECEIPT_API_URL=${REACT_APP_RENT_RECEIPT_API_URL}" >> .env

RUN npm run build

FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]