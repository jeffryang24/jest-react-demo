import { Component } from 'react';

import { add } from '../../utils/MathUtil';

export default class Utility extends Component {
  addSomething() {
    return add(1, 2, 3, 4, 5);
  }

  componentDidMount() {
    console.log('This is utility class component!');
  }

  componentWillUnmount() {
    console.log('Bye-bye from utility class component!');
  }

  render() {
    return (
      <div>
        <p>
          {`The result of `}
          <code>{'1+2+3+4+5'}</code>
          {`: ${this.addSomething()}`}
        </p>
      </div>
    );
  }
}
