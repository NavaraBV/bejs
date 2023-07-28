import {
  component$,
  PropFunction,
  Slot,
  useStylesScoped$,
} from '@builder.io/qwik';

import styles from './button.scss?inline';
import {Loading} from "../loading/loading";

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  accent?: boolean;
  small?: boolean;
  large?: boolean;
  onClick$?: PropFunction<() => unknown>;
  type?: 'submit' | 'reset' | 'button';
  loading?: boolean,
  disabled?: boolean
}
export const Button = component$<ButtonProps>(
  ({ primary, secondary, accent, small, large, onClick$, type, loading = false, disabled = false }) => {
    useStylesScoped$(styles);
    return (
      <>
        <button
          data-test="button"
          type={type}
          onClick$={onClick$}
          class={['btn', { primary, secondary, accent, small, large, disabled }]}
          disabled={disabled}
        >
          {!loading ? <Slot></Slot> : <Loading data-test="button-loader" primary secondary accent></Loading>}
        </button>
      </>
    );
  }
);
