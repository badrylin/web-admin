import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import AppRouter from './router/index';
import './index.css';
import './icons/index';
import { Provider } from 'react-redux';
import { store } from './store/index';
import './mock';
import test from './test';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter></AppRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
