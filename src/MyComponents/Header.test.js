import { render, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('rendering tests', () => {
    it('should render header title', () => {
        const headerTitle = "Header Title"

        const { getByRole } = render(<Header title={headerTitle} />);
        const mainTitle = getByRole('link');

        expect(mainTitle).toBeInTheDocument();
        expect(mainTitle.innerHTML).toBe(headerTitle);

    })
    it('should render default header title', () => {

        const { getByRole } = render(<Header />);
        const mainTitle = getByRole('link');

        expect(mainTitle).toBeInTheDocument();
        expect(mainTitle.innerHTML).toBe('Your Title Here');

    })
})

describe('navigation tests', () => {
    it('should navigate to home page', () => {
        const { getByRole } = render(<Header />);
        const link = getByRole('link');
        fireEvent.click(link);
        expect(window.location.pathname).toBe('/');

    })
})

