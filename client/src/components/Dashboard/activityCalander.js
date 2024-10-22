import React, { useState } from 'react';

const ActivityHeatmap = () => {
  // Dummy data for activity heatmap
  const [activityData, setActivityData] = useState([
    [0, 1, 1, 0, 0, 1, 0],
    [1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 1],
    [1, 1, 0, 0, 1, 1, 0],
    [1, 0, 0, 1, 1, 0, 0],
  ]);

  return (
    <div className="activity-heatmap">
      <h2>CodeChef Activity Heatmap</h2>
      <div className="heatmap-grid grid grid-cols-7 gap-1">
        {activityData.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((value, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`heatmap-day ${
                  value ? 'bg-green-500' : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ActivityHeatmap;
