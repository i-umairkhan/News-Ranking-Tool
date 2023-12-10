FROM alpine

ENV PORT=3000

RUN apk add --no-cache python3 py3-pip nodejs npm

WORKDIR /backend

COPY ./package*.json /backend/

COPY ./requirements.txt /backend/

RUN npm install

RUN apk add py3-pandas py3-scikit-learn

COPY . .

EXPOSE ${PORT}

CMD ["node","index"]

