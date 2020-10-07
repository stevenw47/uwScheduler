FROM golang:1.15-alpine as build
WORKDIR /build
COPY go.mod .
RUN go mod download
COPY . .
RUN go build -o api .

ENV PORT=8000

WORKDIR /dist
RUN cp /build/api .
EXPOSE $PORT
CMD ["/dist/api"]
