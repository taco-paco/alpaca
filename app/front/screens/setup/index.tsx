import React, { useState } from 'react';
import { RootStore } from '../../rootStore';
import { connectStore } from '../../connectToStore';
import SetupController from './controller';
import SetupStore from './store';
import { MemoryHistory } from 'history';
import AccountsStore from '../Accounts/store';
import TextField from '../../components/TextField';
import s from './index.module.scss';

type Props = {
    store: SetupStore;
    accountsStore: AccountsStore;
    history: MemoryHistory;
};

const SetupPage: React.FC = (props: Props) => {
    const [controller] = useState(() => new SetupController(props.store, props.accountsStore, props.history));

    const portMessage = controller.portMessage;
    const seedMessage = controller.seedMessage;
    const totalAccountsMessage = controller.totalAccountsMessage;

    return (
        <React.Fragment>
            <div className={s.SetupPageContainer}>
                <h2>Setup your ride</h2>

                <div className={s.setupPage}>
                    <section>
                        <h4>Hostname</h4>
                        <div className={s.Row}>
                            <div className={s.RowItem}>
                                <TextField value={controller.hostname} />
                            </div>
                            <div className={s.RowItemInfo}>The server will accept RPC connections on the following host and port.</div>
                        </div>
                    </section>

                    <section>
                        <h4>Port</h4>
                        <div className={s.Row}>
                            <div className={s.RowItem}>
                                <TextField
                                    isNumber={true}
                                    value={String(controller.port)}
                                    onChange={(e) => {
                                        controller.setPort(Number(e.target.value));
                                    }}
                                    onBlur={controller.onPortEdited}
                                    errorMessage={portMessage}
                                    placeholder="Port"
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h4>Seed</h4>
                        <div className={s.Row}>
                            <div className={s.RowItem}>
                                <TextField
                                    isNumber={true}
                                    type="text"
                                    value={String(controller.seed)}
                                    onBlur={controller.onSeedEdited}
                                    onChange={(e) => {
                                        controller.setSeed(Number(e.target.value));
                                    }}
                                    errorMessage={seedMessage}
                                />
                            </div>
                            <div className={s.RowItemInfo}>Seed for randomness of pre-deployed accounts</div>
                        </div>
                    </section>

                    <section>
                        <h4>TotalAccounts</h4>
                        <div className={s.Row}>
                            <div className={s.RowItem}>
                                <TextField
                                    isNumber={true}
                                    type="text"
                                    value={String(controller.totalAccounts)}
                                    onBlur={controller.onTotalAccountsEdited}
                                    onChange={(e) => {
                                        controller.setTotalAccounts(Number(e.target.value));
                                    }}
                                    errorMessage={totalAccountsMessage}
                                />
                            </div>
                            <div className={s.RowItemInfo}>Number of accounts to be pre-deployed</div>
                        </div>
                    </section>

                    <button onClick={controller.goNext} disabled={controller.hasErrors}>
                        Start
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

const selector = (rootStore: RootStore) => {
    return { store: rootStore.setupStore, accountsStore: rootStore.accountsStore, history: rootStore.history };
};
export default connectStore(selector)(SetupPage);
