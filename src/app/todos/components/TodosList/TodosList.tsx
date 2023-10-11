'use client';

import { useQuery } from '@tanstack/react-query';
import { TodoItem } from '../TodoItem/TodoItem';
import { fetchTodos } from '../../api/fetchTodos';

export function TodosList() {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(),
  });

  if (isLoading) return <p>Loading 🐚</p>;
  if (isError) return <p>Error 🧑‍🦰</p>;

  return (
    <section>
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
}
