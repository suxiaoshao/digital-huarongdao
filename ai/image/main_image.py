import requests
import json
from base64 import b64decode
from typing import List
from ai.image import image


class MainImage(image.MyImage):
    def __init__(self):
        res = requests.get('http://47.102.118.1:8089/api/problem?stuid=031802228')
        info_data = json.loads(res.content)
        self.swap_step: int = info_data['step']
        self.swap: List[int] = info_data['swap']
        self.uuid: str = info_data['uuid']
        super(MainImage, self).__init__(b64decode(info_data['img']))

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
