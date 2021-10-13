import { render } from '@testing-library/react';
import Footer from './Footer';

describe('rendering footer', () => {
    it('should render footer', () => {
        const { getByRole } = render(<Footer />);
        const footer = getByRole('contentinfo');
        expect(footer).not.toBeEmptyDOMElement();
    })

})


