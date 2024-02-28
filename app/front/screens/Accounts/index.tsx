import React from 'react';
import AccountsStore from './store';
import { RootStore } from '../../rootStore';
import { connectStore } from '../../connectToStore';
import s from './index.module.scss';

type Props = {
    store: AccountsStore;
};

const AccountsPage = (props: Props) => {
    return (
        <div className={s.list}>
            {props.store.accounts.map((account, index) => (
                <div className={s.card} key={index}>
                    <div className={s.accountData}>
                        <div className={s.address}>
                            <div className={s.label}>ADDRESS</div>
                            <div className={s.value}>{account.accountAddress}</div>
                        </div>

                        <div className={s.address}>
                            <div className={s.label}>BALANCE</div>
                            <div className={s.value}>{account.balance}</div>
                        </div>
                    </div>
                    <div className={s.other}>{account.txCount}</div>
                </div>
            ))}
        </div>
    );
};

const selector = (rootStore: RootStore): Props => {
    return { store: rootStore.accountsStore };
};
export default connectStore(selector)(AccountsPage);
