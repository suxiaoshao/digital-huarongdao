import cv2
import numpy as np
from typing import List


class MyImage(object):
    def __init__(self, img_bytes: bytes):
        self.img_data: np.ndarray = cv2.imdecode(
            np.frombuffer(img_bytes, np.uint8), cv2.IMREAD_COLOR)
        self.cut_image: List[np.ndarray] = []
        self.cut()

    def cut(self):
        h_3: int = int(self.img_data.shape[0] / 3)
        w_3: int = int(self.img_data.shape[1] / 3)

        for h_i in range(3):
            for w_i in range(3):
                self.cut_image.append(
                    self.img_data[h_i * h_3:(h_i + 1) * h_3, w_i * w_3:(w_i + 1) * w_3])

    def draw(self):
        cv2.namedWindow("Image")
        cv2.imshow("Image", self.img_data)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
