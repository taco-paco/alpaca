import { action, computed, makeObservable, observable } from 'mobx';
import { RPC } from 'starknet';

export default class BlocksStore {
    @observable.shallow
    private _blocks: RPC.BlockWithTxs[] = [];

    constructor() {
        makeObservable(this);
    }

    @computed
    get blocks(): RPC.BlockWithTxs[] {
        return this._blocks;
    }
    set blocks(value: RPC.BlockWithTxs[]) {
        this._blocks = value;
    }

    @action
    push = (...value: RPC.BlockWithTxs[]) => {
        this._blocks.push(...value);
    };
}
