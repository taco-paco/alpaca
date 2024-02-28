import React from 'react';
import { connectStore } from '../../connectToStore';
import { MemoryHistory } from 'history';
import TransactionsStore from './store';
import { RootStore } from '../../rootStore';
import s from './index.module.scss';

type Props = {
    store: TransactionsStore;
    history: MemoryHistory;
};

const Transactions: React.FC = (props: Props) => {
    return (
        <div className={s.list}>
            {props.store.transactions.map((el, index) => (
                <div className={s.card} key={index}>
                    <div className={s.tx}>{el.transaction_hash}</div>
                </div>
            ))}
        </div>
    );
};

const selector = (rootStore: RootStore): Props => {
    return { history: rootStore.history, store: rootStore.transactionsStore };
};
export default connectStore(selector)(Transactions);
