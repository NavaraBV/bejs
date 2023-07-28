import {component$, Slot, useStylesScoped$} from '@builder.io/qwik';
import styles from './header.scss?inline';

export const Header = component$(() => {
  useStylesScoped$(styles);

  return (
    <header class="p-5 bg-gradient-to-r from-primary-800 to-accent-700">
      <nav class="flex justify-center">
        <Slot name="title"></Slot>
      </nav>
    </header>
  );
});
