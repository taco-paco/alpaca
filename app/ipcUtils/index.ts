import { ChildProcess } from 'child_process';

export class IpcUtils {
    static sendEvent(process: NodeJS.Process | ChildProcess, event: string, ...args: any[]) {
        process.send?.([event, args]);
    }

    static onEvent(process: NodeJS.Process | ChildProcess, event: string, callback: (args: any) => Promise<void>): void {
        process.on('message', (data: any) => {
            // TODO: input data checks
            let [inputEvent, args] = data;
            if (inputEvent === event) {
                callback(args).catch((error) => {
                    console.log('onEvent: error,', error);
                });
            }
        });
    }
}
