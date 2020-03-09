import React, { FunctionComponent, useState, useEffect } from 'react';
import { useCoursesInfo } from 'hooks/useCoursesInfo';
import { Calendar } from './Calendar/Calendar';
import './Scheduler.scss';
import { ClassInfo } from 'components/common/types';
import { Options } from './Options/Options';
import { colorPalette } from 'constants/colors';

type CourseName = string;

interface SchedulerProps {
  coursesList: CourseName[];
}

export const Scheduler: FunctionComponent<SchedulerProps> = ({
  coursesList,
}) => {
  // TODO: have input for term?
  // const coursesInfo = useCoursesInfo(1205, coursesList);
  // console.log(coursesInfo);
  const coursesInfo = MOCK_DATA as any;

  const [classesInfo, setClassesInfo] = useState<ClassInfo[] | null>(null);
  const [classesEnabledFlags, setClassesEnabledFlags] = useState<
    boolean[] | null
  >(null);
  const [classesColors, setClassesColors] = useState<string[] | null>(null);

  useEffect(() => {
    if (coursesInfo) {
      const classesInfo: ClassInfo[] = [];
      const classesEnabledFlags: boolean[] = [];
      const classesColors: string[] = [];

      // first, flatten coursesInfo into classesInfo
      for (const [courseIndex, courseInfo] of coursesInfo.entries()) {
        const { sections, ...courseInfoWithoutSections } = courseInfo;
        for (const section of sections) {
          // filter out TST since we don't really care about those
          if (!section.section.includes('TST')) {
            classesInfo.push({
              ...courseInfoWithoutSections,
              section: section,
            });
            classesEnabledFlags.push(true);
            // if (section.section.includes('LEC')) {
            //   classesColors.push(
            //     colorPalette.dark[courseIndex % colorPalette.dark.length],
            //   );
            // } else {
            //   classesColors.push(
            //     colorPalette.light[courseIndex % colorPalette.light.length],
            //   );
            // }
            classesColors.push(
              colorPalette.light[courseIndex % colorPalette.light.length],
            );
          }
        }
      }
      setClassesInfo(classesInfo);
      setClassesEnabledFlags(classesEnabledFlags);
      setClassesColors(classesColors);
    }
  }, [coursesInfo]);

  const setClassEnabled = (classIndex: number, enabled: boolean) => {
    if (classesEnabledFlags) {
      const newClassesEnabledFlags = [...classesEnabledFlags];
      newClassesEnabledFlags[classIndex] = enabled;
      setClassesEnabledFlags(newClassesEnabledFlags);
    }
  };

  return (
    <div className="scheduler">
      <div className="calendar-container">
        {classesInfo && classesEnabledFlags && classesColors && (
          <Calendar
            classesInfo={classesInfo}
            classesEnabledFlags={classesEnabledFlags}
            classesColors={classesColors}
          />
        )}
      </div>
      <div className="options-container">
        {coursesInfo && classesEnabledFlags && classesColors && (
          <Options
            coursesInfo={coursesInfo}
            classesEnabledFlags={classesEnabledFlags}
            setClassEnabled={setClassEnabled}
            classesColors={classesColors}
          />
        )}
      </div>
    </div>
  );
};

const MOCK_DATA = [
  {
    subject: 'CS',
    catalogNumber: '466',
    title: 'Algorithm Design and Analysis',
    note: null,
    sections: [
      {
        classNumber: 3659,
        section: 'LEC 001',
        date: {
          startTime: 11.5,
          endTime: 12.83,
          weekdays: ['M', 'W'],
        },
        location: {
          building: 'RCH',
          room: '308',
        },
        instructors: ['Lau,Lap Chi'],
      },
      {
        classNumber: 5365,
        section: 'LEC 002',
        date: {
          startTime: 13,
          endTime: 14.33,
          weekdays: ['M', 'W'],
        },
        location: {
          building: 'RCH',
          room: '308',
        },
        instructors: ['Lau,Lap Chi'],
      },
      {
        classNumber: 4079,
        section: 'TST 101',
        date: {
          startTime: 19,
          endTime: 20.83,
          weekdays: ['W'],
        },
        location: {
          building: null,
          room: null,
        },
        instructors: [],
      },
    ],
  },
  {
    subject: 'CO',
    catalogNumber: '342',
    title: 'Introduction to Graph Theory',
    note: null,
    sections: [
      {
        classNumber: 3641,
        section: 'LEC 001',
        date: {
          startTime: 10,
          endTime: 11.33,
          weekdays: ['T', 'Th'],
        },
        location: {
          building: 'PHY',
          room: '313',
        },
        instructors: ['Haxell,Penny'],
      },
    ],
  },
  {
    subject: 'CO',
    catalogNumber: '351',
    title: 'Network Flow Theory',
    note: null,
    sections: [
      {
        classNumber: 3642,
        section: 'LEC 001',
        date: {
          startTime: 11.5,
          endTime: 12.33,
          weekdays: ['M', 'W', 'F'],
        },
        location: {
          building: 'MC',
          room: '2038',
        },
        instructors: ['Pei,Martin'],
      },
    ],
  },
  {
    subject: 'CO',
    catalogNumber: '454',
    title: 'Scheduling',
    note: null,
    sections: [
      {
        classNumber: 3643,
        section: 'LEC 001',
        date: {
          startTime: 10,
          endTime: 11.33,
          weekdays: ['M', 'W'],
        },
        location: {
          building: 'MC',
          room: '4064',
        },
        instructors: ['Cheriyan,Joseph'],
      },
    ],
  },
  {
    subject: 'PMATH',
    catalogNumber: '336',
    title: 'Introduction to Group Theory with Applications',
    note: null,
    sections: [
      {
        classNumber: 3627,
        section: 'LEC 001',
        date: {
          startTime: 8.5,
          endTime: 9.33,
          weekdays: ['M', 'W', 'F'],
        },
        location: {
          building: 'MC',
          room: '4021',
        },
        instructors: ['Madill,Blake'],
      },
    ],
  },
  {
    subject: 'KOREA',
    catalogNumber: '101R',
    title: 'First-Year Korean 1',
    note: 'Choose TUT section for Related 1.',
    sections: [
      {
        classNumber: 4117,
        section: 'LEC 001',
        date: {
          startTime: 13,
          endTime: 14.33,
          weekdays: ['W'],
        },
        location: {
          building: 'REN',
          room: '2107',
        },
        instructors: ['Kim,Young Gon'],
      },
      {
        classNumber: 4132,
        section: 'LEC 002',
        date: {
          startTime: 14.5,
          endTime: 15.83,
          weekdays: ['W'],
        },
        location: {
          building: 'REN',
          room: '2107',
        },
        instructors: ['Kim,Young Gon'],
      },
      {
        classNumber: 4140,
        section: 'TUT 101',
        date: {
          startTime: 16,
          endTime: 17.33,
          weekdays: ['W'],
        },
        location: {
          building: 'REN',
          room: '2107',
        },
        instructors: ['Kang,Youngoak'],
      },
      {
        classNumber: 4141,
        section: 'TUT 102',
        date: {
          startTime: 16,
          endTime: 17.33,
          weekdays: ['W'],
        },
        location: {
          building: 'REN',
          room: '2102',
        },
        instructors: ['Cho,Grace'],
      },
      {
        classNumber: 4142,
        section: 'TUT 103',
        date: {
          startTime: 18,
          endTime: 19.33,
          weekdays: ['W'],
        },
        location: {
          building: 'REN',
          room: '2102',
        },
        instructors: ['Kim,Wonhee'],
      },
    ],
  },
];
