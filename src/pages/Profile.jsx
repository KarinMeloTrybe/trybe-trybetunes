import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state={
    loading: true,
    name: '',
    email: '',
    image: '',
    description: '',
    user: [{}],
  };

componentDidMount = () => this.getUser();

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
    name,
    email,
    image,
    description,
    user,
  } = this.state;
  return (
    <div data-testid="page-profile-edit">
      ProfileEdit
      <Header />
      
    </div>
  );
}
}
