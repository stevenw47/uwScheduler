import React, { FunctionComponent } from 'react';
import './Calendar.scss';
import { CalendarDay } from './CalendarDay/CalendarDay';
import {
  WeekdaysAbbreviated,
  Weekdays,
  ClassInfo,
} from 'components/common/types';

export const START_TIME = 8.5; // 8:30am
export const END_TIME = 21; // 9:00pm
export const INTERVAL_LENGTH = 0.5; // 30 minute intervals

interface TimeBlock {
  startTime: number;
  endTime: number;
}

export const timeBlocks: TimeBlock[] = [];

const timeBlock = {
  startTime: START_TIME,
  endTime: START_TIME + INTERVAL_LENGTH,
};
while (timeBlock.endTime <= END_TIME) {
  timeBlocks.push({ ...timeBlock });
  timeBlock.startTime += INTERVAL_LENGTH;
  timeBlock.endTime += INTERVAL_LENGTH;
}

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

  const style = {
    height: `calc(25px * 25)`,
  };
  return (
    <div className="calendar" style={style}>
      <div className="calendar-time-container">
        {timeBlocks.map(({ startTime, endTime }) => {
          const hour = Math.floor(startTime / 1);
          const minute = startTime % 1 !== 0 ? (startTime % 1) * 60 : '00';
          const formattedStartTime =
            hour <= 12
              ? `${hour}:${minute} ${hour < 12 ? 'AM' : 'PM'}`
              : `${hour % 12}:${minute} PM`;
          return (
            <div className="calendar-time">
              <div className="calendar-time-tick" />
              <span>{formattedStartTime}</span>
            </div>
          );
        })}
      </div>
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
