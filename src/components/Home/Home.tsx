import React, { FunctionComponent, useState, useCallback } from 'react';
import { TextInput } from 'components/common/TextInput/TextInput';
import './Home.scss';
import { Scheduler } from 'components/Scheduler/Scheduler';

interface HomeProps {}

export const Home: FunctionComponent<HomeProps> = () => {
  const [coursesInputString, setCoursesInputString] = useState(
    'CS466, CO342, CO351, CO454, PMATH336, KOREA101R',
  );
  const [coursesList, setCoursesList] = useState<string[]>([]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCoursesInputString(event.target.value);
    },
    [],
  );
  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setCoursesList(coursesInputString.replace(/\s/g, '').split(','));
      }
    },
    [coursesInputString],
  );

  // TODO: add an icon on left of search bar, and maybe an submit button on right?
  return (
    <div className="home">
      <div className="title">
        <h1 className="title-text">uwScheduler</h1>
      </div>
      <div className="search-bar">
        <TextInput
          value={coursesInputString}
          autoFocus={true}
          placeholder={'CS466, CO342, CO351, CO454, PMATH336, KOREA101R'}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="search-results">
        {coursesList.length ? <Scheduler coursesList={coursesList} /> : null}
      </div>
    </div>
  );
};
