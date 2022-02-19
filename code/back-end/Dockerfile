FROM golang
WORKDIR /usr/src/app
ENV MONGO_HOST mongodb
ENV MONGO_USERNAME mongoadmin
ENV MONGO_PASSWORD 1234
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .
EXPOSE 8000

CMD ["go", "run", "main.go"]