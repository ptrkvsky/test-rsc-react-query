import { Todo } from '../interfaces/Todo';

export async function fetchTodos() {
  const response = await fetch(`${process.env.ENDPOINT}/todos`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error('fetch fail');
  }

  const todos: Todo[] = await response.json();
  return todos;
}
