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
  console.log(classesEnabledFlags);
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
              {`${courseInfo.subject}${courseInfo.catalogNumber}`}
            </div>
            <div className="options-course-sections">
              {courseInfo.sections.map(section => {
                // filter out TST since we don't really care about those
                // also otherwise the number of courses will be off from the parent
                // TODO: filter out TST at the very beginning or something?
                if (!section.section.includes('TST')) {
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
                    <div
                      key={section.classNumber}
                      style={{ color: classesColors[currentClassIndex] }}
                    >
                      <CheckboxInput
                        labelText={`${section.section} ${section.instructors}`}
                        checked={classesEnabledFlags[currentClassIndex]}
                        onChange={handleChange}
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
