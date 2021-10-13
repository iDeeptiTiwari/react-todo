import { render, fireEvent } from '@testing-library/react';
import AddTodo from './AddTodo';

let todoFn;
beforeAll(() => {
    todoFn = jest.fn();
})

describe('rendering tests', () => {
    it('should render add to do form', () => {
        const { getByRole } = render(<AddTodo addTodo={todoFn} />);
        const form = getByRole('form');
        expect(form).not.toBeEmptyDOMElement();
    })
    it('should render title inputbox', () => {
        const { getByLabelText } = render(<AddTodo addTodo={todoFn} />);
        const inputbox = getByLabelText('Task Name');
        expect(inputbox).toBeInTheDocument();
    })
    it('should render description inputbox', () => {
        const { getByLabelText } = render(<AddTodo addTodo={todoFn} />);
        const inputbox = getByLabelText('Description');
        expect(inputbox).toBeInTheDocument();
    })
    it('should render submit button', () => {
        const { getByText } = render(<AddTodo addTodo={todoFn} />);
        const button = getByText('Add');
        expect(button).toBeInTheDocument();
    })
})

describe('functinality tests', () => {
    it('should show error alert when title is empty', async () => {
        const { findByRole, getByLabelText, getByText } = render(<AddTodo addTodo={todoFn} />);
        const descInputbox = getByLabelText('Description');

        fireEvent.change(descInputbox, {
            target: {
                value: 'hello description'
            }
        })

        const submitButton = getByText('Add');
        fireEvent(
            submitButton,
            new MouseEvent('click')
        )

        const alert = await findByRole('alert');
        expect(alert).toBeInTheDocument();
    })
    it('should show error alert when description is empty', async () => {
        const { findByRole, getByLabelText, getByText } = render(<AddTodo addTodo={todoFn} />);
        const taskInputbox = getByLabelText('Task Name');

        fireEvent.change(taskInputbox, {
            target: {
                value: 'hello title'
            }
        })

        const submitButton = getByText('Add');
        fireEvent(
            submitButton,
            new MouseEvent('click')
        )

        const alert = await findByRole('alert');
        expect(alert).toBeInTheDocument();
    })

    it('should show error alert when title and description are empty', async () => {
        const { findByRole, getByText } = render(<AddTodo addTodo={todoFn} />);

        const submitButton = getByText('Add');
        fireEvent(
            submitButton,
            new MouseEvent('click')
        )

        const alert = await findByRole('alert');
        expect(alert).toBeInTheDocument();
    })

    it('should not show error alert when description and title are filled', async () => {
        const { queryByRole, getByLabelText, getByText } = render(<AddTodo addTodo={todoFn} />);
        const taskInputbox = getByLabelText('Task Name');
        const descInputbox = getByLabelText('Description');

        fireEvent.change(descInputbox, {
            target: {
                value: 'hello description'
            }
        })

        fireEvent.change(taskInputbox, {
            target: {
                value: 'hello title'
            }
        })

        const submitButton = getByText('Add');
        fireEvent(
            submitButton,
            new MouseEvent('click')
        )

        const alert = queryByRole('alert')
        expect(alert).not.toBeInTheDocument()

        expect(todoFn).toHaveBeenCalled();
        expect(todoFn).toHaveBeenCalledWith('hello title', 'hello description');

    })
})

