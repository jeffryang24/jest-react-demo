import { useEffect, useState } from 'react';
import { Form, FormInputProps, FormTextAreaProps } from 'semantic-ui-react';

import { getPeople } from '../../services/PeopleService';

import useTimer from '../../hooks/useTimer';

interface Props {
  age: string;
  description: string;
  fullName: string;
  onAgeChange?: FormInputProps['onChange'];
  onDescriptionChange?: FormTextAreaProps['onChange'];
  onFullNameChange?: FormInputProps['onChange'];
}

export default function ControlledForm(props: Props) {
  const {
    age,
    description,
    fullName,
    onAgeChange,
    onDescriptionChange,
    onFullNameChange,
  } = props;

  const [people, setPeople] = useState([]);
  const [timer, timerUtil] = useTimer({ startFrom: 5 });

  useEffect(() => {
    console.log('Hello from controlled form!');

    async function fetchPeople() {
      const result = await getPeople();
      setPeople(result);
    }

    fetchPeople();

    return () => {
      console.log('Bye-bye from controlled form!');
    };
  }, []);

  return (
    <Form>
      <Form.Input
        id={'fullName'}
        label={'Full Name'}
        placeholder={'Insert Full Name'}
        value={fullName}
        onChange={onFullNameChange}
      />

      <Form.Input
        id={'age'}
        label={'Age'}
        placeholder={'Insert Age'}
        type={'number'}
        min={1}
        value={age}
        onChange={onAgeChange}
      />

      <Form.TextArea
        id={'description'}
        label={'Description'}
        placeholder={'Insert Description'}
        style={{ minHeight: 150 }}
        value={description}
        onChange={onDescriptionChange}
      />

      <p>
        {'Timer ends in: '}
        <span>{timer.currentDuration}</span>
        <span style={{ marginLeft: 8 }}>
          {timer.currentDuration === 0 ? 'Ringing' : null}
        </span>
      </p>

      <Form.Group>
        <Form.Button
          type={'button'}
          color={'green'}
          onClick={timerUtil.startTimer}
        >
          {'Start Timer'}
        </Form.Button>

        <Form.Button
          type={'button'}
          color={'yellow'}
          onClick={timerUtil.pauseTimer}
        >
          {'Pause Timer'}
        </Form.Button>

        <Form.Button
          type={'button'}
          color={'red'}
          onClick={timerUtil.stopTimer}
        >
          {'Stop Timer'}
        </Form.Button>
      </Form.Group>

      <code data-testId={'peopleLength'}>{people.length}</code>
    </Form>
  );
}
