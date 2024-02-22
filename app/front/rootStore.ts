import { createContext } from 'react';
import SetupStore from './screens/Setup/store';
import { MemoryHistory } from 'history';
import { history } from './setupHistory';
import TransactionsStore from './screens/Transactions/store';
import AccountsStore from './screens/Accounts/store';
import Distributor from './screens/Explorer/distributor';
import BlocksStore from './screens/Blocks/store';

export class RootStore {
    readonly setupStore: SetupStore;
    readonly transactionsStore = new TransactionsStore();
    readonly accountsStore = new AccountsStore();
    readonly blocksStore = new BlocksStore();
    readonly distributor = new Distributor(this.accountsStore, this.transactionsStore, this.blocksStore);

    constructor(readonly history: MemoryHistory) {
        this.setupStore = new SetupStore();
    }
}

export const rootStore = new RootStore(history);
export const Context = createContext<RootStore>(rootStore);
