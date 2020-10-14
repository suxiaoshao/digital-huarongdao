import { SerialNum } from '../view/game';

export interface GameRecordItem {
  serialNumber: SerialNum[];
  steps: string;
  useTime: number;
  timeStamp: number;
  src: string;
}

export function getGameRecordList(): GameRecordItem[] {
  const data = localStorage.getItem('gameRecord');
  if (data !== null) {
    return JSON.parse(data);
  } else {
    const newData: GameRecordItem[] = [];
    localStorage.setItem('gameRecord', JSON.stringify(newData));
    return [];
  }
}

export function addGameRecord(newItem: GameRecordItem): void {
  const data = localStorage.getItem('gameRecord');
  let newData: GameRecordItem[];
  if (data !== null) {
    const oldDataList: GameRecordItem[] = JSON.parse(data);
    oldDataList.push(newItem);
    newData = [...oldDataList];
    localStorage.setItem('gameRecord', JSON.stringify(oldDataList));
  } else {
    newData = [newItem];
  }
  localStorage.setItem('gameRecord', JSON.stringify(newData));
}

export function clearGameRecord(): void {
  const newData: GameRecordItem[] = [];
  localStorage.setItem('gameRecord', JSON.stringify(newData));
}
