from ai.util import http_api, get_swaps
from ai.image import main_image
import json


def main():
    not_answer_list = http_api.get_not_answer_list()
    print(not_answer_list)
    success_num = 0
    for i in not_answer_list:
        image = main_image.MainImage(i['uuid'])
        ai = get_swaps.Ai(image.serial_number, image.swap_step, image.swap, image.uuid)
        ai.get_steps()
        print(ai.operations, ai.my_swap)
        if not ai.post():
            with open('test.txt', 'a', encoding='utf-8') as f:
                data = {
                    'serial_number': ai.serial_number,
                    'uuid': ai.uuid,
                    'step': ai.swap_step,
                    'swap': ai.swap
                }
                f.write(json.dumps(data) + '\n')
        else:
            success_num += 1
            print(success_num, len(not_answer_list))


if __name__ == '__main__':
    main()
