from typing import List, Set, Union
from collections import deque
from copy import deepcopy
import requests

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


class QueueItem(object):
    def __init__(self, now_str: str, swaps: str):
        self.now_str: str = now_str
        self.swaps: str = swaps

    def get_next(self) -> List:
        zero_index = self.now_str.find("0")
        new_item_list: List[QueueItem] = []
        for i, other_index in enumerate(allow_swap[zero_index]):
            if other_index != -1:
                now_str = deepcopy(self.now_str)
                now_str = now_str[:zero_index] + now_str[other_index] + now_str[zero_index + 1:]
                now_str = now_str[:other_index] + '0' + now_str[other_index + 1:]
                swaps = deepcopy(self.swaps)
                swaps += allow_dict[i]
                new_item_list.append(QueueItem(now_str, swaps))
        return new_item_list


def bfs(serial_number: List[int], swap_step: Union[None, int] = None, swap: Union[None, List[int]] = None) -> str:
    now_str = ''.join(str(i) for i in serial_number)
    target_str = ''.join(str(i) if i in serial_number else "0" for i in range(1, 10))
    q = deque()
    q.append(QueueItem(now_str, ''))
    seen_str: Set[str] = set(now_str)
    while q:
        q_item: QueueItem = q.popleft()
        if q_item.now_str == target_str:
            return q_item.swaps
        if swap_step is not None and swap_step == len(q_item.swaps):
            q_item_now_str = deepcopy(q_item.now_str)
            q_item_now_str = q_item_now_str[:swap[0] - 1] + q_item.now_str[swap[1] - 1] + q_item_now_str[swap[0]:]
            q_item_now_str = q_item_now_str[:swap[1] - 1] + q_item.now_str[swap[0] - 1] + q_item_now_str[swap[1]:]
            q_item.now_str = q_item_now_str
        new_item_list: List[QueueItem] = q_item.get_next()
        for new_item in new_item_list:
            if new_item.now_str not in seen_str:
                seen_str.add(new_item.now_str)
                q.append(new_item)


class Ai(object):
    def __init__(self, serial_number: List[int], swap_step: int, swap: List[int], uuid: str):
        self.serial_number: List[int] = serial_number
        self.swap_step: int = swap_step
        self.swap: List[int] = swap
        self.my_swap: List[int] = []
        self.operations: str = ''
        # 获取是否有解
        num: int = 0
        test = deepcopy(serial_number)
        test = list(filter(lambda x: x != 0, test))
        for i, v1 in enumerate(test[:-1]):
            for v2 in test[i + 1:]:
                if v2 < v1:
                    num += 1
        self.is_solution: bool = True if num % 2 == 0 else False
        self.uuid: str = uuid

    def get_steps(self):
        if self.is_solution:
            self.my_swap = [i for i in self.swap]
            self.my_swap.reverse()
            self.operations = bfs(self.serial_number)
        else:
            if self.swap[0]==self.swap[1]:
                self.my_swap=[1,2]
                self.operations = bfs(self.serial_number, self.swap_step, self.my_swap)
            else:
                self.operations = bfs(self.serial_number, self.swap_step, self.swap)

    def post(self) -> bool:
        if self.is_solution:
            result = {
                "uuid": self.uuid,
                "answer": {
                    "operations": self.operations,
                    "swap": self.my_swap
                }
            }
        else:
            result = {
                "uuid": self.uuid,
                "answer": {
                    "operations": self.operations,
                    "swap": []
                }
            }
        res = requests.post('http://47.102.118.1:8089/api/answer', json=result)
        try:
            result = res.json()['score']
        except:
            result = False
        if not result:
            print(res.content)
        return result
