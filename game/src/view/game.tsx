import React, { useEffect, useState } from 'react';
import '../style/game.scss';
import Info from '../components/info';
import { imageList } from '../util/config';
import { useHistory, useLocation } from 'react-router-dom';
import GameBase from '../components/gameBase';
import { Button } from '@material-ui/core';
import { getRandomItem } from '../util/gameData';
import { addGameRecord } from '../util/store';
import { getSteps } from '../util/prompt';

export type SerialNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface GameData {
  serialNumber: SerialNum[];
}

export default function Game(): JSX.Element {
  const [src] = useState<string>(getRandomItem(imageList));
  const [steps, setSteps] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<SerialNum[]>([]);
  const [useTime, setUseTime] = useState<number>(0);
  const [timeId, setTimeId] = useState<number | undefined>(undefined);
  const myLocation = useLocation<GameData>();
  const myHistory = useHistory();
  useEffect(() => {
    if (myLocation.state === undefined) {
      myHistory.push('/');
    } else {
      setSerialNumber(myLocation.state.serialNumber);
      console.log(
        getSteps(myLocation.state.serialNumber)
          ?.replace(/a/g, '左')
          .replace(/w/g, '上')
          .replace(/s/g, '下')
          .replace(/d/g, '右'),
      );
    }
    return () => {
      if (timeId !== undefined) {
        window.clearInterval(timeId);
      }
    };
  }, []);
  useEffect(() => {
    if (
      serialNumber.every((value, index) => {
        return value === index + 1 || value === 0;
      }) &&
      serialNumber.length !== 0
    ) {
      addGameRecord({
        serialNumber: serialNumber,
        steps: steps,
        useTime: useTime,
        src: src,
        timeStamp: new Date().getTime(),
      });
      myHistory.push('/record');
    }
  }, [serialNumber]);
  return (
    <div className="game">
      <Info useTime={useTime} src={src} stepsNum={steps.length} />
      <GameBase
        serialNumber={serialNumber}
        src={src}
        onSerialNumber={(newValue, stepKey) => {
          if (timeId === undefined) {
            setTimeId(
              window.setInterval(() => {
                setUseTime((value) => value + 1);
              }, 1000),
            );
          }
          setSerialNumber(newValue);
          setSteps((value) => value + stepKey);
        }}
      />
      <div className="button-group">
        {timeId !== undefined ? (
          <Button
            variant="contained"
            color="primary"
            className="start-button"
            onClick={() => {
              window.clearInterval(timeId);
              setSerialNumber(myLocation.state.serialNumber);
              setSteps('');
              setTimeId(undefined);
              setUseTime(0);
            }}
          >
            重新开始
          </Button>
        ) : (
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
        )}
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
