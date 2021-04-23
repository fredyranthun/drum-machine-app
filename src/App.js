// import 'react-rangeslider/lib/index.css';
import './App.scss';
import React, { useState } from 'react';
import useSound from 'use-sound';
import drumKick from './sounds/sound-files/drum-kick.mp3';
import snare from './sounds/sound-files/snare.wav';
import cowbell from './sounds/sound-files/cowbell.mp3';
import cowbell2 from './sounds/sound-files/baby-cowbell.mp3';
import chord from './sounds/sound-files/cminor7.mp3';
import ride from './sounds/sound-files/ride.mp3';
import hithat from './sounds/sound-files/hithat.wav';
import clap from './sounds/sound-files/clap.wav';
import bass from './sounds/sound-files/bass-0102.wav';
import useEventListener from "@use-it/event-listener";
import styled from 'styled-components';
import Slider from 'react-rangeslider';
import Switch from "react-switch";

// CSS constants;
const babyBlue = '#C3E0E5';
const darkBlue = '#274472';
const blueGray = '#5885AF';
const midnightBlue = '#41729F';
const buttonSize = '100px';

// Styled components;
const StyledHeader = styled.h1`
  color: ${darkBlue};
  width: 100%;
`
const DrumPads = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 330px;
`
const DrumButton = styled.button`
  width: ${buttonSize};
  height: ${buttonSize};
  background: linear-gradient(270deg, ${darkBlue} 0%, ${midnightBlue} 100%);
  border: none;
  color: ${babyBlue};
  margin-top: 10px;
`
const SetupContainer = styled.div`
  min-width: 200px;
  max-width: 300px;
  flex-grow: 1;
  margin: 10px 5px 0 5px;
  border: 1px solid ${blueGray};
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, ${babyBlue} 100%);;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  justify-content: start;
  padding: 10px;
`
const InfoDisplay = styled.div`
  background-color: black;
  font-family: 'Gugi', cursive;
  margin: 10px;
  color: white;
  height: 35px;
  font-size: 20px;
  line-height: 20px;
  padding: 5px;
  padding-top: 15px;
`

function App() {
  // hook for volume;
  const [volume, setVolume] = useState(0.5);
  // hooks for sounds;
  const [playKick] = useSound(drumKick, {volume: volume});
  const [playSnare] = useSound(snare, {volume: volume});
  const [playCowbell] = useSound(cowbell, {volume: volume});
  const [playCowbell2] = useSound(cowbell2, {volume: volume});
  const [playHithat] = useSound(hithat, {volume: volume});
  const [playRide] = useSound(ride, {volume: volume});
  const [playClap] = useSound(clap, {volume: volume});
  const [playChord] = useSound(chord, {volume: volume});
  const [playBass] = useSound(bass, {volume: volume});
  // hook for diplaying last sound;
  const [display, setDisplay] = useState('');
  // turning on & off the Drum Machine;
  const [working, setWorking] = useState(true);
  // function for turning off funcionalities of Drum Machine; 
  const handleChange = () => (working ? (setWorking(false), setDisplay('')) : setWorking(true));
  
  const sounds = [
    {name: 'Kick', soundType: playKick}, 
    {name: 'Snare', soundType: playSnare},
    {name: 'CowBell', soundType: playCowbell},
    {name: 'CowBell 2', soundType: playCowbell2},
    {name: 'Hit Hat', soundType: playHithat},
    {name: 'Ride', soundType: playRide},
    {name: 'Clap', soundType: playClap},
    {name: 'Chord', soundType: playChord},
    {name: 'Bass', soundType: playBass}
  ];

  const playKeys = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];

  const buttons = sounds.map((value, index) => (
    <DrumButton
      key={index}
      onClick={() => {value.soundType(); setDisplay(value.name)}}
    >
      Key: {playKeys[index].toUpperCase()}<br/>{value.name}
    </DrumButton>
  ));
  // the buttons we will render when the machine is turned off;
  const offButtons = sounds.map((value, index) => (
    <DrumButton key={index}></DrumButton>
  ));
  // event listener for keyboard events
  useEventListener('keydown', e => {
    for (let i = 0; i <=9; i++) {
      if(e.key === playKeys[i]) {
        sounds[i].soundType();
        setDisplay(sounds[i].name);  
      }
    }
  });

  return (

      <div className="App">
        <StyledHeader>Drum Machine App</StyledHeader>
        <DrumPads>
          {working ? buttons : offButtons}
        </DrumPads>
        <SetupContainer>
          <InfoDisplay>{display}</InfoDisplay>
          {working &&
          <Slider
            max={1}
            min={0}
            step={0.1}
            tooltip={false}
            value={volume}
            onChange={
              value => {
                setVolume(value);
                setDisplay(`Volume: ${value.toFixed(1)}`);
                }}
          />
          }
          <Switch className='switch'
            checked={working}
            onChange={handleChange}
            onColor={darkBlue}
          />
        </SetupContainer>
      </div>
  );
}

export default App;
