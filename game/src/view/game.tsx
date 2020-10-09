import React, { useState } from 'react';
import '../style/game.scss';
import Info from '../components/info';
import { imageList } from '../util/config';

export type SerialNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface GameData {
  serialNumber: SerialNum[];
  swap: SerialNum[];
  swap_step: number;
}

export default function Game(): JSX.Element {
  const [src, setSrc] = useState<string>(imageList[0]);
  const [steps, setSteps] = useState<string>('');
  return (
    <div className="game">
      <Info src={src} stepsNum={steps.length} swapStepsNum={10} />
    </div>
  );
}
