import childProcess, { ChildProcess } from 'child_process';
import { ipcMain, IpcMainEvent } from 'electron';
import { IpcUtils } from '../ipcUtils';
import WebContents = Electron.WebContents;

let engineProcess: ChildProcess | undefined;
let uiSender: WebContents | undefined;

function log(...args) {
    console.log('[main]: ', ...args);
}

function createEngineProcess(sender: WebContents) {
    engineProcess = childProcess.fork('./dist/engine.js', {
        silent: false,
    });
    uiSender = sender;

    IpcUtils.onEvent(engineProcess, 'engine-process-created', async (data: any) => {
        log('engine-created', data);
        if (!engineProcess) {
            throw new Error('engineProcess undefined');
        }

        uiSender?.send('engine-process-created');
    });
}

// Handler on when the engine creation is requested
ipcMain.on('create-engine-process', async (event) => {
    if (engineProcess || uiSender) {
        log('second start');
        return;
    }

    log('create-engine-process');
    createEngineProcess(event.sender);
});

// TODO: make devnet creation async
async function startDevnet(event: IpcMainEvent, ...args: any[]) {
    const [config] = args;
    log('startDevnet', config);

    // TODO: those shall error
    if (!engineProcess || !uiSender) {
        log('engineProcess or uiSender are undefined');
        return;
    }

    if (uiSender.id !== event.sender.id) {
        log('Ui sender mismatch');
        return;
    }

    // Start devnet
    IpcUtils.sendEvent(engineProcess, 'start-devnet', config);

    IpcUtils.onEvent(engineProcess, 'devnet-started', async (data: any) => {
        log('devnet-started', data);
        uiSender?.send('devnet-started', ...data);
    });

    IpcUtils.onEvent(engineProcess, 'data-arrived', async (data: any) => {
        log('data-arrived', data);
        uiSender?.send('data-arrived', ...data);
    });
}

// TODO: once?
ipcMain.on('start-devnet', startDevnet);
