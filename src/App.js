import { useEffect, useRef, useState } from 'react';
import './style.css';
import {db} from './firebase-config';
import {collection, getDocs} from 'firebase/firestore';

const penguinsImage = require('./penguins.jpeg');

export const App = () => {
  const [penguins, setPenguins] = useState([]);
  const penguinsCollectionRef = collection(db, "penguins");
  const firstPenguin = useRef();
  const secondPenguin = useRef();

  const target = useRef();
  const [targetCoords, setTargetCoords] = useState({x: 0, y: 0});
  //Target square dimensions
  const targetHeight = 25;
  const targetWidth = 25;

  useEffect(() => {
    const getPenguins = async () => {
      const data = await getDocs(penguinsCollectionRef);
      setPenguins(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getPenguins();
  }, []);

  useEffect(() => {
    console.log(penguins);
  }, [penguins])

  useEffect(() => {
    target.current.style.top = targetCoords.y+'px';
    target.current.style.left = targetCoords.x+'px';

    //Check if a penguin location was found
    penguins.forEach((penguin) => {
      const point = (x,y) => {
        return {x,y}
      } 
      const penguinPoint = point(penguin.x,penguin.y);
      if(isPointInsideSquare(penguinPoint,targetCoords,targetWidth,targetHeight)){
        const newPenguins = [...penguins];
        newPenguins.forEach((element) => {
          if(element.id == penguin.id){
            element.hasBeenFound = true;
          }
        setPenguins(newPenguins);
        });
      }
    });
  }, [targetCoords]);

  const isPointInsideSquare = (point,square,w,h) => {
    if(
        (point.x >= square.x && point.x <= (square.x+w)) &&
        (point.y >= square.y && point.y <= (square.y+h))
    ){
        return true;
    }else{
        return false;
    }
  }

  const frameClickHandler = (e) => {
    console.log("x: "+e.clientX+" ,y: "+e.clientY);
    const x = e.clientX - targetWidth/2;
    const y = e.clientY - targetHeight/2;
    setTargetCoords({x: x , y: y });
  }

    return (
      <div className='container'>
        <h1>Where is the penguin?</h1>
        <h3>Find the 10 penguins!</h3>

        <div id="frame" onClick={(e) => frameClickHandler(e)}>
          <img src={penguinsImage} alt="" />
          <div id='target' ref={target}></div>
          {/* List of penguin targets */}
          {penguins.map((penguin) => penguin.hasBeenFound && <div id={penguin.id} key={penguin.id}  className='success-target'></div>)}
        </div>
      </div>
    );
  }

