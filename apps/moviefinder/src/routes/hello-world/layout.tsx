import { component$, Slot } from '@builder.io/qwik';
import {Header} from '../../components/header/header';

export default component$(() => {
  return (
    <>
      <main class="bg-background-950 h-full">
        <Header>
          <a
            q:slot="title"
            class="text-4xl font-bold font-mono text-center text-white"
          >
            Hello world
          </a>
        </Header>
        <section class="p-4 h-full">
          <Slot />
        </section>
      </main>
    </>
  );
});
