import React from 'react';
import './App.css';
import Product from "./componets/Product"
import Detailitem from './componets/Detailitem';
import Cart from "./componets/Cart"
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './componets/Navbar';

const App = ()=>{
  return (
    <React.Fragment>
      <Router>
        <Navbar/>
        <Switch>
        <Route path = "/" exact component = {Product}/>
        <Route path = "/Detail/:id" component = {Detailitem}/>
        <Route path = "/Cart" component = {Cart}/>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
