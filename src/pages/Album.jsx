import React, { Component } from 'react';
import Header from './src/components/header';

export default class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        Album
        <Header />
      </div>
    );
  }
}
