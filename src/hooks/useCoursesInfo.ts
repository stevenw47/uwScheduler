import { useEffect, useState } from 'react';
import { CourseInfo, WeekdaysAbbreviated } from 'components/common/types';
import { useCachedApiCalls } from './cachedApiCalls';

export const NO_TIME = -1;

const timeByColonReg = /(\d\d):(\d\d)/;

// timeByColon is like XX:XX, 24 hour time
const processTime = (timeByColon: string) => {
  if (!timeByColon) {
    return false;
  }
  const match = timeByColonReg.exec(timeByColon);
  if (match) {
    const hour = Number(match[1]);
    const minute = Math.round((Number(match[2]) / 60) * 100);
    return hour + minute / 100;
  }
  throw Error(`Invalid timeByColon ${timeByColon}`);
};

const weekdaysShortReg = /([A-Z][a-z]?)/g;

// weekdaysShort is like 'TTh'
const processWeekdays = (weekdaysShort: string) => {
  if (!weekdaysShort) {
    return false;
  }
  const match = weekdaysShort.match(weekdaysShortReg);
  if (match) {
    return match;
  }
  throw Error(`Invalid weekdaysShort ${weekdaysShort}`);
};

const processInstructors = (instructorsCommaArray: string[]) => {
  return instructorsCommaArray
    .map(instructorComma =>
      instructorComma
        .split(',')
        .reverse()
        .join(' '),
    )
    .join(', ');
};

// courseInfo is from the uwaterloo api
// TODO: the variables are named badly...
// const processCourseInfo = (courseInfo: courseInfoType): CourseInfo => {
const processCourseInfo = (courseInfo: any): CourseInfo => {
  if (!courseInfo.length) {
    throw Error(`Expected ${courseInfo} to be an array of size at least 1.`);
  }

  // TODO:
  // these should be the same for each course
  // we can check and if not, do some error
  const { subject, catalog_number, title, note } = courseInfo[0];

  const processedClasses = [];

  for (const course of courseInfo) {
    if (course.classes.length !== 1) {
      throw Error(`Expected ${course.classes} to be an array of size 1.`);
    }

    const { class_number, section } = course;

    const classes = course.classes[0];

    const { date, location, instructors } = classes;

    processedClasses.push({
      classNumber: class_number,
      section,
      date: {
        startTime: processTime(date.start_time) || NO_TIME,
        endTime: processTime(date.end_time) || NO_TIME,
        weekdays: (processWeekdays(date.weekdays) ||
          []) as WeekdaysAbbreviated[],
      },
      location,
      instructors: processInstructors(instructors),
    });
  }

  return {
    subject,
    catalogNumber: catalog_number,
    title,
    note,
    sections: processedClasses,
  };
};

const courseReg = /([a-z]+)([\d].+)/i;

const backendUrl = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:5000';

// TODO: use type for courseNames
export const useCoursesInfo = (
  term: number | undefined,
  courseNames: string[],
) => {
  // http://www.adm.uwaterloo.ca/cgi-bin/cgiwrap/infocour/salook.pl?level=under&sess=1205&subject=CO&cournum=454

  const [cachedApiCalls, addApiCallToCache] = useCachedApiCalls();

  const [coursesInfo, setCoursesInfo] = useState<any[]>([]);

  useEffect(() => {
    // TODO: handle errors in these things

    const getCourseInfo = async (courseName: string) => {
      const match = courseReg.exec(courseName);

      if (match) {
        const subject = match[1];
        const catalogNumber = match[2];
        const res = await fetch(
          `${backendUrl}/course?term=${term}&subject=${subject}&catalogNumber=${catalogNumber}`,
        );
        const resJson = await res.json();
        const data = resJson.data;
        return data;
      }
      // throw Error(`Invalid courseName ${courseName}`);
      return false;
    };

    // TODO: clean up the code below
    async function fetchData() {
      const newCoursesInfo = [];
      for (const courseName of courseNames) {
        const key = `${term}_${courseName}`;
        let newCourseInfo = cachedApiCalls[key];
        if (newCourseInfo === false) {
          alert(`${courseName} cannot be found for term ${term}.`);
        }
        if (newCourseInfo) {
          newCoursesInfo.push(newCourseInfo);
        } else {
          const courseInfo = await getCourseInfo(courseName);
          console.log('apicall courseInfo', courseInfo);
          if (courseInfo && courseInfo.length) {
            // TODO: dont filter out here, but instead just check them for conflicts
            // filter out TST
            const courseInfoWithoutTST = courseInfo.filter(
              (x: any) => !x.section.includes('TST'),
            );
            newCourseInfo = processCourseInfo(courseInfoWithoutTST);
            addApiCallToCache(key, newCourseInfo);
            newCoursesInfo.push(newCourseInfo);
          } else {
            addApiCallToCache(key, courseInfo);
            alert(`${courseName} cannot be found for term ${term}.`);
          }
        }
      }
      setCoursesInfo(newCoursesInfo);
    }
    if (term) {
      fetchData();
    }
  }, [term, courseNames, cachedApiCalls, addApiCallToCache]);

  return coursesInfo;
};

