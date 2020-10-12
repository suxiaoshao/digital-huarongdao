import { SerialNum } from '../view/game';

export interface GameRecordItem {
  serialNumber: SerialNum[];
  steps: string;
  useTime: number;
}

export interface GameRecord {
  data: GameRecordItem[];
}

export function getGameRecordList(): GameRecordItem[] {
  const data = localStorage.getItem('gameRecord');
  if (data !== null) {
    return JSON.parse(data)['data'];
  } else {
    const newData: GameRecord = {
      data: [],
    };
    localStorage.setItem('gameRecord', JSON.stringify(newData));
    return [];
  }
}

export function addGameRecord(newItem: GameRecordItem): void {
  const data = localStorage.getItem('gameRecord');
  if (data !== null) {
    const oldData: GameRecordItem[] = JSON.parse(data)['data'];
    oldData.push(newItem);
    localStorage.setItem('gameRecord', JSON.stringify(oldData));
  } else {
    const newData: GameRecord = {
      data: [newItem],
    };
    localStorage.setItem('gameRecord', JSON.stringify(newData));
  }
}

export function clearGameRecord(): void {
  const newData: GameRecord = {
    data: [],
  };
  localStorage.setItem('gameRecord', JSON.stringify(newData));
}
