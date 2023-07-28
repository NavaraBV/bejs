import { RequestHandler } from '@builder.io/qwik-city';
import { component$, Slot } from '@builder.io/qwik';
import { Header } from '../../components/header/header';

export const onRequest: RequestHandler = async ({ next, headers }) => {
    headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    headers.set('Cross-Origin-Resource-Policy', 'same-site');

    await next();
};

export default component$(() => {
    return (
        <>
            <main class="bg-background-950 h-full">
                <Header>
                    <a q:slot="title" class="text-4xl font-bold font-mono text-center text-white">
                        Qwik-ception
                    </a>
                </Header>
                <section class="p-4 h-full">
                    <Slot />
                </section>
            </main>
        </>
    );
});
