import React, {
  FunctionComponent,
  useState,
  useCallback,
  useReducer,
} from 'react';
import { TextInput } from 'components/common/TextInput/TextInput';
import { Scheduler } from 'components/Scheduler/Scheduler';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './Home.scss';

type ActionType = 'ADD_COURSES' | 'REMOVE_COURSES' | 'SET_COURSES';
export type Action = {
  type: ActionType;
  data: string[];
};

const reducer = (state: string[], action: Action) => {
  switch (action.type) {
    case 'ADD_COURSES':
      return [...new Set(state.concat(action.data))];
    case 'REMOVE_COURSES':
      const newStateSet = new Set(state);
      for (const course of action.data) {
        newStateSet.delete(course);
      }
      return [...newStateSet];
    case 'SET_COURSES':
      return [...new Set(action.data)];
    default:
      return state;
  }
};

interface HomeProps {}

export const Home: FunctionComponent<HomeProps> = () => {
  const [coursesInputString, setCoursesInputString] = useState('');
  const [termInputString, setTermInputString] = useState('1199');

  const [coursesList, dispatch] = useReducer(reducer, []);
  const [term, setTerm] = useState<number>();

  const updateCoursesListAndTerm = useCallback(() => {
    if (coursesInputString.length) {
      // TODO: some validation here?
      const coursesToAdd = coursesInputString.replace(/\s/g, '').split(',');
      setCoursesInputString('');
      dispatch({ type: 'ADD_COURSES', data: coursesToAdd });
    }
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
            placeholder={'CS341, CS350, CO456, ENGL108D, ...'}
            onChange={handleCoursesChange}
            onKeyPress={handleCoursesKeyPress}
            rightIcon={faCalendarAlt}
            onRightIconClick={updateCoursesListAndTerm}
          />
        </div>
        <div className="input-term">
          <TextInput
            value={termInputString}
            placeholder={'1199'}
            onChange={handleTermChange}
          />
        </div>
      </div>
      <div className="search-results">
        <Scheduler coursesList={coursesList} term={term} dispatch={dispatch} />
      </div>
    </div>
  );
};
