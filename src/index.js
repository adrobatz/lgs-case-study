import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import Pages from './Pages'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
      <Route path='/:productPage' component={App} />
    </BrowserRouter>
    ),
    document.getElementById('root'));
  registerServiceWorker();
