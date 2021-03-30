import { useCallback, useState, ChangeEvent } from 'react';
import Head from 'next/head';
import { css } from '@emotion/react';

import {
  Container,
  Grid,
  Header,
  InputOnChangeData,
  Segment,
} from 'semantic-ui-react';
import StatelessCard from '../components/Card/StatelessCard';
import ControlledForm from '../components/Form/ControlledForm';

const containerClass = css`
  padding: 16px;
`;

export default function Home() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');

  // `useCallback` ensure that the method reference still the same
  // each render.
  const handleSetFullName = useCallback(
    (e: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) =>
      setFullName(data.value),
    []
  );

  return (
    <Container css={containerClass} fluid>
      <Head>
        <title>{'Jest React Demo'}</title>
        <link rel={'icon'} href={'/favicon.ico'} />
      </Head>

      <Header as={'h1'}>{'Jest Demo Sample'}</Header>

      <Segment>
        <Grid columns={2} divided>
          <Grid.Column>
            <StatelessCard
              age={age}
              description={description}
              fullName={fullName}
            />
          </Grid.Column>

          <Grid.Column>
            <ControlledForm
              age={age}
              description={description}
              fullName={fullName}
              onAgeChange={(e, data) => setAge(data.value)}
              onDescriptionChange={(e, data) =>
                setDescription(data.value as string)
              }
              onFullNameChange={handleSetFullName}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
}
