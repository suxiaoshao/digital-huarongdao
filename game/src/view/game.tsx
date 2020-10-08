import React, { useState } from 'react';
import '../style/game.scss';
import Info from '../components/info';
import { imageList } from '../util/config';

export default function Game(): JSX.Element {
  const [src, setSrc] = useState<string>(imageList[0]);
  const [steps, setSteps] = useState<string>('');
  return (
    <div className="game">
      <Info src={src} stepsNum={steps.length} swapStepsNum={10} />
    </div>
  );
}
