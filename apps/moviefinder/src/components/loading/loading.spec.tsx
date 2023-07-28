import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';
import { Loading } from './loading';

test(`[Loading Component]: Should render`, async () => {
  const { screen, render } = await createDOM();
  await render(<Loading />);
  expect(screen.innerHTML).toContain('Loading works!');
});
