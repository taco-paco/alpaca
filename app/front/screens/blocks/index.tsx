import React, { useState } from 'react';
import { connectStore } from '../../connectToStore';
import { MemoryHistory } from 'history';
import { RootStore } from '../../rootStore';
import s from './index.module.scss';
import BlocksStore from './store';
import { RPC } from 'starknet';
import BlocksController from './controller';
import Moment from 'react-moment';
import Pluralize from 'pluralize';

type Props = {
    store: BlocksStore;
    history: MemoryHistory;
};

const Blocks: React.FC = (props: Props) => {
    const [controller] = useState(() => new BlocksController(props.store));
    return (
        <div className={s.list}>
            {controller.blocks.map((block, index) => (
                <div className={s.card} key={index}>
                    <div className={s.blockNumber}>
                        <div>Block</div>
                        <div>{block.block_number['$serde_json::private::Number']}</div>
                    </div>
                    <div className={s.rowItem}>
                        <div>Mined On</div>
                        <Moment unix format="YYYY-MM-DD HH:mm:ss">
                            {block.timestamp['$serde_json::private::Number']}
                        </Moment>
                    </div>
                    <div className={s.rowItem}>
                        <div>Gas Used</div>
                        <div>{block.l1_gas_price.price_in_wei}</div>
                    </div>
                    <div className={s.rowItem}>
                        {block.transactions.length > 0 ? (
                            <div className={s.transactionBadge}>
                                {block.transactions.length} {Pluralize('TRANSACTION', block.transactions.length)}
                            </div>
                        ) : (
                            <div className={s.noTransactionBadge}>NO TRANSACTIONS</div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

const selector = (rootStore: RootStore): Props => {
    return { history: rootStore.history, store: rootStore.blocksStore };
};

export default connectStore(selector)(Blocks);
