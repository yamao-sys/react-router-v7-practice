FROM node:22-bookworm

WORKDIR /src

COPY ./package.json ./package-lock.json /src/

RUN npm install
RUN npx playwright install
RUN npx playwright install-deps

CMD sh -c "npm run dev"
