import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Inicio from './crud/inicio';
import * as serviceWorker from './serviceWorker';
import Edit from './crud/edit';
import Add from './crud/add';

ReactDOM.render(
  <Router>
    <div>
      <nav className="navbar sticky-top navbar-dark bg-dark">
        <a className="navbar-brand" href="/">CRUD React JS + Firebase</a>
      </nav>
      <br></br>
      <Route exact path='/' component={Inicio} />
      <Route path='/edit/:id' component={Edit} />
      <Route path='/create' component={Add} />
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
