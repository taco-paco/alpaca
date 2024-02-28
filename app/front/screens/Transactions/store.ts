import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { RPC } from 'starknet';

export default class TransactionsStore {
    @observable.shallow
    private _transactions: RPC.TransactionWithHash[] = [];

    constructor() {
        makeObservable(this);
    }

    @action
    push = (...value: RPC.TransactionWithHash[]) => {
        this._transactions.push(...value);
    };

    @computed
    get transactions(): RPC.TransactionWithHash[] {
        return this._transactions;
    }
}
