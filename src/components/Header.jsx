import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state={
    IsLoading: false,
    Login: '',
  }

  componentDidMount() {
    this.useGetUser();
  }

useGetUser = async () => {
  this.setState({ IsLoading: true });
  const { name } = await getUser();
  this.setState({ IsLoading: false, Login: name });
}

render() {
  const { Login, IsLoading } = this.state;
  return (
    <div data-testid="header-component">
      <div data-testid="header-user-name">
        { IsLoading ? <Loading /> : Login }
      </div>
    </div>
  );
}
}
