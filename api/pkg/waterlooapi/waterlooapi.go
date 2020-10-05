package waterlooapi

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

type CourseResponse struct {
	Data []CourseData `json:"data"`
}

type CourseData struct {
	Subject       string  `json:"subject"`
	CatalogNumber string  `json:"catalog_number"`
	Title         string  `json:"title"`
	Note          string  `json:"note"`
	ClassNumber   string  `json:"class_number"`
	Section       string  `json:"section"`
	Classes       []Class `json:"classes"`
}

type Class struct {
	Date        Date     `json:"date"`
	Location    Location `json:"location"`
	Instructors []string `json:"instructors"`
}

type Date struct {
	StartTime string `json:"start_time"`
	EndTime   string `json:"end_time"`
	Weekdays  string `json:"weekdays"`
}

type Location struct {
	Building string `json:"building"`
	Room     string `json:"room"`
}

var baseURL = "https://api.uwaterloo.ca/v2"
var key = os.Getenv("UWATERLOO_OPEN_API_KEY")

func GetCourse(subject, catalogNumber, term string) (CourseResponse, error) {
	response, err := http.Get(fmt.Sprintf("%s/courses/%s/%s/schedule.json?term=%s&key=%s", baseURL, subject, catalogNumber, term, key))

	if err != nil {
		return CourseResponse{}, err
	}

	responseBody, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return CourseResponse{}, err
	}

	var courseResponse CourseResponse
	json.Unmarshal(responseBody, &courseResponse)
	return courseResponse, nil
}
