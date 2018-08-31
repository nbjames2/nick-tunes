import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
        album: album,
        currentSong: album.songs[0],
        isPlaying: false,
        isHovering: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }
  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  onHover(song, index) {
    const isSameSong = this.state.currentSong === song;
    const row = document.querySelectorAll("#playState");
    
    if (isSameSong && this.state.isPlaying) {
      row[index].className = "ion-md-pause";
    } else {
      row[index].className = "ion-md-play";
    } 
    row[index].innerHTML = "";
  }

  offHover(song, index) {
    const isSameSong = this.state.currentSong === song;
    const row = document.querySelectorAll("#playState");

    if(isSameSong && this.state.isPlaying) {
      row[index].className = "ion-md-pause";
    } else if (isSameSong) {
      row[index].className = "ion-md-play";
    } else {
      row[index].className = "";
      row[index].innerHTML = index + 1;
    }
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img src id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.onHover(song, index)} onMouseLeave={() => this.offHover(song, index)} >
                  <td id="playState">{index + 1}</td>
                  <td>{ this.state.album.songs[index].title }</td>
                  <td>{ this.state.album.songs[index].duration }</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album
