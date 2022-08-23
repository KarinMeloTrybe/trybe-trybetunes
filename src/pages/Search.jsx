import React, { Component } from 'react';
import Header from "./src/components/header";

export default class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        Search
        <Header />
      </div>
    );
  }
}
