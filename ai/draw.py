import random
from ai.util import get_swaps, http_api
from collections import deque
from typing import Deque, Set, List


class CreatQuestion(object):
    def __init__(self):
        self.exclude: int = random.randint(1, 9)
        self.letter: str = random.choice(
            ['A', 'a', 'B', 'b', 'c', 'd', 'D', 'e', 'g', 'h', 'H', 'j', 'k', 'm', 'M', 'n', 'o', 'O', 'p', 'P', 'q',
             'Q', 'r', 's', 't', 'u', 'U', 'v', 'W', 'x', 'X', 'Y', 'y', 'Z', 'z'])
        self.challenge: List[List[int]] = []
        self.step: int = random.randint(0, 20)
        self.swap: List[int] = [random.randint(1, 9), random.randint(1, 9)]
        self.bfs()

    def bfs(self):
        self.exclude = random.randint(1, 9)
        now_string = ''.join([str(i + 1 if i + 1 != self.exclude else 0) for i in range(9)])
        seen_string: Set[str] = set()
        seen_string.add(now_string)
        queue: Deque[get_swaps.QueueItem] = deque()
        queue.append(get_swaps.QueueItem(now_string, '', [1, 2]))
        request_list: List[get_swaps.QueueItem] = []
        max_path = 0
        while len(queue) != 0:
            q_item = queue.popleft()
            if len(q_item.operations) == max_path:
                request_list.append(q_item)
            elif len(q_item.operations) > max_path:
                max_path = len(q_item.operations)
                request_list = [q_item]
            new_item_list: List[get_swaps.QueueItem] = q_item.get_next()
            for new_item in new_item_list:
                if new_item.now_str not in seen_string:
                    seen_string.add(new_item.now_str)
                    queue.append(new_item)
        result = random.choice(request_list)
        result = [int(i) for i in list(result.now_str)]
        if random.randint(1, 2) == 1:
            swap1 = random.randint(0, 8)
            swap2 = random.randint(0, 8)
            result[swap1], result[swap2] = result[swap2], result[swap1]
        self.challenge = []
        for i in range(3):
            ls = []
            for j in range(3):
                ls.append(result[i * 3 + j])
            self.challenge.append(ls)

    def post(self):
        res = http_api.post_create(self.letter, self.exclude, self.challenge, self.step, self.swap)
        print(res)


def main():
    a = CreatQuestion()
    print(a.exclude, a.challenge, a.letter, a.swap, a.step)
    a.post()


if __name__ == '__main__':
    main()
