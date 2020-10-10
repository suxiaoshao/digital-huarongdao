import React, { useEffect, useState } from 'react';
import '../style/game.scss';
import Info from '../components/info';
import { imageList } from '../util/config';
import { useLocation, useHistory } from 'react-router-dom';
import GameBase from '../components/gameBase';

export type SerialNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface GameData {
  serialNumber: SerialNum[];
}

export default function Game(): JSX.Element {
  const [src, setSrc] = useState<string>(imageList[0]);
  const [steps, setSteps] = useState<string>('');
  const myLocation = useLocation<GameData>();
  const myHistory = useHistory();
  useEffect(() => {
    if (myLocation.state === undefined) {
      myHistory.push('/');
    }
  }, [myHistory, myLocation]);
  return (
    <div className="game">
      <Info src={src} stepsNum={steps.length} swapStepsNum={10} />
      <GameBase />
    </div>
  );
}
