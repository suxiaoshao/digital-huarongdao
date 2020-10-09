from ai.image import main_image, image
import os
from typing import List
from ai.util import get_swaps
import json
import time


def read_source_image() -> List[image.MyImage]:
    path = '../source'
    path_list = os.listdir(path)
    source_list: List[image.MyImage] = []
    for i in path_list:
        image_path = f'{path}/{i}'
        with open(image_path, 'rb') as f:
            source_list.append(image.MyImage(f.read()))
    return source_list


def test():
    info_data = main_image.MainImage()
    source_list = read_source_image()
    serial_number: List[int] = []
    for i in source_list:
        serial_number = info_data.get_serial_number(i)
        if serial_number:
            break
    ai = get_swaps.Ai(serial_number, info_data.swap_step, info_data.swap, info_data.uuid)
    ai.get_steps()
    if not ai.post():
        with open('test.txt', 'a', encoding='utf-8') as f:
            result = {
                "serial_number": serial_number,
                "swap_step": info_data.swap_step,
                "swap": info_data.swap,
                "uuid": info_data.uuid
            }
            f.write(json.dumps(result) + '\n')
        return False
    else:
        return True


def main():
    test_num = 200
    true_num = 0
    for i in range(test_num):
        time.sleep(3)
        if test():
            true_num += 1
        print(f'{true_num} / {i+1}')


if __name__ == "__main__":
    main()
