package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"regexp"

	"github.com/stevenw47/uwScheduler/api/pkg/waterlooapi"
)

func Ping(writer http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case "GET":
		writer.WriteHeader(http.StatusOK)
		fmt.Fprint(writer, "pong")
	default:
		http.NotFound(writer, request)
	}
}

var frontendOrigin = os.Getenv("FRONTEND_ORIGIN")

var validCoursePath = regexp.MustCompile("^/course/([A-Z]+)/([0-9][0-9][0-9][a-zA-Z]*)/([0-9][0-9][0-9][0-9])$")

func Course(writer http.ResponseWriter, request *http.Request) {
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
		courseResponse, err := waterlooapi.GetCourse(subject, catalogNumber, term)
		if err != nil {
			fmt.Fprint(writer, err.Error())
			return
		}

		// TODO: ignoring err for now, since we just Unmarshaled the data
		responseData, _ := json.Marshal(courseResponse)
		fmt.Fprint(writer, string(responseData))
	default:
		http.NotFound(writer, request)
	}
}
