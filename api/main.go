package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"regexp"
)

var key = os.Getenv("UWATERLOO_OPEN_API_KEY")
var frontendOrigin = os.Getenv("FRONTEND_ORIGIN")
var port = ":8000"

var validCoursePath = regexp.MustCompile("^/course/([A-Z]+)/([0-9][0-9][0-9][a-zA-Z]*)/([0-9][0-9][0-9][0-9])$")

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/ping", func(writer http.ResponseWriter, request *http.Request) {
		switch request.Method {
		case "GET":
			writer.WriteHeader(http.StatusOK)
			fmt.Fprint(writer, "pong")
		default:
			http.NotFound(writer, request)
		}
	})
	mux.HandleFunc("/course/", func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")
		writer.Header().Set("Access-Control-Allow-Origin", frontendOrigin)
		m := validCoursePath.FindStringSubmatch(request.URL.Path)
		if m == nil {
			writer.WriteHeader(http.StatusBadRequest)
			fmt.Fprint(writer, "Did not specify all of subject, catalogNumber, and term")
			return
		}
		subject := m[1]
		catalogNumber := m[2]
		term := m[3]

		switch request.Method {
		case "GET":
			response, err := http.Get(fmt.Sprintf("https://api.uwaterloo.ca/v2/courses/%s/%s/schedule.json?term=%s&key=%s", subject, catalogNumber, term, key))

			if err != nil {
				fmt.Fprint(writer, err.Error())
				return
			}

			responseData, err := ioutil.ReadAll(response.Body)
			if err != nil {
				fmt.Fprint(writer, err.Error())
				return
			}
			fmt.Fprint(writer, string(responseData))
		default:
			http.NotFound(writer, request)
		}
	})
	fmt.Printf("Starting server at port %s\n", port)
	log.Fatal(http.ListenAndServe(port, mux))
}
