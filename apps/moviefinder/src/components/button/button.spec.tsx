import { createDOM } from '@builder.io/qwik/testing';
import { it, expect, describe, beforeEach } from 'vitest';
import { Button } from './button';
import { $, JSXNode, RenderResult } from '@builder.io/qwik';

describe('[Button Component]', () => {
  let screen: HTMLElement;
  let render: (jsxElement: JSXNode) => Promise<RenderResult>;
  let userEvent: (
    queryElement: string | Element | null,
    eventNameCamel: string,
    eventPayload?: unknown
  ) => Promise<unknown>;

  beforeEach(async () => {
    ({ screen, render, userEvent } = await createDOM());
  });

  it('should render', async () => {
    await render(<Button>Button text</Button>);
    expect(screen.innerHTML).toContain('Button text');
  });

  it('should call the onClick funtion when clicked', async () => {
    const result = { clicked: false };
    await render(<Button onClick$={() => (result.clicked = true)}></Button>);

    await userEvent('Button', 'click');
    expect(result.clicked).toBe(true);
  });
});
