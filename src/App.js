import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from 'react';

import { Metronome } from "./Metronome/Metronome"

function App() {

  const [bpm, setBpm] = useState(60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setPlaying] = useState(false);

  const isInitialMount = useRef(true);

  const notes = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G"
  ]

  const shuffle = (arr) => {
    let j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
    }
    return arr;
  }

  const [currentArr, setCurrentArr] = useState(shuffle(notes));

  const changeNote = () => {
    setCurrentIndex(prevIdx => {
      if (prevIdx === currentArr.length - 1) {
        setCurrentArr(shuffle(notes))
        return 0
      } else {
        return prevIdx + 1
      }
    })
  }

  const startPlay = () => {
    // 6 это количество одной ноты на всех струнах
    setPlaying(setInterval(changeNote, 60000 * 6 / bpm))
  }

  const stopPlay = () => {
    clearInterval(isPlaying)
    setPlaying(null)
  }


  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (isPlaying) {
      stopPlay()
    } else {
      stopPlay()
      startPlay()
    }
  }, [bpm])

  return (
    <div className="App">
      <header className="App-header">
        {currentArr[currentIndex]}
      </header>

      <Metronome isPlaying={isPlaying} bpm={bpm} />

      <div>
        <div onClick={() => setBpm(bpm - 1)}>-</div>
        <div>{bpm}</div>
        <div onClick={() => setBpm(bpm + 1)}>+</div>
      </div>

      <div className="">
        <div className="button" onClick={() => isPlaying ? stopPlay() : startPlay()}> {isPlaying ? "Выключить" : "Включить"}</div>
      </div >

    </div >
  );
}

export default App;
