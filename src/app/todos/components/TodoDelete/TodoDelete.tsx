import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '../../api/deleteTodo';
import { Todo } from '../../interfaces/Todo';

interface Props {
  todo: Todo;
}

export function TodoDelete({ todo }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: deleteTodo,

    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      // Optimistically update to the new value
      const newTodos = previousTodos?.filter((todo) => todo.id !== newTodo.id);
      queryClient.setQueryData(['todos'], newTodos);

      // Return a context object with the snapshotted value
      return { previousTodos };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleDelete = (todo: Todo) => {
    mutate(todo);
  };

  return !isLoading ? (
    <button onClick={() => handleDelete(todo)} type="button">
      Delete
    </button>
  ) : (
    <p>deletting...</p>
  );
}
