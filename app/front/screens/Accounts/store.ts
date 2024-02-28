import { action, computed, makeObservable, observable } from 'mobx';

export type Account = {
    accountAddress: string;
    publicKey: string;
    privateKey: string;
    balance: string;
    txCount: number;
};

export default class AccountsStore {
    // TODO: introduce starknet.js accounts here
    @observable
    private _accounts: Account[] = [];

    constructor() {
        makeObservable(this);
    }

    @computed
    get accounts(): Account[] {
        return this._accounts;
    }
    set accounts(value: Account[]) {
        this._accounts = value;
    }

    @action
    increaseTxCount = (address: string, txCount: number) => {
        const account = this._accounts.find((el) => {
            return el.accountAddress == address;
        });

        if (!account) {
            return;
        }

        account.txCount += txCount;
    };
}
