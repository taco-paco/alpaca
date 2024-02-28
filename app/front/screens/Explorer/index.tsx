import { NavLink, Route, Routes } from 'react-router-dom';
import AccountsPage from '../Accounts';
import TransactionsPage from '../Transactions';
import BlocksPage from '../Blocks';
import React from 'react';
import s from './index.module.scss';

const Explorer = () => {
    return (
        <div className={s.list}>
            <div className={s.navbar}>
                <NavLink className={s.navItem} to="/explorer/accounts">
                    Accounts
                </NavLink>
                <NavLink className={s.navItem} to="/explorer/blocks">
                    Blocks
                </NavLink>
                <NavLink className={s.navItem} to="/explorer/transactions">
                    Transactions
                </NavLink>
            </div>
            <Routes>
                <Route path="/accounts" element={<AccountsPage />} />
                <Route path="/blocks" element={<BlocksPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
            </Routes>
        </div>
    );
};

export default Explorer;
