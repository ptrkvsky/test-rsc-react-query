import { Todo } from '../interfaces/Todo';

export async function fetchTodos() {
  try {
    const response = await fetch(`${process.env.ENDPOINT}/todos`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      next: { revalidate: 0 },
    });

    if (response.ok) {
      const todos: Todo[] = await response.json();
      return todos;
      // Faites quelque chose avec la liste des tâches
    } else {
      throw new Error('fetch fail');
    }
  } catch (error) {
    console.error(error);
  }
}
