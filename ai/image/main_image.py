from base64 import b64decode
from typing import List
from image import image
import os
from util import http_api


def read_source_image() -> List[image.MyImage]:
    path = './source'
    path_list = os.listdir(path)
    src_list: List[image.MyImage] = []
    for i in path_list:
        image_path = f'{path}/{i}'
        with open(image_path, 'rb') as f:
            src_list.append(image.MyImage(f.read()))
    return src_list


source_list = read_source_image()


class MainImage(image.MyImage):
    def __init__(self, uuid: str):
        res = http_api.post_start(uuid)
        self.swap_step: int = res['data']['step']
        self.swap: List[int] = res['data']['swap']
        self.uuid: str = res['uuid']
        super(MainImage, self).__init__(b64decode(res['data']['img']))
        self.serial_number: List[int] = []
        for i in source_list:
            serial_number = self.get_serial_number(i)
            if serial_number:
                self.serial_number = serial_number

    def get_serial_number(self, other_image: image.MyImage) -> [List[int]]:
        flag_list: List[int] = [0] * len(self.cut_image)
        flag = 0
        for i, self_cuy_image in enumerate(self.cut_image):
            for j, other_cut_image in enumerate(other_image.cut_image):
                if (self_cuy_image == other_cut_image).all():
                    flag_list[i] = j + 1
                    flag += 1
                    break
        return flag_list if flag == len(self.cut_image) - 1 else []