let temp = [
  [
    {
      subject: 'CO',
      catalog_number: '342',
      units: 0.5,
      title: 'Introduction to Graph Theory',
      note: null,
      class_number: 3641,
      section: 'LEC 001',
      campus: 'UW U',
      associated_class: 1,
      related_component_1: null,
      related_component_2: null,
      enrollment_capacity: 75,
      enrollment_total: 0,
      waiting_capacity: 0,
      waiting_total: 0,
      topic: null,
      reserves: [],
      classes: [
        {
          date: {
            start_time: '10:00',
            end_time: '11:20',
            weekdays: 'TTh',
            start_date: null,
            end_date: null,
            is_tba: false,
            is_cancelled: false,
            is_closed: false,
          },
          location: {
            building: 'PHY',
            room: '313',
          },
          instructors: ['Haxell,Penny'],
        },
      ],
      held_with: [],
      term: 1205,
      academic_level: 'undergraduate',
      last_updated: '2020-03-07T02:09:11-05:00',
    },
  ],
  [
    {
      subject: 'CO',
      catalog_number: '351',
      units: 0.5,
      title: 'Network Flow Theory',
      note: null,
      class_number: 3642,
      section: 'LEC 001',
      campus: 'UW U',
      associated_class: 1,
      related_component_1: null,
      related_component_2: null,
      enrollment_capacity: 75,
      enrollment_total: 0,
      waiting_capacity: 0,
      waiting_total: 0,
      topic: null,
      reserves: [],
      classes: [
        {
          date: {
            start_time: '11:30',
            end_time: '12:20',
            weekdays: 'MWF',
            start_date: null,
            end_date: null,
            is_tba: false,
            is_cancelled: false,
            is_closed: false,
          },
          location: {
            building: 'MC',
            room: '2038',
          },
          instructors: ['Pei,Martin'],
        },
      ],
      held_with: [],
      term: 1205,
      academic_level: 'undergraduate',
      last_updated: '2020-03-07T02:09:11-05:00',
    },
  ],
  [
    {
      subject: 'CO',
      catalog_number: '454',
      units: 0.5,
      title: 'Scheduling',
      note: null,
      class_number: 3643,
      section: 'LEC 001',
      campus: 'UW U',
      associated_class: 1,
      related_component_1: null,
      related_component_2: null,
      enrollment_capacity: 45,
      enrollment_total: 0,
      waiting_capacity: 0,
      waiting_total: 0,
      topic: null,
      reserves: [],
      classes: [
        {
          date: {
            start_time: '10:00',
            end_time: '11:20',
            weekdays: 'MW',
            start_date: null,
            end_date: null,
            is_tba: false,
            is_cancelled: false,
            is_closed: false,
          },
          location: {
            building: 'MC',
            room: '4064',
          },
          instructors: ['Cheriyan,Joseph'],
        },
      ],
      held_with: [],
      term: 1205,
      academic_level: 'undergraduate',
      last_updated: '2020-03-07T02:09:11-05:00',
    },
  ],
  [
    {
      subject: 'PMATH',
      catalog_number: '336',
      units: 0.5,
      title: 'Introduction to Group Theory with Applications',
      note: null,
      class_number: 3627,
      section: 'LEC 001',
      campus: 'UW U',
      associated_class: 1,
      related_component_1: null,
      related_component_2: null,
      enrollment_capacity: 45,
      enrollment_total: 0,
      waiting_capacity: 0,
      waiting_total: 0,
      topic: null,
      reserves: [],
      classes: [
        {
          date: {
            start_time: '08:30',
            end_time: '09:20',
            weekdays: 'MWF',
            start_date: null,
            end_date: null,
            is_tba: false,
            is_cancelled: false,
            is_closed: false,
          },
          location: {
            building: 'MC',
            room: '4021',
          },
          instructors: ['Madill,Blake'],
        },
      ],
      held_with: [],
      term: 1205,
      academic_level: 'undergraduate',
      last_updated: '2020-03-07T02:10:43-05:00',
    },
  ],
  [
    {
      subject: 'CS',
      catalog_number: '466',
      units: 0.5,
      title: 'Algorithm Design and Analysis',
      note: null,
      class_number: 3659,
      section: 'LEC 001',
      campus: 'UW U',
      associated_class: 1,
      related_component_1: '101',
      related_component_2: null,
      enrollment_capacity: 60,
      enrollment_total: 0,
      waiting_capacity: 0,
      waiting_total: 0,
      topic: null,
      reserves: [],
      classes: [
        {
          date: {
            start_time: '11:30',
            end_time: '12:50',
            weekdays: 'MW',
            start_date: null,
            end_date: null,
            is_tba: false,
            is_cancelled: false,
            is_closed: false,
          },
          location: {
            building: 'RCH',
            room: '308',
          },
          instructors: ['Lau,Lap Chi'],
        },
      ],
      held_with: ['CS 666'],
      term: 1205,
      academic_level: 'undergraduate',
      last_updated: '2020-03-07T02:09:18-05:00',
    },
    {
      subject: 'CS',
      catalog_number: '466',
      units: 0.5,
      title: 'Algorithm Design and Analysis',
      note: null,
      class_number: 5365,
      section: 'LEC 002',
      campus: 'UW U',
      associated_class: 2,
      related_component_1: '101',
      related_component_2: null,
      enrollment_capacity: 60,
      enrollment_total: 0,
      waiting_capacity: 0,
      waiting_total: 0,
      topic: null,
      reserves: [],
      classes: [
        {
          date: {
            start_time: '13:00',
            end_time: '14:20',
            weekdays: 'MW',
            start_date: null,
            end_date: null,
            is_tba: false,
            is_cancelled: false,
            is_closed: false,
          },
          location: {
            building: 'RCH',
            room: '308',
          },
          instructors: ['Lau,Lap Chi'],
        },
      ],
      held_with: ['CS 666'],
      term: 1205,
      academic_level: 'undergraduate',
      last_updated: '2020-03-07T02:09:18-05:00',
    },
    {
      subject: 'CS',
      catalog_number: '466',
      units: 0.5,
      title: 'Algorithm Design and Analysis',
      note: null,
      class_number: 4079,
      section: 'TST 101',
      campus: 'UW U',
      associated_class: 99,
      related_component_1: '99',
      related_component_2: null,
      enrollment_capacity: 120,
      enrollment_total: 0,
      waiting_capacity: 0,
      waiting_total: 0,
      topic: null,
      reserves: [],
      classes: [
        {
          date: {
            start_time: '19:00',
            end_time: '20:50',
            weekdays: 'W',
            start_date: '06/17',
            end_date: '06/17',
            is_tba: false,
            is_cancelled: false,
            is_closed: false,
          },
          location: {
            building: null,
            room: null,
          },
          instructors: [],
        },
      ],
      held_with: ['CS 666'],
      term: 1205,
      academic_level: 'undergraduate',
      last_updated: '2020-03-07T02:09:18-05:00',
    },
  ],
  [
    {
      subject: 'KOREA',
      catalog_number: '101R',
      units: 0.5,
      title: 'First-Year Korean 1',
      note: 'Choose TUT section for Related 1.',
      class_number: 4117,
      section: 'LEC 001',
      campus: 'REN R',
      associated_class: 1,
      related_component_1: null,
      related_component_2: null,
      enrollment_capacity: 45,
      enrollment_total: 0,
      waiting_capacity: 0,
      waiting_total: 0,
      topic: null,
      reserves: [],
      classes: [
        {
          date: {
            start_time: '13:00',
            end_time: '14:20',
            weekdays: 'W',
            start_date: null,
            end_date: null,
            is_tba: false,
            is_cancelled: false,
            is_closed: false,
          },
          location: {
            building: 'REN',
            room: '2107',
          },
          instructors: ['Kim,Young Gon'],
        },
      ],
      held_with: [],
      term: 1205,
      academic_level: 'undergraduate',
      last_updated: '2020-03-07T02:10:03-05:00',
    },
    {
      subject: 'KOREA',
      catalog_number: '101R',
      units: 0.5,
      title: 'First-Year Korean 1',
      note: 'Choose TUT section for Related 1.',
      class_number: 4132,
      section: 'LEC 002',
      campus: 'REN R',
      associated_class: 2,
      related_component_1: null,
      related_component_2: null,
      enrollment_capacity: 45,
      enrollment_total: 0,
      waiting_capacity: 0,
      waiting_total: 0,
      topic: null,
      reserves: [],
      classes: [
        {
          date: {
            start_time: '14:30',
            end_time: '15:50',
            weekdays: 'W',
            start_date: null,
            end_date: null,
            is_tba: false,
            is_cancelled: false,
            is_closed: false,
          },
          location: {
            building: 'REN',
            room: '2107',
          },
          instructors: ['Kim,Young Gon'],
        },
      ],
      held_with: [],
      term: 1205,
      academic_level: 'undergraduate',
      last_updated: '2020-03-07T02:10:03-05:00',
    },
    {
      subject: 'KOREA',
      catalog_number: '101R',
      units: 0.5,
      title: 'First-Year Korean 1',
      note: 'Choose TUT section for Related 1.',
      class_number: 4140,
      section: 'TUT 101',
      campus: 'REN R',
      associated_class: 99,
      related_component_1: '99',
      related_component_2: null,
      enrollment_capacity: 30,
      enrollment_total: 0,
      waiting_capacity: 0,
      waiting_total: 0,
      topic: null,
      reserves: [],
      classes: [
        {
          date: {
            start_time: '16:00',
            end_time: '17:20',
            weekdays: 'W',
            start_date: null,
            end_date: null,
            is_tba: false,
            is_cancelled: false,
            is_closed: false,
          },
          location: {
            building: 'REN',
            room: '2107',
          },
          instructors: ['Kang,Youngoak'],
        },
      ],
      held_with: [],
      term: 1205,
      academic_level: 'undergraduate',
      last_updated: '2020-03-07T02:10:03-05:00',
    },
    {
      subject: 'KOREA',
      catalog_number: '101R',
      units: 0.5,
      title: 'First-Year Korean 1',
      note: 'Choose TUT section for Related 1.',
      class_number: 4141,
      section: 'TUT 102',
      campus: 'REN R',
      associated_class: 99,
      related_component_1: '99',
      related_component_2: null,
      enrollment_capacity: 30,
      enrollment_total: 0,
      waiting_capacity: 0,
      waiting_total: 0,
      topic: null,
      reserves: [],
      classes: [
        {
          date: {
            start_time: '16:00',
            end_time: '17:20',
            weekdays: 'W',
            start_date: null,
            end_date: null,
            is_tba: false,
            is_cancelled: false,
            is_closed: false,
          },
          location: {
            building: 'REN',
            room: '2102',
          },
          instructors: ['Cho,Grace'],
        },
      ],
      held_with: [],
      term: 1205,
      academic_level: 'undergraduate',
      last_updated: '2020-03-07T02:10:03-05:00',
    },
    {
      subject: 'KOREA',
      catalog_number: '101R',
      units: 0.5,
      title: 'First-Year Korean 1',
      note: 'Choose TUT section for Related 1.',
      class_number: 4142,
      section: 'TUT 103',
      campus: 'REN R',
      associated_class: 99,
      related_component_1: '99',
      related_component_2: null,
      enrollment_capacity: 30,
      enrollment_total: 0,
      waiting_capacity: 0,
      waiting_total: 0,
      topic: null,
      reserves: [],
      classes: [
        {
          date: {
            start_time: '18:00',
            end_time: '19:20',
            weekdays: 'W',
            start_date: null,
            end_date: null,
            is_tba: false,
            is_cancelled: false,
            is_closed: false,
          },
          location: {
            building: 'REN',
            room: '2102',
          },
          instructors: ['Kim,Wonhee'],
        },
      ],
      held_with: [],
      term: 1205,
      academic_level: 'undergraduate',
      last_updated: '2020-03-07T02:10:03-05:00',
    },
  ],
];

type courseInfoType = typeof temp[0];
