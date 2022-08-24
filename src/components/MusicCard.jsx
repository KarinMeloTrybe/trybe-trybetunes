import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
    state={
      loading: false,
      checkedMusics: false,
    };

    async componentDidMount() {
      const {
        trackId,
      } = this.props;
      const favorite = await getFavoriteSongs();
      const checkedMusics = favorite.some((music) => music.trackId === trackId);
      this.setState({ loading: true, checkedMusics }, () => this
        .setState({ loading: false }));
    }

    handleChecked = ({ target }) => {
      const {
        albumList,
        index,
      } = this.props;
      if (target.checked) {
        this.setState({ checkedMusics: true, loading: true }, async () => {
          await addSong(albumList[index]);
          this.setState({ loading: false });
        });
      } else {
        this.setState({ checkedMusics: false, loading: true }, async () => {
          await removeSong(albumList[index]);
          this.setState({ loading: false }, () => {
            const { checkedMusics } = this.props;
            checkedMusics();
          });
        });
      }
    };

    render() {
      const {
        loading,
        checkedMusics,
      } = this.state;

      const {
        trackName,
        trackId,
        previewUrl,
      } = this.props;
      return (
        <div>
          <h3>{loading ? <Loading /> : trackName }</h3>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {previewUrl}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              type="checkbox"
              id={ trackId }
              onChange={ this.handleChecked }
              checked={ checkedMusics }
            />
          </label>
        </div>
      );
    }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
  checkedMusics: PropTypes.func,
  index: PropTypes.number.isRequired,
  albumList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

MusicCard.defaultProps = {
  checkedMusics: () => {},
};
