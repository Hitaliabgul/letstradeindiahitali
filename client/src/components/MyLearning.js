import React from 'react';
import './MyLearning.css';  
const videos = [
  { title: '1. What is Supply & Demand Zones? | How to draw Supply & Demand Zones? | What is DBR, RBR, RBD & DBD? | Part 1', url: 'https://www.youtube.com/live/NWooLoAisno?si=-NhhImF2v8mnfWNy', thumbnail: 'https://img.youtube.com/vi/NWooLoAisno/0.jpg' },
  { title: '2. What is Supply & Demand Zones? | How to draw Supply & Demand Zones? | What is DBR, RBR, RBD & DBD? | Part 2', url: 'https://www.youtube.com/live/XfOgNBom0jk?si=fc2vxXhVRgzrPu5n', thumbnail: 'https://img.youtube.com/vi/XfOgNBom0jk/0.jpg' },
  { title: '3. What is Supply & Demand Zones? | How to draw Supply & Demand Zones? | What is DBR, RBR, RBD & DBD? | Part 3', url: 'https://www.youtube.com/live/YcdtfNAZGdU?si=pae3anNfWy0c4pmK', thumbnail: 'https://img.youtube.com/vi/YcdtfNAZGdU/0.jpg' },
  { title: '4. What is Supply & Demand Zones? | How to draw Supply & Demand Zones? | What is DBR, RBR, RBD & DBD? | Part 4', url: 'https://www.youtube.com/live/ZoLxBnMpWqk?si=qitFR3EPJ-za9Eh7', thumbnail: 'https://img.youtube.com/vi/ZoLxBnMpWqk/0.jpg' },
  { title: '5. What is Supply & Demand Zones? | How to draw Supply & Demand Zones? | What is DBR, RBR, RBD & DBD? | Part 5', url: 'https://www.youtube.com/live/obOFPpjCW_A?si=RF_hGTb_h77bJanA', thumbnail: 'https://img.youtube.com/vi/obOFPpjCW_A/0.jpg' },
  { title: '6. What is Supply & Demand Zones? | How to draw Supply & Demand Zones? | What is DBR, RBR, RBD & DBD? | Part 6', url: 'https://www.youtube.com/live/v3xc-pceMjY?si=oIDiHHB5Wf9wG3Db', thumbnail: 'https://img.youtube.com/vi/v3xc-pceMjY/0.jpg' },
  { title: '7. What is Supply & Demand Zones? | How to draw Supply & Demand Zones? | What is DBR, RBR, RBD & DBD? | Part 7', url: 'https://www.youtube.com/live/nU0l1ePrpj4?si=uaXmXU2a8SPOMgbw', thumbnail: 'https://img.youtube.com/vi/nU0l1ePrpj4/0.jpg' },
  { title: '8. What is Supply & Demand Zones? | How to draw Supply & Demand Zones? | What is DBR, RBR, RBD & DBD? | Part 8', url: 'https://www.youtube.com/live/uM3fhcNdVXE?si=ByX5ICYvyYtqo0au', thumbnail: 'https://img.youtube.com/vi/uM3fhcNdVXE/0.jpg' },

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
