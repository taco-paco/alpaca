import { computed, makeObservable } from 'mobx';
import BlocksStore from './store';
import { RPC } from 'starknet';

export default class BlocksController {
    constructor(private store: BlocksStore) {
        makeObservable(this);
    }

    @computed
    get blocks(): RPC.BlockWithTxs[] {
        return this.store.blocks;
    }
}
