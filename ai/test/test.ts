import { getSwaps } from '../lib';

const time = new Date().getTime();

const data = getSwaps([5, 9, 1, 8, 3, 2, 4, 6, 0]);
if (data !== false) {
  console.log('答案是: ', data);
} else {
  console.log('无解');
}
console.log(new Date().getTime() - time);
