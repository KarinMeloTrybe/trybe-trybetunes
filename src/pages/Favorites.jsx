import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
state={
  favoritesList: [],
  loading: false,
};

componentDidMount = () => this.useGetFavoriteSongs();

useGetFavoriteSongs = async () => {
  this.setState({ loading: true });
  const list = await getFavoriteSongs();
  this.setState({ favoritesList: list }, () => {
    this.setState({ loading: false });
  });
}

removeSong = (index) => {
  const {
    favoritesList,
  } = this.state;
  favoritesList.splice(index, 1);
  this.setState({ favoritesList: [...favoritesList] });
};

render() {
  const {
    favoritesList,
    loading,
  } = this.state;
  return (
    <div data-testid="page-favorites">
      <Header />
      {loading ? <Loading /> : (
        favoritesList.map((favorites, index) => (
          <MusicCard
            key={ favorites.trackId }
            index={ index }
            previewUrl={ favorites.previewUrl }
            useGetFavoriteSongs={ this.useGetFavoriteSongs }
            trackName={ favorites.trackName }
            trackId={ favorites.trackId }
            albumList={ favoritesList }
            removedSong={ this.removeSong }
          />
        ))
      )}
    </div>
  );
}
}
