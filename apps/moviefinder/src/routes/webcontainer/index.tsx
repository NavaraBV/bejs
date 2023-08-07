import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { files } from '../webcontainer-completed/files';
import { Terminal } from 'xterm';

export default component$(() => {
    useVisibleTask$(async () => {
        const terminalElement = document.querySelector('.terminal') as HTMLElement;
        const textareaElement = document.querySelector('.textarea') as HTMLTextAreaElement;
        const iframeElement = document.querySelector('.iframe') as HTMLIFrameElement;

        // show index.tsx in textarea
        // @ts-expect-error type error
        textareaElement.value = files.src.directory.routes.directory['index.tsx'].file.contents;

        // create terminal
        const terminal = new Terminal({
            convertEol: true,
        });

        terminal.open(terminalElement);

        // create webcontainer instance

        // mount files

        textareaElement.addEventListener('input', async (inputEvent: any) => {
            const content = inputEvent.target.value;
            // write file changes to container instance
        });

        // install dependencies, show output in terminal

        // start dev server, show output in terminal

        // on server ready set url to iframe
    });

    return (
        <>
            <div class={'flex justify-center h-full'}>
                <div class={'flex flex-col gap-4 w-full'}>
                    <div id={'app'} class={'flex h-1/2 gap-4'}>
                        <div class="editor w-1/2">
                            <textarea
                                class="textarea text-black p-4 w-full h-full"
                                placeholder={'File placeholder'}
                            />
                        </div>
                        <div class={'preview w-1/2 bg-white'}>
                            <iframe class={'iframe border-white border-2 w-full h-full'} />
                        </div>
                    </div>
                    <div class={'terminal'}></div>
                </div>
            </div>
        </>
    );
});
