import { useEffect, useState } from 'react';
import audio from "./assets/metronome2.mp3"



export const Metronome = ({ isPlaying, bpm }) => {

  const [metronome, setMetronome] = useState(null);
  const metronomeAudio = new Audio(audio)

  useEffect(() => {
    if (isPlaying) {
      stopMetronome()
      startMetronome()
    } else {
      stopMetronome()
    }
  }, [bpm, isPlaying])


  const updateAudio = () => {
    metronomeAudio.load()
    metronomeAudio.play()
  }

  const stopMetronome = () => {
    clearInterval(metronome)
    setMetronome(null)
  }

  const startMetronome = () => {
    setMetronome(setInterval(updateAudio, 60000 / bpm))
  }

  return null
}

