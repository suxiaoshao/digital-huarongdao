import React from 'react';
import '../style/home.scss';
import { Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { getGameData } from '../util/gameData';
import { GameData } from './game';
import logo2 from '../assets/logo2.svg';
import { GameData as WasmGameData } from '../util/wasm';

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
          className="start-button"
          onClick={() => {
            let date = Date.now();
            const list = getGameData();
            console.log(Date.now() - date);
            date = Date.now();
            const gameData = WasmGameData.new().get_data();
            console.log(Date.now() - date);
            console.log(gameData);
            myHistory.push({ pathname: '/game', state: list });
          }}
        >
          开始游戏
        </Button>
        <Button
          variant="contained"
          color="primary"
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
