export enum Weekdays {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
}
export enum WeekdaysAbbreviated {
  Monday = 'M',
  Tuesday = 'T',
  Wednesday = 'W',
  Thursday = 'Th',
  Friday = 'F',
}

// this is the shape of the returned data, after fetching from the API
export interface CourseInfo {
  subject: string;
  catalogNumber: string;
  title: string;
  note: string | null;
  sections: SectionInfo[];
}
export interface SectionInfo {
  classNumber: number;
  section: string;
  date: {
    startTime: number;
    endTime: number;
    weekdays: WeekdaysAbbreviated[];
  };
  location: string;
  instructors: string;
}

// for a single course (KOREA101R) , it has a list of sections associated to it (LEC001, LEC002, TUT101, TUT102, TUT103)
// if we take only a single section from it, we get a class
export interface ClassInfo extends Omit<CourseInfo, 'sections'> {
  section: SectionInfo;
}
