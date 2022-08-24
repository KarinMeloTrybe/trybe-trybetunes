import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state={
    albumList: [],
    collectionMusic: '',
    loading: true,
  };

  componentDidMount() {
    this.useGetMusic();
  }

useGetMusic = async () => {
  const { match: { params: { id } } } = this.props;
  const getMusic = await getMusics(id);
  const removeFirstMusic = getMusic.slice(1);
  this.setState({
    albumList: removeFirstMusic, collectionMusic: getMusic[0],
  }, () => {
    this.setState({ loading: false });
  });
};

render() {
  const {
    albumList,
    loading,
    collectionMusic: { artistName, collectionName },
  } = this.state;
  return (
    <div data-testid="page-album">
      Album
      <Header />
      {loading ? <Loading /> : (
        <div>
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{collectionName}</p>
          <div>
            {albumList.map(({ trackId, trackName, previewUrl }, index) => (
              <div key={ trackId }>
                <MusicCard
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  trackId={ trackId }
                  albumList={ albumList }
                  index={ index }
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
