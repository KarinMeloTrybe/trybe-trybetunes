import React, { Component } from 'react';
import Link from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class ProfileEdit extends Component {
  state={
    loading: true,
    user: {},
  };

componentDidMount = () => this.useGetUser();

useGetUser = async () => {
  this.setState({ loading: true });
  const dataUser = await getUser();
  this.setState({ user: dataUser }, () => {
    this.setState({ loading: false });
  });
}

render() {
  const {
    loading,
    user,
  } = this.state;
  return (
    <div data-testid="page-profile">
      ProfileEdit
      <Header />
      {loading ? <Loading /> : (
        <div>
          <img data-testid="profile-image" src={ user.image } alt="foto do perfil" />
          <p>
            {user.name}
          </p>
          <p>
            {user.email}
          </p>
          <p>
            {user.description}
          </p>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      )}
    </div>
  );
}
}
