export const allowSwap: number[][] = [
  [-1, 1, 3, -1],
  [-1, 2, 4, 0],
  [-1, -1, 5, 1],
  [0, 4, 6, -1],
  [1, 5, 7, 3],
  [2, -1, 8, 4],
  [3, 7, -1, -1],
  [4, 8, -1, 6],
  [5, -1, -1, 7],
];
export const allowDict: string[] = ['w', 'd', 's', 'a'];

export class QueueItem {
  nowString: string;
  operations: string;
  zeroIndex: number;

  constructor(now_string: string, steps: string) {
    this.nowString = now_string;
    this.operations = steps;
    this.zeroIndex = now_string.indexOf('0');
  }

  public getNext(): QueueItem[] {
    const newItemList: QueueItem[] = [];
    allowSwap[this.zeroIndex].forEach((otherIndex, value) => {
      if (otherIndex !== -1) {
        let nowString = this.nowString;
        nowString = nowString.slice(0, this.zeroIndex) + nowString[otherIndex] + nowString.slice(this.zeroIndex + 1);
        nowString = nowString.slice(0, otherIndex) + '0' + nowString.slice(otherIndex + 1);
        const swaps = this.operations + allowDict[value];
        newItemList.push(new QueueItem(nowString, swaps));
      }
    });
    return newItemList;
  }
}

export function getSteps(serialNumber: number[]): string | undefined {
  const nowString = serialNumber.join('');
  const targetString = new Array<number>(9)
    .fill(0)
    .map((value, index) => {
      return serialNumber.includes(index + 1) ? index + 1 : 0;
    })
    .join('');
  const q: QueueItem[] = [new QueueItem(nowString, '')];
  const seenStringSet = new Set<string>();
  seenStringSet.add(nowString);
  while (q.length !== 0) {
    const qItem = q.shift() as QueueItem;
    if (qItem.nowString === targetString) {
      return qItem.operations;
    }
    const newItemList = qItem.getNext();
    newItemList.forEach((newItem) => {
      if (!seenStringSet.has(newItem.nowString)) {
        seenStringSet.add(newItem.nowString);
        q.push(newItem);
      }
    });
  }
  return undefined;
}
