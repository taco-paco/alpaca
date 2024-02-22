import React from 'react';
import { observer } from 'mobx-react';

import { RootStore, Context } from './rootStore';

type Selector<StoreProps> = (state: RootStore) => StoreProps;

function connectToStore<StoreProps>(selector: Selector<StoreProps>, shouldBeObserver: boolean) {
    return function <Props>(BaseComponent: React.ComponentType<Props & StoreProps>) {
        const WrappedComponent = shouldBeObserver ? observer(BaseComponent) : BaseComponent;

        return function (props: Omit<Props, keyof StoreProps>) {
            const propsWrapper = (state: RootStore) => ({ ...props, ...selector(state) } as Props & StoreProps);
            // @ts-expect-error: todo fix me
            return <Context.Consumer>{(state: RootStore) => <WrappedComponent {...propsWrapper(state)} />}</Context.Consumer>;
        };
    };
}

export function connectStore<StoreProps>(selector: Selector<StoreProps>) {
    return connectToStore(selector, true);
}

export function provideStore<StoreProps>(selector: Selector<StoreProps>) {
    return connectToStore(selector, false);
}
