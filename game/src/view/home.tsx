import React from 'react';
import '../style/home.scss';
import { Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function Home(): JSX.Element {
  const myHistory = useHistory();
  return (
    <div className="home">
      <Typography className="name" variant="h3">
        图片华容道
      </Typography>
      <img className="icon" alt="图片" src={require('../assets/3062795.svg') as string} />
      <Button
        variant="contained"
        color="primary"
        className="start-button"
        onClick={() => {
          myHistory.push('/game');
        }}
      >
        开始游戏
      </Button>
    </div>
  );
}
