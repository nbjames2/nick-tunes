import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './Library.css';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
      <section className='library'>
        {
          this.state.albums.map( (album, index) =>
              <Link to={`/album/${album.slug}`} key={index}>
              <section className='albums'>
                <img className='album-image' src={album.albumCover} alt={album.title} />
                <section className='albums-info'>
                  <div className='album-title'>{album.title}</div>
                  <div className='album-artist'>{album.artist}</div>
                  <div className='album-songs'>{album.songs.length} songs</div>
                  </section>
                </section>
              </Link>
          )
        }
      </section>
    );
  }
}

export default Library;
