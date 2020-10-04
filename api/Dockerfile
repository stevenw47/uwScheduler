FROM golang:1.15-alpine
WORKDIR /app
COPY go.mod .
RUN go mod download
COPY . .
EXPOSE 8000
CMD ["go", "run", "main.go"]
