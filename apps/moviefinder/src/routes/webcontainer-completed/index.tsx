import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { WebContainer } from '@webcontainer/api';
import { Terminal } from 'xterm';
import { files } from './files';

async function writeToIndexTsx(container: WebContainer, content: string) {
    await container.fs.writeFile('/src/routes/index.tsx', content);
}
const installDependencies = async (container: WebContainer, terminal: Terminal) => {
    const installProcess = await container.spawn('npm', ['install']);

    void installProcess.output.pipeTo(
        new WritableStream<string>({
            write(data) {
                terminal.write(data);
            },
        }),
    );
    return await installProcess.exit;
};

const startShell = async (container: WebContainer, terminal: Terminal) => {
    const shellProcess = await container.spawn('jsh');

    void shellProcess.output.pipeTo(
        new WritableStream<string>({
            write(data) {
                terminal.write(data);
            },
        }),
    );

    const input = shellProcess.input.getWriter();
    terminal.onData((data) => {
        input.write(data);
    });


    return await shellProcess.exit;
};

const startDevServer = async (
    container: WebContainer,
    terminal: Terminal
) => {
    const process = await container.spawn('npm', ['run', 'dev']);

    void process.output.pipeTo(
        new WritableStream<string>({
            write(data) {
                terminal.write(data);
            },
        }),
    );

    const input = process.input.getWriter();
    terminal.onData((data) => {
        input.write(data);
    });

    return process;
};

export default component$(() => {
    useVisibleTask$(async () => {
        const terminalElement = document.querySelector('.terminal') as HTMLElement;
        const textareaElement = document.querySelector('.textarea') as HTMLTextAreaElement;
        const iframeElement = document.querySelector('.iframe') as HTMLIFrameElement;

        // @ts-expect-error type error
        textareaElement.value = files.src.directory.routes.directory['index.tsx'].file.contents;

        const terminal = new Terminal({
            convertEol: true,
        });

        terminal.open(terminalElement);

        const webContainerInstance = await WebContainer.boot();
        await webContainerInstance.mount(files);

        textareaElement.addEventListener('input', async (e: any) => {
            await writeToIndexTsx(webContainerInstance, e.target.value);
        });

        webContainerInstance.on('server-ready', (port, url) => {
            iframeElement.src = url;
        });

        // interactive shell
        void startShell(webContainerInstance, terminal);

        // npm i && npm run dev
        // await installDependencies(webContainerInstance, terminal);
        // await startDevServer(webContainerInstance, terminal);
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
