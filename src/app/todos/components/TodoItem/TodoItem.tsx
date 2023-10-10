import Link from 'next/link';
import { Todo } from '../../interfaces/Todo';
import { TodoDelete } from '../TodoDelete/TodoDelete';
import TodoUpdate from '../TodoUpdate/TodoUpdate';

interface Props {
  todo: Todo;
}

export function TodoItem({ todo }: Props) {
  return (
    <article>
      <h3>
        <Link href={`/todos/${todo.id}`}>{todo.name}</Link>
      </h3>
      <p>{todo.status}</p>
      <TodoDelete todo={todo} />
      <TodoUpdate todo={todo} />
    </article>
  );
}
