import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';
import { Card } from './card';

test(`[Card Component]: Should render`, async () => {
  const { screen, render } = await createDOM();
  await render(<Card />);
  expect(screen.innerHTML).toContain('Card works!');
});
