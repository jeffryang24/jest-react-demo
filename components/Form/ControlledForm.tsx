import { Form, FormInputProps, FormTextAreaProps } from 'semantic-ui-react';

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
    </Form>
  );
}
