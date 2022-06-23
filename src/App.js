import { useEffect, useRef, useState } from 'react';
import './style.css';

const penguinsImage = require('./penguins.jpeg');

export const App = () => {
  const target = useRef();
  const [targetCoords, setTargetCoords] = useState({x: 0, y: 0});
  //Target square dimensions
  const targetHeight = 25;
  const targetWidth = 25;

  useEffect(() => {
    target.current.style.top = targetCoords.y+'px';
    target.current.style.left = targetCoords.x+'px';
  }, [targetCoords]);

  const frameClickHandler = (e) => {
    const x = e.clientX - targetWidth/2;
    const y = e.clientY - targetHeight/2;
    setTargetCoords({x: x , y: y });
    // target.current.style.display = 'block';
  }

  return (
    <div className='container'>
      <h1>Where is the penguin?</h1>
      <h3>Find the 10 penguins!</h3>

      <div id="frame" onClick={(e) => frameClickHandler(e)}>
        <img src={penguinsImage} alt="" />
        <div id='target' ref={target}></div>
      </div>
    </div>
  );
}

