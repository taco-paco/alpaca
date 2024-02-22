import React from 'react';
import { connectStore, provideStore } from '../../connectToStore';
import { MemoryHistory } from 'history';
import { RootStore } from '../../rootStore';
import { ipcRenderer } from 'electron';
import { history } from '../../setupHistory';
import { Route } from '../../routes';
import s from './index.module.css';

type Props = {
    history: MemoryHistory;
};

class Loader extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        ipcRenderer.send('create-engine-process');
        ipcRenderer.on('engine-process-created', this.onEngineProcessCreated);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener('engine-init-finished', this.onEngineProcessCreated);
    }

    onEngineProcessCreated = () => {
        history.push(Route.Setup);
    };

    override render() {
        // TODO: fancy starting page
        return <div className={s.loader}>Alpaca</div>;
    }
}

const selector = (rootStore: RootStore) => {
    return { history: rootStore.history };
};

export default provideStore(selector)(Loader);
