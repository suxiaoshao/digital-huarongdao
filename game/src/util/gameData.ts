import { GameData, SerialNum } from '../view/game';
import { QueueItem } from './prompt';

export function getRandomItem<T>(list: T[]): T {
  const length = list.length;
  const random = parseInt(String(Math.random() * length));
  return list[random];
}

export function getRandom(start: number, end: number): number {
  return start + parseInt(String(Math.random() * (end + 1 - start)));
}

export function bsf(serialNumber: SerialNum[]): GameData {
  const nowString = serialNumber.map<string>((value) => String(value)).join('');
  const seenStringSet: Set<string> = new Set<string>(nowString);
  const queue: QueueItem[] = [new QueueItem(nowString, '')];
  const resultList: QueueItem[] = [];
  let maxSteps = 0;
  while (queue.length !== 0) {
    const qItem = queue.shift() as QueueItem;
    if (qItem.operations.length === maxSteps) {
      resultList.push(qItem);
    } else if (qItem.operations.length > maxSteps) {
      maxSteps = qItem.operations.length;
    }
    const newItemList = qItem.getNext();
    newItemList.forEach((newItem) => {
      if (!seenStringSet.has(newItem.nowString)) {
        seenStringSet.add(newItem.nowString);
        queue.push(newItem);
      }
    });
  }
  const result = getRandomItem(resultList);
  return {
    serialNumber: result.nowString.split('').map<SerialNum>((value) => <SerialNum>parseInt(value)),
  };
}

export function getGameData(): GameData {
  const serialNumber: SerialNum[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  serialNumber[getRandom(0, 8)] = 0;
  return bsf(serialNumber);
}
