import { IpcUtils } from '../ipcUtils';
import { Devnet, DevnetConfig } from 'alpaca-addon';

function log(...args) {
    console.log('[engine]: ', ...args);
}

function engineCallback(val: string): void {
    log('engine-init, engineCallback', val);
    IpcUtils.sendEvent(process, 'data-arrived', val);
}

// Emit that process started
IpcUtils.sendEvent(process, 'engine-process-created', null);

// Start devnet
IpcUtils.onEvent(process, 'start-devnet', async (data: any) => {
    const [config] = data;
    const res = await Devnet.start(config, engineCallback);

    log('devnet created', res, data);
    IpcUtils.sendEvent(process, 'devnet-started', res);
});
