import React from 'react';
import './MyLearning.css';  
const videos = [
  { title: '1. WILL BEARS OUTPERFORM BULLS? | NIFTY PREDICTION FOR TOMORROW | MARKET ANALYSIS FOR TOMORROW', url: 'https://youtu.be/lZJKNUYdmtw?si=TPhYPbgyhCXBPrvX', thumbnail: 'https://img.youtube.com/vi/lZJKNUYdmtw/0.jpg' },
  { title: 'Nifty Media Sector Analysis | Why Nifty Media Sector is falling? | Nifty Media Sector Latest News.', url: 'https://youtu.be/zEPa4aM5-vs?si=y4WFnIbO31Jdb5dh', thumbnail: 'https://img.youtube.com/vi/zEPa4aM5-vs/0.jpg' },
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
