import requests
import json
from base64 import b64decode
from typing import List
from image import image


class MainImage(image.MyImage):
    def __init__(self):
        res = requests.get('http://47.102.118.1:8089/api/problem?stuid=031802228')
        info_data = json.loads(res.content)
        self.step: int = info_data['step']
        self.swap: List[int] = info_data['swap']
        self.uuid: str = info_data['uuid']
        super(MainImage, self).__init__(b64decode(info_data['img']))
