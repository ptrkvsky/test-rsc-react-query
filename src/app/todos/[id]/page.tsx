import getQueryClient from '@/app/utils/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import { Hydrate } from '../../utils/HydrateClient';
import { TemplateTodo } from './components/TemplateTodo';
import { fetchTodo } from './api/fetchTodo';

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient();
  const { id } = params;
  await queryClient.prefetchQuery(['todo', id], async () => fetchTodo(id));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <TemplateTodo id={id} />
    </Hydrate>
  );
}
