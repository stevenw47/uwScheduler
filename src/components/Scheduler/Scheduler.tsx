import React, { FunctionComponent, useState, useEffect, Dispatch } from 'react';
import { useCoursesInfo } from 'hooks/useCoursesInfo';
import { Calendar } from './Calendar/Calendar';
import { ClassInfo } from 'components/common/types';
import { Options } from './Options/Options';
import { colorPalette } from 'constants/colors';
import './Scheduler.scss';
import { Action } from 'components/Home/Home';

type CourseName = string;

interface SchedulerProps {
  coursesList: CourseName[];
  term?: number;
  dispatch: Dispatch<Action>;
}

export const Scheduler: FunctionComponent<SchedulerProps> = ({
  coursesList,
  term,
  dispatch,
}) => {
  const coursesInfo = useCoursesInfo(term, coursesList);
  // const coursesInfo = MOCK_DATA as any;

  const [classesInfo, setClassesInfo] = useState<ClassInfo[]>([]);
  const [classesEnabledFlags, setClassesEnabledFlags] = useState<boolean[]>([]);
  const [classesColors, setClassesColors] = useState<string[]>([]);

  useEffect(() => {
    if (coursesInfo) {
      const classesInfo: ClassInfo[] = [];
      const classesEnabledFlags: boolean[] = [];
      const classesColors: string[] = [];

      // first, flatten coursesInfo into classesInfo
      for (const [courseIndex, courseInfo] of coursesInfo.entries()) {
        const { sections, ...courseInfoWithoutSections } = courseInfo;
        for (const section of sections) {
          classesInfo.push({
            ...courseInfoWithoutSections,
            section: section,
          });
          classesEnabledFlags.push(true);
          classesColors.push(
            colorPalette.light[courseIndex % colorPalette.light.length],
          );
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
      <div className="calendar-wrapper">
        <Calendar
          classesInfo={classesInfo}
          classesEnabledFlags={classesEnabledFlags}
          classesColors={classesColors}
        />
      </div>
      <div className="options-wrapper">
        <Options
          coursesInfo={coursesInfo}
          classesEnabledFlags={classesEnabledFlags}
          setClassEnabled={setClassEnabled}
          classesColors={classesColors}
          dispatch={dispatch}
        />
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
        instructors: 'Lap Chi Lau',
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
        instructors: 'Lap Chi Lau',
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
          building: 'MC',
          room: '2017',
        },
        instructors: 'Penny Haxell',
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
        instructors: 'Martin Pei',
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
        instructors: 'Joseph Cheriyan',
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
        instructors: 'Blake Madill',
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
        instructors: 'Young Gon Kim',
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
        instructors: 'Young Gon Kim',
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
        instructors: 'Youngoak Kang',
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
        instructors: 'Grace Cho',
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
        instructors: 'Wonhee Kim',
      },
    ],
  },
];
