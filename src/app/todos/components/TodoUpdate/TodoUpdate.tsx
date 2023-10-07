import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../../api/updateTodo';
import { Todo } from '../../interfaces/Todo';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  todo: Todo;
}

export default function TodoUpdate({ todo }: Props) {
  const [inputValue, setInputValue] = useState(todo.name);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateTodo,

    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      // Optimistically update to the new value
      const newTodos = previousTodos?.map((oldTodo) => {
        if (oldTodo.id === newTodo.id) {
          console.log('ça marche');
          return newTodo;
        }
        return oldTodo;
      });
      console.log(newTodos);
      queryClient.setQueryData(['todos'], newTodos);

      // Return a context object with the snapshotted value
      return { previousTodos };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newTodo = { ...todo, name: inputValue };
    mutate(newTodo);
  }

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <input
        value={inputValue}
        onChange={(event) => handleChangeInput(event)}
        type="text"
      />
      <button type="submit" value={inputValue}>
        update
      </button>
    </form>
  );
}
