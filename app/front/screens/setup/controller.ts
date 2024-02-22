import SetupStore from './store';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { MemoryHistory } from 'history';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { DevnetConfig } from 'alpaca-addon';
import AccountsStore, { Account } from '../Accounts/store';

const PORT_ERROR_MESSAGE = 'Must be > 1000 and < 65535.';
const SEED_ERROR_MESSAGE = 'Seed must be positive integer below 2**32';
const TOTAL_ACCOUNTS_ERROR_MESSAGE = "Number of total accounts can't exceed 255";

export default class SetupController {
    private store: SetupStore;
    private readonly _hostname = '127.0.0.1';

    @observable
    private _pending = false;

    constructor(private store: SetupStore, private accountsStore: AccountsStore, private readonly history: MemoryHistory) {
        this.store = store;
        makeObservable(this);
    }

    @computed
    get hostname() {
        return this._hostname;
    }

    @action
    setPort(value: number) {
        this.store.port = value;
        this.store.resetPortMessage();
    }
    onPortEdited = () => {
        if (this.port > 1000 && this.port < 65535) {
            return;
        }

        runInAction(() => {
            this.store.portMessage = PORT_ERROR_MESSAGE;
        });
    };
    @computed
    get port(): number {
        return this.store.port;
    }

    @computed
    get portMessage(): string | undefined {
        return this.store.portMessage;
    }

    @action
    setSeed(value: number) {
        this.store.seed = value;
        this.store.resetSeedMessage();
    }
    @computed
    get seed() {
        return this.store.seed;
    }
    onSeedEdited = () => {
        if (this.seed >= 0 && this.seed < 2 ** 32) {
            return;
        }

        runInAction(() => {
            this.store.seedMessage = SEED_ERROR_MESSAGE;
        });
    };

    @computed
    get seedMessage(): string | undefined {
        return this.store.seedMessage;
    }

    @action
    setTotalAccounts(value: number) {
        this.store.totalAccounts = value;
        this.store.resetTotalAccountsMessage();
    }
    @computed
    get totalAccounts() {
        return this.store.totalAccounts;
    }
    onTotalAccountsEdited = () => {
        if (this.totalAccounts >= 0 && this.totalAccounts < 2 ** 8) {
            return;
        }

        runInAction(() => {
            this.store.totalAccountsMessage = TOTAL_ACCOUNTS_ERROR_MESSAGE;
        });
    };

    @computed
    get totalAccountsMessage(): string | undefined {
        return this.store.totalAccountsMessage;
    }

    @computed
    get hasErrors(): boolean {
        return !!(this.portMessage || this.totalAccountsMessage || this.seedMessage);
    }

    onDevnetStarted = (ipcEvent: IpcRendererEvent, ...args: any[]) => {
        console.log('onDevnetStarted', args);
        const [jsonAccounts] = args;
        const accounts: Account[] = jsonAccounts.map((el) => {
            return {
                accountAddress: el.account_address,
                publicKey: el.public_key,
                privateKey: el.private_key,
                balance: el.balance,
                txCount: 0,
            };
        });

        runInAction(() => {
            this.accountsStore.accounts = accounts;
        });

        this.history.replace('/explorer/accounts');
    };

    validate = () => {
        this.onPortEdited();
        this.onSeedEdited();
        this.onTotalAccountsEdited();
    };

    @action
    goNext = () => {
        this.validate();
        if (this._pending || this.hasErrors) {
            return;
        }

        this._pending = true;
        const config: DevnetConfig = {
            seed: this.seed,
            port: this.port,
            totalAccounts: this.totalAccounts,
        };

        ipcRenderer.send('start-devnet', config);
        ipcRenderer.once('devnet-started', this.onDevnetStarted);
    };
}
