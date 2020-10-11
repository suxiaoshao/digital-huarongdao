import React, { useEffect, useState } from 'react';
import '../style/game/gameBase.scss';
import { ImageMatrix } from '../util/image';

interface GameBaseProps {
  src: string;
  serialNumber: number[];
}

export default function GameBase(props: GameBaseProps): JSX.Element {
  const [imageList, setImageList] = useState<string[]>([]);
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
        value - 1 >= 0 ? <img key={index} src={imageList[value - 1]} alt="aaa" /> : <div key={index} />,
      )}
    </div>
  );
}
