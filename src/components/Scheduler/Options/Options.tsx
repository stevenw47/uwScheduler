import React, { FunctionComponent } from 'react';
import './Options.scss';
import { CheckboxInput } from 'components/common/CheckboxInput/CheckboxInput';
import { CourseInfo } from 'components/common/types';

interface OptionsProps {
  coursesInfo: CourseInfo[];
  classesEnabledFlags: boolean[];
  setClassEnabled: (classIndex: number, enabled: boolean) => void;
  classesColors: string[];
}

export const Options: FunctionComponent<OptionsProps> = ({
  coursesInfo,
  classesEnabledFlags,
  setClassEnabled,
  classesColors,
}) => {
  let classIndex = 0;
  return (
    <div className="options">
      {coursesInfo.map(courseInfo => {
        return (
          <div
            key={`${courseInfo.subject}${courseInfo.catalogNumber}`}
            className="options-course"
          >
            <div className="options-course-title">
              <span className="options-course-title-text">{`${courseInfo.subject}${courseInfo.catalogNumber}`}</span>
            </div>
            <div className="options-course-sections">
              {courseInfo.sections.map(section => {
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
                return (
                  <div key={section.classNumber}>
                    <CheckboxInput
                      checkboxColor={classesColors[currentClassIndex]}
                      labelText={`${section.section} - ${section.instructors}`}
                      checked={classesEnabledFlags[currentClassIndex]}
                      onChange={handleChange}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
