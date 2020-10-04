import React, { FunctionComponent, Dispatch } from 'react';
import './Options.scss';
import { CheckboxInput } from 'components/common/CheckboxInput/CheckboxInput';
import { CourseInfo } from 'components/common/types';
import { Action } from 'components/Home/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { NO_TIME } from 'hooks/useCoursesInfo';

interface OptionsProps {
  term?: number;
  coursesInfo: CourseInfo[];
  classesEnabledFlags: boolean[];
  setClassEnabled: (classIndex: number, enabled: boolean) => void;
  classesColors: string[];
  dispatch: Dispatch<Action>;
}

export const Options: FunctionComponent<OptionsProps> = ({
  term,
  coursesInfo,
  classesEnabledFlags,
  setClassEnabled,
  classesColors,
  dispatch,
}) => {
  let classIndex = 0;
  return (
    <div className="options">
      <div className="options-title">
        <span className="options-title-text">Options</span>
      </div>
      {coursesInfo.map(courseInfo => {
        const handleClick = () => {
          dispatch({
            type: 'REMOVE_COURSES',
            data: [`${courseInfo.subject}${courseInfo.catalogNumber}`],
          });
        };
        return (
          <div
            key={`${courseInfo.subject}${courseInfo.catalogNumber}`}
            className="options-course"
          >
            <div className="options-course-title">
              <span className="options-course-title-text">
                {`${courseInfo.subject}${courseInfo.catalogNumber}`}
              </span>
              <a
                href={`http://www.adm.uwaterloo.ca/cgi-bin/cgiwrap/infocour/salook.pl?level=under&sess=${term}&subject=${courseInfo.subject}&cournum=${courseInfo.catalogNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  className="options-course-link"
                  icon={faExternalLinkAlt}
                />
              </a>
              <FontAwesomeIcon
                className="options-course-remove"
                icon={faTimes}
                onClick={handleClick}
              />
            </div>
            <div className="options-course-sections">
              {/* Only render once the flags are set */}
              {classIndex < classesEnabledFlags.length
                ? courseInfo.sections.map(section => {
                    const currentClassIndex = classIndex;
                    ++classIndex;
                    const handleChange = (
                      event: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                      setClassEnabled(
                        currentClassIndex,
                        !classesEnabledFlags[currentClassIndex],
                      );
                    };
                    const mightBeOnline =
                      section.date.startTime === NO_TIME &&
                      section.date.endTime === NO_TIME &&
                      section.date.weekdays.length === 0;
                    return (
                      <div key={section.classNumber}>
                        <CheckboxInput
                          checkboxColor={classesColors[currentClassIndex]}
                          labelText={`${section.section} - ${
                            section.instructors
                          }${mightBeOnline ? ' 🌎' : ''}`}
                          checked={classesEnabledFlags[currentClassIndex]}
                          onChange={handleChange}
                        />
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};
