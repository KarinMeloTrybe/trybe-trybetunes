import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
state={
  search: '',
  artist: '',
  loading: false,
  albuns: [],
};

  handleInput = ({ target }) => {
    this.setState({ search: target.value });
  }

    handleClick = async (e) => {
      const { search } = this.state;
      e.preventDefault();
      this.setState({ loading: true });
      const albuns = await searchAlbumsAPI(search);
      this.setState({ loading: false, albuns, artist: search });
    };

    render() {
      const {
        artist,
        search,
        loading,
        albuns,
      } = this.state;
      const tamMin = 2;
      return (
        <div data-testid="page-search">
          Search
          <Header />
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.handleInput }
            />

            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ search.length < tamMin }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
          { artist.length > 0 && (
            <p>
              {`Resultado de álbuns de: ${artist}`}
            </p>)}
          { artist.length > 0 && !albuns.length && (
            <p>Nenhum álbum foi encontrado</p>)}
          {loading ? <Loading /> : (
            albuns.map(({ artistName, collectionId, collectionName, artworkUrl100 }) => (
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                key={ collectionId }
                to={ `/album/${collectionId}` }
              >
                <img src={ artworkUrl100 } alt={ collectionName } />
                <p>
                  {
                    artistName
                  }
                </p>
                <h3>
                  {
                    collectionName
                  }
                </h3>
              </Link>
            ))
          )}
        </div>
      );
    }
}
