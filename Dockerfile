FROM node AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG REACT_APP_RENT_RECEIPT_API_URL=https://rentreceiptapi-s4rewjutdq-od.a.run.app/
ENV REACT_APP_RENT_RECEIPT_API_URL=$REACT_APP_RENT_RECEIPT_API_URL

RUN echo "\nREACT_APP_RENT_RECEIPT_API_URL=${REACT_APP_RENT_RECEIPT_API_URL}" >> .env

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]