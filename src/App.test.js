import { render } from '@testing-library/react';
import App from './App';

it('should renders app component', () => {
  const { getByRole } = render(<App />);
  const main = getByRole('main');
  expect(main).not.toBeEmptyDOMElement();
})
