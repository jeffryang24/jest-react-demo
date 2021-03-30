import { ComponentPropsWithoutRef } from 'react';
import { render } from '@testing-library/react';

import StatelessCard from './StatelessCard';

type StatelessCardProps = ComponentPropsWithoutRef<typeof StatelessCard>;

describe('Components - StatelessCard', () => {
  function createProps(
    customProps?: Partial<StatelessCardProps>
  ): StatelessCardProps {
    return {
      age: '20',
      description: 'Lorem ipsum dolor sit amet',
      fullName: 'John Doe',
      ...customProps,
    };
  }

  function renderCard(props?: Partial<StatelessCardProps>) {
    const componentProps = createProps(props);
    return render(<StatelessCard {...componentProps} />);
  }

  // HINT: Use snapshot testing when you want to assert a complex result
  // which always have a same structure for every execution.
  it('should render the same result for the same props - snapshot', () => {
    const { baseElement } = renderCard();

    expect(baseElement).toMatchSnapshot();
  });

  it('should render fallback value when the props value are empty', () => {
    const { queryByTestId } = renderCard({
      age: '',
      description: '',
      fullName: '',
    });

    expect(queryByTestId('fullName')?.textContent).toBe('No Name');
    expect(queryByTestId('age')?.textContent).toBe('No Age');
    expect(queryByTestId('description')?.textContent).toBe('-');
  });

  it.todo('should skip this test since this test is still todo');
  it.skip('should skip this test since this test brokes the CI', () => {
    // Some flaky test here.
  });
});
