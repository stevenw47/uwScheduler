import React, { FunctionComponent } from 'react';
import './CalendarDay.scss';
import { isBetween } from 'utils/numbers';
import { Weekdays, ClassInfo } from 'components/common/types';
import { timeBlocks, START_TIME } from '../Calendar';

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
  return classes.indexOf(_class);
};

const processOverlaps = (classes: ClassInfo[]) => {
  const numOverlap = new Array(classes.length).fill(0);
  for (const _class of classes) {
    // check which intervals overlaps with the start time of this interval
    const overlaps = [];
    const startTime = _class.section.date.startTime;
    for (const [index, c] of classes.entries()) {
      if (
        isBetween(startTime, c.section.date.startTime, c.section.date.endTime)
      ) {
        overlaps.push(index);
      }
    }
    for (const overlap of overlaps) {
      numOverlap[overlap] = Math.max(numOverlap[overlap], overlaps.length);
    }
  }
  return numOverlap;
};

export const CalendarDay: FunctionComponent<CalendarDayProps> = ({
  day,
  even,
  classes,
  colors,
}) => {
  // given the index of the class in classes, finds the maximum number of classes
  // it overlaps with at any point in time
  const numOverlap = processOverlaps(classes);
  return (
    <div className="calendar-day">
      <div className="calendar-day-underlay-container">
        {timeBlocks.map(({ startTime, endTime }) => {
          const colorClass =
            startTime % 1 === 0 ? (even ? 'light-grey' : 'white') : 'dark-grey';

          return (
            <div
              key={`${startTime}-${endTime}`}
              className={`calendar-day-underlay ${colorClass}`}
            />
          );
        })}
      </div>
      <div className="calendar-day-class-container">
        {classes.map((_class: ClassInfo, index: number) => {
          const section = _class.section;
          const top = `${(section.date.startTime - START_TIME) * 2 * 25}px`;
          const left = `${overlapOrder(classes, _class) *
            (100 / numOverlap[index])}%`;
          const width = `${100 / numOverlap[index]}%`;
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
              <span className="class-info">
                {`${_class.subject}${_class.catalogNumber}`}
                <br />
                {`${section.section}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
