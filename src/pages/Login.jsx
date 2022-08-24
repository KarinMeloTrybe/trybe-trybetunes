import React, { Component } from 'react';
import propTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
state={
  User: '',
  Button: true,
}

  handleInput = ({ target }) => {
    const valueLogin = 3;
    if (target.value.length >= valueLogin) {
      this.setState({ User: target.value, Button: false });
    }
  }

  SaveLogin = async (event) => {
    event.preventDefault();
    const {
      history,
    } = this.props;
    const { User } = this.state;
    this.setState({ IsLoading: true });
    await createUser({ name: User });
    this.setState({ IsLoading: false });
    history.push('/search');
  }

  render() {
    const {
      IsLoading,
      Button,
    } = this.state;
    return (
      <div data-testid="page-login">
        {IsLoading && <Loading />}
        Login
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleInput }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.SaveLogin }
            disabled={ Button }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
