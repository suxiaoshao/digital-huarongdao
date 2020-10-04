import cv2
import numpy as np
from typing import List


# 平均哈希算法计算
def classify_a_hash(image1: np.ndarray, image2: np.ndarray) -> int:
    image1: np.ndarray = cv2.resize(image1, (8, 8))
    image2: np.ndarray = cv2.resize(image2, (8, 8))
    gray1: np.ndarray = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
    gray2: np.ndarray = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)
    hash1 = get_hash(gray1)
    hash2 = get_hash(gray2)
    return hamming_distance(hash1, hash2)


# 输入灰度图，返回hash
def get_hash(image: np.ndarray) -> List[int]:
    average = np.mean(image)
    my_hash: List[int] = []
    for i in range(image.shape[0]):
        for j in range(image.shape[1]):
            if image[i, j] > average:
                my_hash.append(1)
            else:
                my_hash.append(0)
    return my_hash


# 计算汉明距离
def hamming_distance(hash1: List[int], hash2: List[int]) -> int:
    num = 0
    for index in range(len(hash1)):
        if hash1[index] != hash2[index]:
            num += 1
    return num
