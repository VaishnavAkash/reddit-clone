'use client';

import {Provider} from 'react-redux';
import store from './store.js';

export function AppProvider({children}){
    return <Provider store={store}>
        {children}
    </Provider>
}
