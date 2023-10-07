import { Todo } from '../interfaces/Todo';

export async function deleteTodo(todo: Todo) {
  try {
    const response = await fetch(`${process.env.ENDPOINT}/todos/${todo.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await response.json();
      return true;
    } else {
      throw new Error('Suppression impossible');
    }
  } catch (error) {
    console.error('👨‍🚒 Suppression impossible id: ', todo.id);
    return false;
  }
}
