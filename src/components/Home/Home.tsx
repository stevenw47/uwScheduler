import React, { FunctionComponent, useState, useCallback } from 'react';
import { TextInput } from 'components/common/TextInput/TextInput';
import './Home.scss';
import { Scheduler } from 'components/Scheduler/Scheduler';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

interface HomeProps {}

export const Home: FunctionComponent<HomeProps> = () => {
  const [coursesInputString, setCoursesInputString] = useState(
    'CS466, CO342, CO351, CO454, PMATH336, KOREA101R',
  );
  const [termInputString, setTermInputString] = useState('1205');

  const [coursesList, setCoursesList] = useState<string[]>([]);
  const [term, setTerm] = useState<number>();

  const updateCoursesListAndTerm = useCallback(() => {
    // TODO: some validation here?
    setCoursesList(coursesInputString.replace(/\s/g, '').split(','));
    setTerm(Number(termInputString));
  }, [coursesInputString, termInputString]);

  const handleCoursesChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCoursesInputString(event.target.value);
    },
    [],
  );
  const handleCoursesKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        updateCoursesListAndTerm();
      }
    },
    [updateCoursesListAndTerm],
  );

  const handleTermChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTermInputString(event.target.value);
    },
    [],
  );

  return (
    <div className="home">
      <div className="title">
        <h1 className="title-text">uwScheduler</h1>
      </div>
      <div className="search-bar">
        <div className="input-courses">
          <TextInput
            value={coursesInputString}
            autoFocus={true}
            placeholder={'CS466, CO342, CO351, CO454, PMATH336, KOREA101R'}
            onChange={handleCoursesChange}
            onKeyPress={handleCoursesKeyPress}
            rightIcon={faCalendarAlt}
            onRightIconClick={updateCoursesListAndTerm}
          />
        </div>
        <div className="input-term">
          <TextInput
            value={termInputString}
            placeholder={'1205'}
            onChange={handleTermChange}
          />
        </div>
      </div>
      <div className="search-results">
        {coursesList.length && term ? (
          <Scheduler coursesList={coursesList} term={term} />
        ) : null}
      </div>
    </div>
  );
};
