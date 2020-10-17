## 概述

![build](https://img.shields.io/badge/build-passing-brightgreen)
![react](https://img.shields.io/badge/reacr-16.13.1-61DAFB)
![python](https://img.shields.io/badge/puython-3.8.6-EFBF67)

这是一个电子华容道项目,包括 ai ,game 两个部分.

ai 部分是用来计算华容道算法, game 部分是设计的前端(h5) 华容道游戏.

ai 部分使用了 python3.8.6 opencv-python:图像处理
 numpy:图像处理 requests:网络请求
 
game 部分使用了 react material-ui 处理页面

## ai 部分使用

安装 python3 并配置好环境变量

进入 ai 目录 在命令行下

```bash
pip install -r requirements.txt
```

可以在 ai/util/http_api.py 文件中修改 token

安装完成后,在根目录下运行以下命令出题

```bash
python ./ai/draw.py
```

在根目录下运行以下命令可以从 <http://47.102.118.1:8089/api/team/problem/27> 接口获取题目,然后解题提交

```bash
python ./ai/answerQuestions.py
```

## game 部分使用

安装 node12 并配置好环境变量

全局安装 yarn

```bash
npm install -g yarn
```

进入 game 目录,输入以下命令

```bash
yarn
```

```bash
yarn serve
```

即可在浏览器打开 <http://localhost:8083/> 并调试

打包

```bash
yarn build
```

打包后文件在 game/build 目录下
