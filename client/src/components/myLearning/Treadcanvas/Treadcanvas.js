import React, { useRef, useEffect, useState } from 'react';

const StockChart = () => {
  const canvasRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [lineType, setLineType] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawLines = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        const { type, startX, startY, endX, endY } = line;
        context.beginPath();
        context.moveTo(startX, startY);

        if (type === 'horizontal') {
          context.lineTo(canvas.width, startY);
        } else if (type === 'vertical') {
          context.lineTo(startX, canvas.height);
        } else if (type === 'ray') {
          context.lineTo(endX, endY);
        } else if (type === 'segment') {
          context.lineTo(endX, endY);
        }

        context.stroke();
      });

      const { x, y } = mousePosition;
      if (x > 0 && y > 0) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
      }
    };

    drawLines();
  }, [lines, mousePosition]);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setLines([...lines, { type: lineType, startX: x, startY: y }]);
  };

  const stopDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const updatedLines = [...lines];
    const currentLine = updatedLines[updatedLines.length - 1];

    if (lineType === 'ray' || lineType === 'segment') {
      currentLine.endX = x;
      currentLine.endY = y;
    }

    setLines(updatedLines);
  };

  const changeLineType = (type) => {
    setLineType(type);
  };

  const deleteLine = () => {
    if (lines.length > 0) {
      setLines(lines.slice(0, -1));
    }
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border-2 border-gray-800"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={handleMouseMove}
      />
      <div className="mt-4">
        <button
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => changeLineType('horizontal')}
        >
          Horizontal Line
        </button>
        <button
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => changeLineType('vertical')}
        >
          Vertical Line
        </button>
        <button
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => changeLineType('ray')}
        >
          Ray
        </button>
        <button
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => changeLineType('segment')}
        >
          Line Segment
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={deleteLine}
        >
          Delete Last Line
        </button>
      </div>
    </div>
  );
};

export default StockChart;
