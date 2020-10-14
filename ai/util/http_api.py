import requests
from typing import List


def get_list():
    url = 'http://47.102.118.1:8089//api/challenge/list'
    r = requests.get(url)
    l = []
    for i in r.json():
        l.append(i['uuid'])
    return l


def post_create(letter: str, exclude: int, challenge: List[List[int]], step: int, swap: List[int]):
    url = 'http://47.102.118.1:8089/api/challenge/create'
    data = {
        "teamid": 27,
        "data": {
            "letter": letter,  # letter表示赛题的对应字母
            "exclude": exclude,  # exclude表示当前哪个位置的图片被删去作为空格
            "challenge": challenge,
            "step": step,  # step为强制交换的步数
            "swap": swap  # swap为强制交换的图片（从左到右从上到下编号1-9）
        },
        "token": "e18ed0b5-818a-43ec-9042-22abb5622840"
    }
    res = requests.post(url, json=data)
    print(res.json())


def post_start(uuid) -> dict:
    url = 'http://47.102.118.1:8089/api/challenge/start/'
    url = url + uuid
    data = {
        "teamid": 27,
        "token": "e18ed0b5-818a-43ec-9042-22abb5622840"
    }

    res = requests.post(url, json=data)
    if 'success' in res.json() and res.json()["success"]:  # 如果访问成功 将信息存到字典返回
        data_start = {
            "data": res.json()["data"],
            "uuid": res.json()["uuid"]
        }
        return data_start
    else:
        return {}


# 接口描述：提交赛题答案的接口
# 解释说明，请求接口时必须要这个队伍先访问/start开启了赛题挑战，获取该次挑战的uuid，才能允许访问/submit提交接口；
# 当你提交的答案未通过时，返回的字段success为false
def post_submit(start_uuid, operations, swap) -> bool:
    url = 'http://47.102.118.1:8089/api/challenge/submit'
    data = {
        "uuid": start_uuid,
        "teamid": 27,
        "token": "e18ed0b5-818a-43ec-9042-22abb5622840",
        "answer": {
            "operations": operations,
            "swap": swap
        }
    }
    res = requests.post(url, json=data)
    return res.json()['success']


# 接口描述：获取还未通过的题目，展示当前队伍还未挑战或通过的题目（今天之内创建的题目，不包含你自己出的以及你已经通过的题目）。
# 字段含义可参考上面的接口说明。当前没有纪录时返回为[]。
def get_not_answer_list() -> List:
    url = 'http://47.102.118.1:8089/api/team/problem/27'
    r = requests.get(url)
    return r.json()


if __name__ == '__main__':
    # uuid_list = get_list()
    # post_create("a", 5, [
    #     [1, 2, 3],
    #     [0, 4, 6],
    #     [7, 8, 9]
    # ], 20, [1, 2])
    # start_uuid = post_start(uuid_list[2])
    # post_submit(start_uuid, "d", [])
    get_not_answer_list()
