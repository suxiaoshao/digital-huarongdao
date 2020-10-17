from typing import List, Set
from collections import deque
from copy import deepcopy
from util import http_api

allow_swap: List = [
    [-1, 1, 3, -1],
    [-1, 2, 4, 0],
    [-1, -1, 5, 1],
    [0, 4, 6, -1],
    [1, 5, 7, 3],
    [2, -1, 8, 4],
    [3, 7, -1, -1],
    [4, 8, -1, 6],
    [5, -1, -1, 7]
]
allow_dict: List[str] = ['w', 'd', 's', 'a']


def swap_str(source_str: str, index1: int, index2: int) -> str:
    target_str = deepcopy(source_str)
    target_str = target_str[:index1] + source_str[index2] + target_str[index1 + 1:]
    target_str = target_str[:index2] + source_str[index1] + target_str[index2 + 1:]
    return target_str


def is_solution(source_str: str) -> bool:
    num = 0
    test: List[int] = [int(i) for i in source_str]
    test = list(filter(lambda x: x != 0, test))
    for i, v1 in enumerate(test[:-1]):
        for v2 in test[i + 1:]:
            if v2 < v1:
                num += 1
    return True if num % 2 == 0 else False


def get_not_zero_index_list(source_str: str) -> List[int]:
    l: List[int] = []
    for i, j in enumerate(source_str):
        if j != "0":
            l.append(i + 1)
        if len(l) == 2:
            break
    return l


class QueueItem(object):
    def __init__(self, now_str: str, operations: str, swap: List[int]):
        self.now_str: str = now_str
        self.operations: str = operations
        self.swap: List[int] = swap

    def get_next(self) -> List:
        zero_index = self.now_str.find("0")
        new_item_list: List[QueueItem] = []
        for i, other_index in enumerate(allow_swap[zero_index]):
            if other_index != -1:
                now_str = deepcopy(self.now_str)
                now_str = now_str[:zero_index] + now_str[other_index] + now_str[zero_index + 1:]
                now_str = now_str[:other_index] + '0' + now_str[other_index + 1:]
                operations = deepcopy(self.operations)
                operations += allow_dict[i]
                new_item_list.append(QueueItem(now_str, operations, deepcopy(self.swap)))
        return new_item_list


class Ai(object):
    def __init__(self, serial_number: List[int], swap_step: int, swap: List[int], uuid: str):
        self.serial_number: List[int] = serial_number
        self.swap_step: int = swap_step
        self.swap: List[int] = swap
        self.my_swap: List[int] = []
        self.operations: str = ''
        self.uuid: str = uuid

    def get_steps(self):
        self.operations = self.bfs()

    def post(self) -> bool:
        return http_api.post_submit(self.uuid, self.operations, self.my_swap)

    def bfs(self) -> str:
        now_str = ''.join(str(i) for i in self.serial_number)
        target_str = ''.join(str(i) if i in self.serial_number else "0" for i in range(1, 10))
        q = deque()
        q.append(QueueItem(now_str, '', []))
        seen_str: Set[str] = set(now_str)
        while q:
            q_item: QueueItem = q.popleft()
            if q_item.now_str == target_str:
                self.my_swap = q_item.swap
                return q_item.operations
            if self.swap_step == len(q_item.operations):
                q_item.now_str = swap_str(q_item.now_str, self.swap[0] - 1, self.swap[1] - 1)
                if not is_solution(q_item.now_str):
                    if self.swap[1] != self.swap[0] and q_item.now_str[self.swap[0] - 1] != "0" and \
                            q_item.now_str[self.swap[1] - 1] != "0":
                        q_item.swap = deepcopy(self.swap)
                        q_item.now_str = swap_str(q_item.now_str, q_item.swap[0] - 1, q_item.swap[1] - 1)
                    else:
                        q_item.swap = get_not_zero_index_list(q_item.now_str)
                        q_item.now_str = swap_str(q_item.now_str, q_item.swap[0] - 1, q_item.swap[1] - 1)
            new_item_list: List[QueueItem] = q_item.get_next()
            for new_item in new_item_list:
                if new_item.now_str not in seen_str:
                    seen_str.add(new_item.now_str)
                    q.append(new_item)


if __name__ == '__main__':
    print(swap_str("213121", 2, 3))
    print(is_solution('028439751'))
    print(is_solution('357094628'))
    print(get_not_zero_index_list('028439751'))
