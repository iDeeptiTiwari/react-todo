import { render } from '@testing-library/react';
import ToDoItem from './TodoItem';


describe('rendering tests', () => {
    it('should render todo item', () => {
        const onDeleteMock = jest.fn()
        const todoItem = { todo: { task: 'hello title', desc: 'hello description', sno: 2 }, onDelete: onDeleteMock }

        const { getByRole, getByText } = render(<ToDoItem {...todoItem} />);
        const h3 = getByRole('heading');
        const paragraph = getByText(todoItem.todo.desc);
        const addButton = getByRole('button');

        expect(h3).toBeInTheDocument();
        expect(h3.innerHTML).toBe(todoItem.todo.task);
        expect(paragraph).toBeInTheDocument();
        expect(paragraph.innerHTML).toBe(todoItem.todo.desc);
        expect(addButton).toBeInTheDocument();
        expect(addButton.innerHTML).toBe('Done');

    })

    //todo: test on delete has been called on delete click
})

