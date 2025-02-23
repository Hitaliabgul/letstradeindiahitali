import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaylistPage.css';

const playlists = [
  {
    title: 'Supply & Demand Zone Concept',
    description: '',
    totalPlaylists: 8,
    url: 'https://youtu.be/lZJKNUYdmtw?si=TPhYPbgyhCXBPrvX',
    thumbnail: 'https://img.youtube.com/vi/NWooLoAisno/0.jpg',
  },
 
];

const PlaylistPage = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/playlist/mylearning');
  };

  return (
    <div className="playlist-page">
      <div className="playlist-card-container">
        {playlists.map((playlist, index) => (
          <div className="playlist-card" key={index} onClick={handleCardClick}>
            <div className="playlist-card-content">
              {/* Image on the left */}
              <div className="playlist-image-container">
                <img src={playlist.thumbnail} alt={playlist.title} className="playlist-thumbnail" />
              </div>

              {/* Content: Title, Description, Playlist Count */}
              <div className="playlist-info-container">
                <h3>{playlist.title}</h3>
                <p className="playlist-description">{playlist.description}</p>
               
              </div>
              <div className="playlist-count">
                  <span>{playlist.totalPlaylists} Videos</span>
                </div>
            </div>

            <div className="playlist-play-overlay">
              <span className="playlist-play-icon">▶</span> Play All
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
