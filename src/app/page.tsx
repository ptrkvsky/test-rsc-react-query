import styles from './page.module.css';
import getQueryClient from '@/app/utils/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import { Hydrate } from './utils/HydrateClient';
import { TodosList } from './todos/components/TodosList/TodosList';
import { fetchTodos } from './todos/api/fetchTodos';

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['todos'], fetchTodos);
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={styles.main}>
      <Hydrate state={dehydratedState}>
        <TodosList />
      </Hydrate>
    </main>
  );
}
