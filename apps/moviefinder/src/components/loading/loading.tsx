import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './loading.scss?inline';

interface LoadingProperties {
  primary?: boolean,
  secondary?: boolean,
  accent?: boolean
}
export const Loading = component$<LoadingProperties>((props) => {
  useStylesScoped$(styles);

  return (
    <>
      <div id="dots" class={[props]}>
        <div id="dot" />
        <div id="dot" />
        <div id="dot" />
      </div>
    </>
  );
});
