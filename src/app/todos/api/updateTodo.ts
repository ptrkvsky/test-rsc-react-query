import { Todo } from '../interfaces/Todo';

export async function updateTodo(todo: Todo) {
  try {
    const response = await fetch(`${process.env.ENDPOINT}/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(todo),
    });

    if (response.ok) {
      const updatedTodo: Todo = await response.json();
      return updatedTodo;
    } else {
      throw new Error('Update failed');
    }
  } catch (error) {
    console.error('👨‍🚒 Update failed');
  }
}
