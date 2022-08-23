import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        Login
        <form>
          <p data-testid="login-name-input">Nome</p>
          <button type="submit" data-testid="login-submit-button">Entrar</button>
        </form>
      </div>
    );
  }
}
