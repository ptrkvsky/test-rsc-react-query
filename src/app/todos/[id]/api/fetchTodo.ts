import { Todo } from '../../interfaces/Todo';

export async function fetchTodo(id: string | number) {
  try {
    const response = await fetch(`${process.env.ENDPOINT}/todos/${id}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      next: { revalidate: 0 },
    });

    if (response.ok) {
      const todo: Todo = await response.json();
      return todo;
      // Faites quelque chose avec la liste des tâches
    } else {
      console.log('-->', response.ok);
      throw new Error('👨‍🚒 fetch fail');
    }
  } catch (error) {
    console.error(error);
  }
}
