import { ChangeEvent, ComponentPropsWithoutRef } from 'react';
import { InputOnChangeData } from 'semantic-ui-react';
import { fireEvent, render } from '@testing-library/react';

import ControlledForm from './ControlledForm';

type ControlledFormProps = ComponentPropsWithoutRef<typeof ControlledForm>;

describe('Components - Form - Controlled Form', () => {
  function createProps(
    customProps?: Partial<ControlledFormProps>
  ): ControlledFormProps {
    return {
      age: '23',
      description: 'Lorem ipsum dolor sip amet',
      fullName: 'John Doe',
      ...customProps,
    };
  }

  function renderForm(customProps?: Partial<ControlledFormProps>) {
    const props = createProps(customProps);
    return render(<ControlledForm {...props} />);
  }

  it('should render the form gracefully - snapshot', () => {
    const { baseElement } = renderForm();

    expect(baseElement).toMatchSnapshot();
  });

  it('should show the correct value based on the props', () => {
    const defaultProps = createProps();
    const { getByDisplayValue } = renderForm();

    expect(getByDisplayValue(defaultProps.age)).toBeTruthy();
    expect(getByDisplayValue(defaultProps.description)).toBeTruthy();
    expect(getByDisplayValue(defaultProps.fullName)).toBeTruthy();
  });

  it('should show the correct changed value on onFullNameChange', () => {
    const onFullNameChange = jest.fn(
      (_e: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => data.value
    );

    const { getByLabelText } = renderForm({
      fullName: '',
      onFullNameChange,
    });

    fireEvent.change(getByLabelText('Full Name'), {
      target: {
        value: 'CJ',
      },
    });
    expect(onFullNameChange).toHaveBeenCalled();
  });
});
