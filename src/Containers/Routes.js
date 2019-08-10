import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Grid from './Grid';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Grid} />
      </Router>
    );
  }
}

export default Routes;