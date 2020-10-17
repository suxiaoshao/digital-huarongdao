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
import { ImageMatrix } from '../util/image';
import { RecordDialog, TipDialog } from '../components/myDialog';

export type SerialNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface GameData {
  serialNumber: SerialNum[];
}

export default function Game(): JSX.Element {
  // 原始图片
  const [src] = useState<string>(getRandomItem(imageList));
  // 记录的步数
  const [steps, setSteps] = useState<string>('');
  // 当前情况
  const [serialNumber, setSerialNumber] = useState<SerialNum[]>([]);
  // 用时
  const [useTime, setUseTime] = useState<number>(0);
  // 是否记录用时
  const [timeId, setTimeId] = useState<number | undefined>(undefined);
  // 被挖空的图片
  const [emptySrc, setEmptySrc] = useState<string>('');
  // tip dialog是否打开
  const [tipOpen, setTipOpen] = useState<boolean>(false);
  // record dialog 是否打开
  const [recordOpen, setRecordOpen] = useState<boolean>(false);
  // 路由数据
  const myLocation = useLocation<GameData>();
  // 路由控制器
  const myHistory = useHistory();

  //进入跳转
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
        setTimeId(undefined);
      }
    };
  }, []);

  // 获取挖空图片
  useEffect(() => {
    if (myLocation.state !== undefined) {
      (async () => {
        const image = new ImageMatrix(src);
        await image.loadImage();
        setEmptySrc(await image.getImageEmpty(myLocation.state.serialNumber));
      })();
    }
    return () => {
      URL.revokeObjectURL(emptySrc);
    };
  }, [src]);

  // 用户成功
  useEffect(() => {
    if (
      serialNumber.every((value, index) => {
        return value === index + 1 || value === 0;
      }) &&
      serialNumber.length !== 0
    ) {
      if (timeId !== undefined) {
        window.clearInterval(timeId);
        setTimeId(undefined);
      }
      addGameRecord({
        serialNumber: myLocation.state.serialNumber,
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
      <TipDialog
        serialNumber={serialNumber}
        src={src}
        open={tipOpen}
        onClose={() => {
          setTipOpen(false);
        }}
      />
      <RecordDialog
        open={recordOpen}
        onClose={() => {
          setRecordOpen(false);
        }}
      />
      <Info useTime={useTime} src={emptySrc} stepsNum={steps.length} />
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
              setRecordOpen(true);
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
            setTipOpen(true);
          }}
        >
          更多操作
        </Button>
      </div>
    </div>
  );
}
