import { createStore, applyMiddleware, compose } from 'redux';
// eslint-disable-next-line import/no-unresolved
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import reducers from './reducers';

const persistedState = sessionStorage.getItem('current_user')
  ? { user: JSON.parse(sessionStorage.getItem('current_user')) }
  : {};

// const logger = createLogger();
const allStoreEnhancers = compose(applyMiddleware(thunk));

const store = createStore(reducers, persistedState, allStoreEnhancers);

store.subscribe(() => {
  sessionStorage.setItem('current_user', JSON.stringify(store.getState().user));
});

export default store;
