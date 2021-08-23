import React, { useEffect, useState } from 'react';
import '../style/tip.scss';
import { SerialNum } from './game';
import { useLocation, useHistory } from 'react-router-dom';
import { ImageMatrix } from '../util/image';
import '../style/game/info.scss';
import { Button, IconButton } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { allowDict, allowSwap } from '../util/prompt';
import GameBase from '../components/gameBase';
import { GameData } from '../util/wasm';

const swapDict: {
  [prop: string]: string;
} = {
  w: 's',
  s: 'w',
  a: 'd',
  d: 'a',
};

export interface TipData {
  src: string;
  serialNumber: SerialNum[];
}

export default function Tip(): JSX.Element {
  const myLocation = useLocation<TipData>();
  const myHistory = useHistory();
  // 被挖空的图片
  const [emptySrc, setEmptySrc] = useState<string>('');
  // 行走的步数
  const [stepNum, setStepNum] = useState<number>(0);
  // 操作字符串
  const [steps, setSteps] = useState<string>('');
  // 当前情况
  const [serialNumber, setSerialNumber] = useState<SerialNum[]>([]);
  useEffect(() => {
    if (myLocation.state === undefined) {
      myHistory.push('/');
    } else {
      setSerialNumber([...myLocation.state.serialNumber]);
      setSteps(GameData.new([...myLocation.state.serialNumber])?.get_steps() ?? '');
    }
  }, [myHistory, myLocation]);
  // 获取挖空图片
  useEffect(() => {
    if (myLocation.state !== undefined) {
      (async () => {
        const image = new ImageMatrix(myLocation.state.src);
        await image.loadImage();
        setEmptySrc(await image.getImageEmpty(myLocation.state.serialNumber));
      })();
    }
    return () => {
      URL.revokeObjectURL(emptySrc);
    };
  }, [emptySrc, myLocation.state]);
  return (
    <div className="tip">
      <div className="info">
        <div className="image">
          <img alt="图片" src={emptySrc} />
        </div>
        <div className="operations">
          <IconButton
            disabled={stepNum === 0}
            onClick={() => {
              const operation = swapDict[steps[stepNum - 1]];
              const zeroIndex = serialNumber.indexOf(0);
              const swapIndex = allowSwap[zeroIndex][allowDict.indexOf(operation)];
              serialNumber[zeroIndex] = serialNumber[swapIndex];
              serialNumber[swapIndex] = 0;
              setStepNum((value) => value - 1);
            }}
          >
            <ArrowBack fontSize="large" />
          </IconButton>
          <IconButton
            disabled={stepNum === steps.length}
            onClick={() => {
              const operation = steps[stepNum];
              const zeroIndex = serialNumber.indexOf(0);
              const swapIndex = allowSwap[zeroIndex][allowDict.indexOf(operation)];
              serialNumber[zeroIndex] = serialNumber[swapIndex];
              serialNumber[swapIndex] = 0;
              setStepNum((value) => value + 1);
            }}
          >
            <ArrowForward fontSize="large" />
          </IconButton>
        </div>
      </div>
      <GameBase
        src={myLocation.state?.src}
        serialNumber={serialNumber}
        onSerialNumber={() => {
          console.log(111);
        }}
      />
      <div className="button-group">
        <Button
          variant="contained"
          color="primary"
          className="start-button"
          onClick={() => {
            myHistory.push('/');
          }}
        >
          返回首页
        </Button>
      </div>
    </div>
  );
}
