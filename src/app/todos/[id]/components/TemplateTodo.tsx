'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { fetchTodo } from '../api/fetchTodo';

export function TemplateTodo({ id }: { id: string }) {
  const { data: todo } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchTodo(id),
  });

  return (
    <div>
      <Link href="/">Home</Link>
      <h1>id : {todo?.id}</h1>
      <h2>name : {todo?.name}</h2>
    </div>
  );
}
