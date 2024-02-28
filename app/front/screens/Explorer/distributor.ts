import AccountsStore from '../Accounts/store';
import TransactionsStore from '../Transactions/store';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { runInAction } from 'mobx';
import BlocksStore from '../Blocks/store';
import { RPC } from 'starknet';

export default class Distributor {
    constructor(private accountsStore: AccountsStore, private transactionsStore: TransactionsStore, private blocksStore: BlocksStore) {
        ipcRenderer.on('data-arrived', this.onDataArrived);
    }

    onDataArrived = (event: IpcRendererEvent, ...args: any[]) => {
        const [rawBlock] = args;
        console.log('onDataArrived', rawBlock);

        const block = rawBlock as RPC.BlockWithTxs;
        const transactions: RPC.TransactionWithHash[] = block.transactions.map((el) => {
            return el as RPC.TransactionWithHash;
        });

        this.handleTransactions(transactions);
        runInAction(() => {
            this.blocksStore.push(block);
        });
    };

    handleTransactions = (transactions: RPC.TransactionWithHash[]) => {
        transactions.forEach((tx) => {
            runInAction(() => {
                this.accountsStore.increaseTxCount(tx.sender_address, 1);
            });
        });

        runInAction(() => {
            this.transactionsStore.push(...transactions);
        });
    };
}
