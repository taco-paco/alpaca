import { action, computed, makeObservable, observable } from 'mobx';

export default class SetupStore {
    @observable
    private _port = 5050;
    @observable
    private _portMessage?: string;

    @observable
    private _seed = 20;
    @observable
    private _seedMessage?: string;

    @observable
    private _totalAccounts = 10;
    @observable
    private _totalAccountsMessage?: string;

    constructor() {
        makeObservable(this);
    }

    @computed
    get port(): number {
        return this._port;
    }
    set port(value: number) {
        this._port = value;
    }

    @computed
    get portMessage(): string | undefined {
        return this._portMessage;
    }
    set portMessage(value: string | undefined) {
        this._portMessage = value;
    }
    @action
    resetPortMessage = () => {
        this._portMessage = undefined;
    };

    @computed
    get seed() {
        return this._seed;
    }
    set seed(value: number) {
        this._seed = value;
    }

    @computed
    get seedMessage(): string | undefined {
        return this._seedMessage;
    }
    set seedMessage(value: string) {
        this._seedMessage = value;
    }
    @action
    resetSeedMessage = () => {
        this._seedMessage = undefined;
    };

    @computed
    get totalAccounts() {
        return this._totalAccounts;
    }
    set totalAccounts(value: number) {
        this._totalAccounts = value;
    }

    @computed
    get totalAccountsMessage(): string | undefined {
        return this._totalAccountsMessage;
    }
    set totalAccountsMessage(value: string) {
        this._totalAccountsMessage = value;
    }
    @action
    resetTotalAccountsMessage = () => {
        this._totalAccountsMessage = undefined;
    };
}
