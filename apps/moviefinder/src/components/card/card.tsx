import {component$, Slot, useStylesScoped$} from '@builder.io/qwik';

import styles from './card.scss?inline';

export const Card = component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <div class="w-1/2 h-full" id="card">
        <div id="content">
          <h5>
            <Slot name="header"></Slot>
          </h5>
          <Slot></Slot>
        </div>
      </div>
    </>
  );
});
