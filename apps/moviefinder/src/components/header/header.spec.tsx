import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';
import { Header } from './header';

test(`[Header Component]: Should render`, async () => {
  const { screen, render } = await createDOM();
  await render(<Header />);
  expect(screen.innerHTML).toContain('Header works!');
});
