import React from 'react';
import './MyLearning.css';  
const videos = [
  { title: '1. What is Supply & Demand Zones? | How to draw Supply & Demand Zones? | What is DBR, RBR, RBD & DBD? | Part 1', url: 'https://www.youtube.com/live/NWooLoAisno?si=-NhhImF2v8mnfWNy', thumbnail: 'https://img.youtube.com/vi/NWooLoAisno/0.jpg' },
  { title: '2. What is Supply & Demand Zones? | How to draw Supply & Demand Zones? | What is DBR, RBR, RBD & DBD? | Part 2', url: 'https://www.youtube.com/live/XfOgNBom0jk?si=fc2vxXhVRgzrPu5n', thumbnail: 'https://img.youtube.com/vi/XfOgNBom0jk/0.jpg' },

  { title: 'Video 3', url: 'https://www.youtube.com/watch?v=video3', thumbnail: 'https://img.youtube.com/vi/video3/0.jpg' },
  { title: 'Video 4', url: 'https://www.youtube.com/watch?v=video4', thumbnail: 'https://img.youtube.com/vi/video4/0.jpg' },
  { title: 'Video 5', url: 'https://www.youtube.com/watch?v=video5', thumbnail: 'https://img.youtube.com/vi/video5/0.jpg' },
  { title: 'Video 6', url: 'https://www.youtube.com/watch?v=video6', thumbnail: 'https://img.youtube.com/vi/video6/0.jpg' },
  { title: 'Video 7', url: 'https://www.youtube.com/watch?v=video7', thumbnail: 'https://img.youtube.com/vi/video7/0.jpg' },
  { title: 'Video 8', url: 'https://www.youtube.com/watch?v=video8', thumbnail: 'https://img.youtube.com/vi/video8/0.jpg' },
];

const MyLearning = () => {
  return (
    <div className="learning-page">
      <div className="card-container">
        {videos.map((video, index) => (
          <div className="card" key={index}>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              <img src={video.thumbnail} alt={video.title} className="thumbnail" />
              <h3>{video.title}</h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLearning;
