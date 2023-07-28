import { component$, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
    useVisibleTask$(async () => {
        const terminalElement = document.querySelector('.terminal') as HTMLElement;
        const textareaElement = document.querySelector('.textarea') as HTMLTextAreaElement;
        const iframeElement = document.querySelector('.iframe') as HTMLIFrameElement;

        // show index.tsx in textarea

        // create webcontainer instance

        // mount files

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
