import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../../interfaces/Todo';
import { TodoDelete } from '../TodoDelete/TodoDelete';
import TodoUpdate from '../TodoUpdate/TodoUpdate';

interface Props {
  todo: Todo;
}

export function TodoItem({ todo }: Props) {
  return (
    <article>
      <h3>{todo.name}</h3>
      <p>{todo.status}</p>
      <TodoDelete todo={todo} />
      <TodoUpdate todo={todo} />
    </article>
  );
}
