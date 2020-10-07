from ai.image import main_image, image
import os
from typing import List
import time
from ai.util import get_swaps


def read_source_image() -> List[image.MyImage]:
    path = '../source'
    path_list = os.listdir(path)
    source_list: List[image.MyImage] = []
    for i in path_list:
        image_path = f'{path}/{i}'
        with open(image_path, 'rb') as f:
            source_list.append(image.MyImage(f.read()))
    return source_list


def main():
    info_data = main_image.MainImage()
    times = time.time()
    source_list = read_source_image()
    for i in source_list:
        if serial_number := info_data.get_serial_number(i):
            print(serial_number)
            print(get_swaps.get_swaps(serial_number))
    print(time.time() - times)


if __name__ == "__main__":
    main()
