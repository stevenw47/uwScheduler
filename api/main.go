package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/stevenw47/uwScheduler/api/pkg/handlers"
)

func main() {
	port, ok := os.LookupEnv("PORT")
	if ok == false {
		port = "8000"
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/ping", handlers.Ping)
	mux.HandleFunc("/course/", handlers.Course)
	fmt.Printf("Starting server at port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, mux))
}
