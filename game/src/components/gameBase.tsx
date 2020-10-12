import React, { useEffect, useMemo, useState } from 'react';
import '../style/game/gameBase.scss';
import { ImageMatrix } from '../util/image';
import { allowDict, allowSwap } from '../util/prompt';
import { ButtonBase } from '@material-ui/core';

interface GameBaseProps {
  src: string;
  serialNumber: number[];
  onSerialNumber: (newValue: number[], stepKey: string) => void;
}

export default function GameBase(props: GameBaseProps): JSX.Element {
  const [imageList, setImageList] = useState<string[]>([]);
  const zeroIndex = useMemo<number>(() => props.serialNumber.indexOf(0), [props.serialNumber]);
  useEffect(() => {
    (async () => {
      const a = new ImageMatrix(props.src);
      await a.loadImage();
      setImageList(await a.getImageList());
    })();
  }, [props.src]);
  return (
    <div className="game-base">
      {props.serialNumber.map((value, index) =>
        value - 1 >= 0 ? (
          allowSwap[zeroIndex].includes(index) ? (
            <ButtonBase
              key={value}
              className="item"
              onClick={() => {
                const newValue = [...props.serialNumber];
                newValue[zeroIndex] = value;
                newValue[index] = 0;
                const stepKey = allowDict[allowSwap[zeroIndex].indexOf(index)];
                props.onSerialNumber(newValue, stepKey);
              }}
            >
              <img src={imageList[value - 1]} alt="aaa" />
            </ButtonBase>
          ) : (
            <img key={value} src={imageList[value - 1]} alt="aaa" />
          )
        ) : (
          <div key={value} />
        ),
      )}
    </div>
  );
}
