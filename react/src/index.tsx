import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './views/home/App';
import * as serviceWorker from './serviceWorker';
import AppRouter from './router/index';
import { MemoryRouter } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <AppRouter></AppRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
