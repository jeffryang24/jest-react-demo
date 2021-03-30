import { Card, Image } from 'semantic-ui-react';

interface Props {
  age: string;
  description: string;
  fullName: string;
}

export default function StatelessCard(props: Props) {
  return (
    <Card>
      <Image src="/matthew.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.fullName || 'No Name'}</Card.Header>
        <Card.Meta>
          <span>{`Age: ${props.age || 'No Age'}`}</span>
        </Card.Meta>
        <Card.Description>{props.description || '-'}</Card.Description>
      </Card.Content>
    </Card>
  );
}
