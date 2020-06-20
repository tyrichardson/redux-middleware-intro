import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import __REDUX_DEVTOOLS_EXTENSION__ from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';

import elementListReducer from './reducers/ElementListReducer';
import firstReducer from './reducers/FirstReducer';
import secondReducer from './reducers/SecondReducer';
import postElement from './sagas/PostElement';
import fetchElements from './sagas/FetchElement';

function* rootSaga()
{
    yield takeEvery('FETCH_ELEMENTS', fetchElements);
    yield takeEvery('ADD_ELEMENT', postElement);
}

const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        firstReducer,
        secondReducer,
        elementListReducer,
    }),
    compose(
        applyMiddleware(sagaMiddleware),
        applyMiddleware(logger),
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
            ? a => a
            : window.__REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()

    )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
