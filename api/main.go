package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/stevenw47/uwScheduler/api/pkg/handlers"
)

var port = ":8000"

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/ping", handlers.Ping)
	mux.HandleFunc("/course/", handlers.Course)
	fmt.Printf("Starting server at port %s\n", port)
	log.Fatal(http.ListenAndServe(port, mux))
}
