import React, { FunctionComponent } from 'react';
import './Calendar.scss';
import { CalendarDay } from './CalendarDay/CalendarDay';
import {
  WeekdaysAbbreviated,
  Weekdays,
  ClassInfo,
} from 'components/common/types';

interface CalendarProps {
  classesInfo: ClassInfo[];
  classesEnabledFlags: boolean[];
  classesColors: string[]; // TODO: i should type this as Color or something
}

export const Calendar: FunctionComponent<CalendarProps> = ({
  classesInfo,
  classesEnabledFlags,
  classesColors,
}) => {
  const classesByWeekday: {
    [key in WeekdaysAbbreviated]: {
      classesInfo: ClassInfo[];
      colors: string[];
    };
  } = {
    [WeekdaysAbbreviated.Monday]: { classesInfo: [], colors: [] },
    [WeekdaysAbbreviated.Tuesday]: { classesInfo: [], colors: [] },
    [WeekdaysAbbreviated.Wednesday]: { classesInfo: [], colors: [] },
    [WeekdaysAbbreviated.Thursday]: { classesInfo: [], colors: [] },
    [WeekdaysAbbreviated.Friday]: { classesInfo: [], colors: [] },
  };

  // next, sort them into their bucket by weekday
  for (let i = 0; i < classesInfo.length; ++i) {
    const classInfo = classesInfo[i];
    if (classesEnabledFlags[i]) {
      for (const weekday of classInfo.section.date.weekdays) {
        classesByWeekday[weekday].classesInfo.push(classInfo);
        classesByWeekday[weekday].colors.push(classesColors[i]);
      }
    }
  }

  return (
    <div className="calendar">
      {Object.values(Weekdays).map((day, index) => {
        return (
          <CalendarDay
            key={day}
            day={day}
            even={index % 2 === 0}
            classes={classesByWeekday[WeekdaysAbbreviated[day]].classesInfo}
            colors={classesByWeekday[WeekdaysAbbreviated[day]].colors}
          />
        );
      })}
    </div>
  );
};
