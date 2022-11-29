import React from 'react';
import '../style/home.scss';
import { Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GameData } from './game';
import logo2 from '../assets/logo2.svg';
import { GameData as WasmGameData, StringGameData } from '../util/wasm';
import { getGameData } from '../util/gameData';

export default function Home(): JSX.Element {
  const myHistory = useHistory<GameData>();
  return (
    <div className="home">
      <Typography className="name" variant="h3">
        图片华容道
      </Typography>
      <img className="icon" alt="图片" src={logo2} />
      <div className="button-group">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className="start-button"
          onClick={() => {
            console.time('random');
            const gameData = WasmGameData.random().get_data();
            console.timeEnd('random');
            myHistory.push({ pathname: '/game', state: gameData });
          }}
        >
          wasm
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className="start-button"
          onClick={() => {
            console.time('random');
            const gameData = StringGameData.random().get_data();
            console.timeEnd('random');
            myHistory.push({ pathname: '/game', state: gameData });
          }}
        >
          wasm string
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className="start-button"
          onClick={() => {
            console.time('random');
            const gameData = getGameData();
            console.timeEnd('random');
            myHistory.push({ pathname: '/game', state: gameData });
          }}
        >
          js string
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className="start-button"
          onClick={() => {
            myHistory.push('/record');
          }}
        >
          查看战绩
        </Button>
      </div>
    </div>
  );
}
