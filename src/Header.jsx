import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  render() {
    return (
      <div data-testid="header-component">Header</div>
    );
  }
}
