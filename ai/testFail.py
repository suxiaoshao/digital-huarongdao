import json
from typing import List, Dict
from ai.util import get_swaps


def test(serial_number: List[int], swap_step: int, swap: List[int], operations: str, my_swap: List[int]):
    pass


def main():
    fail_list: List[Dict] = []
    with open('test.txt', 'r', encoding='utf-8') as f:
        while f.readline():
            fail_list.append(json.loads(f.readline()))
    # for fail in fail_list:
    #     ai = get_swaps.Ai(fail['serial_number'], fail['swap_step'], fail['swap'], fail['uuid'])
    #     ai.get_steps()
    #     print(ai.operations, ai.is_solution, ai.my_swap)
    fail = fail_list[0]
    ai = get_swaps.Ai(fail['serial_number'], fail['swap_step'], fail['swap'], fail['uuid'])
    ai.get_steps()
    print(ai.operations, ai.is_solution, ai.my_swap, fail)


if __name__ == '__main__':
    main()
