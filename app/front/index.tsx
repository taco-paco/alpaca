import { configure } from 'mobx';
import { createRoot } from 'react-dom/client';
import { Context, rootStore } from './rootStore';
import React from 'react';
import { Route, Routes, unstable_HistoryRouter as Router } from 'react-router-dom';
import SetupPage from './screens/Setup';
import { history } from './setupHistory';
import Loader from './screens/Loader';
import './index.css';
import ExplorerPage from './screens/Explorer';

configure({
    enforceActions: 'always',
    reactionRequiresObservable: true,
    disableErrorBoundaries: true,
});

const App: React.FC = () => {
    return (
        <div>
            <Context.Provider value={rootStore}>
                <Router history={history}>
                    <Routes>
                        <Route exact path="/" element={<Loader />} />
                        <Route exact path="/setup" element={<SetupPage />} />
                        <Route path="/explorer/*" element={<ExplorerPage />} />
                    </Routes>
                </Router>
            </Context.Provider>
        </div>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
