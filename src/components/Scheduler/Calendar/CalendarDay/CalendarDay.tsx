import React, { FunctionComponent } from 'react';
import './CalendarDay.scss';
import { isBetween } from 'utils/numbers';
import { Weekdays, ClassInfo } from 'components/common/types';

const START_TIME = 8.5; // 8:30am
const END_TIME = 21; // 9:00pm
const INTERVAL_LENGTH = 0.5; // 30 minute intervals

interface TimeBlock {
  startTime: number;
  endTime: number;
}

const timeBlocks: TimeBlock[] = [];

const timeBlock = {
  startTime: START_TIME,
  endTime: START_TIME + INTERVAL_LENGTH,
};
while (timeBlock.endTime <= END_TIME) {
  timeBlocks.push({ ...timeBlock });
  timeBlock.startTime += INTERVAL_LENGTH;
  timeBlock.endTime += INTERVAL_LENGTH;
}

interface CalendarDayProps {
  day: Weekdays;
  even: boolean;
  classes: ClassInfo[];
  colors: string[];
}

const overlapOrder = (classes: ClassInfo[], _class: ClassInfo) => {
  const { startTime, endTime } = _class.section.date;

  classes = classes.filter(
    c =>
      isBetween(startTime, c.section.date.startTime, c.section.date.endTime) ||
      isBetween(endTime, c.section.date.startTime, c.section.date.endTime),
  );
  return classes.indexOf(_class) + 1;
};

const numOverlap = (classes: ClassInfo[], _class: ClassInfo) => {
  const { startTime, endTime } = _class.section.date;
  let count = 0;
  for (const c of classes) {
    // c.date.startTime < startTime < c.date.endTime
    if (
      isBetween(startTime, c.section.date.startTime, c.section.date.endTime) ||
      isBetween(endTime, c.section.date.startTime, c.section.date.endTime)
    ) {
      ++count;
    }
  }
  return count;
};

export const CalendarDay: FunctionComponent<CalendarDayProps> = ({
  day,
  even,
  classes,
  colors,
}) => {
  return (
    <div className="calendar-day">
      <div className="calendar-day-underlay-container">
        {timeBlocks.map(({ startTime, endTime }) => {
          const style = {
            background:
              startTime % 1 === 0
                ? even
                  ? 'rgba(0,0,0,0.2)'
                  : 'rgba(0,0,0,0.0)'
                : 'rgba(0,0,0,0.3)',
          };
          return (
            <div
              key={`${startTime}-${endTime}`}
              className="calendar-day-underlay"
              style={style}
            />
          );
        })}
      </div>
      <div className="calendar-day-classes-container">
        {classes.map((_class: ClassInfo, index: number) => {
          const section = _class.section;
          const top = `${(section.date.startTime - START_TIME) * 2 * 25}px`;
          const left = `${100 -
            overlapOrder(classes, _class) *
              (100 / numOverlap(classes, _class))}%`;
          const width = `${100 / numOverlap(classes, _class)}%`;
          const height = `${(section.date.endTime - section.date.startTime) *
            2 *
            25}px`;
          const style = {
            top,
            left,
            width,
            height,
            background: colors[index],
          };
          return (
            <div
              className="calendar-day-class"
              key={section.classNumber}
              style={style}
            >
              {`${_class.subject}${_class.catalogNumber}`}
              <br />
              {`${section.section}`}
            </div>
          );
        })}
      </div>
    </div>
  );
};
