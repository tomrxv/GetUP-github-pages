FROM node:9-alpine

RUN apk --no-cache add git
WORKDIR /home/app
COPY . .
RUN chown app:app /home/app -R
USER app

RUN npm i --prod

EXPOSE 3000

CMD [ "npm", "start" ]