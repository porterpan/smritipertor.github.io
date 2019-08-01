---
title: 古诗词验证码使用百度api自动识别
categories:
    爬虫
tags: [验证码,古诗词识别]
date: 2019-7-21 17:33:03
---

# 摘要

本文主要介绍，通过百度的文本识别api，实现爬虫登录中的古诗词验证码自动识别功能。不涉及具体的图像识别代码，本文识别图像中的文本直接通过百度图像本文识别api实现。

本文将围绕这几步展开

- [x] 百度文本识别的api创建
- [x] 百度文本识别api调用接口介绍
- [x] 百度古诗词查询的接口介绍
- [x] python爬虫web页面数据清洗
- [x] 基于百度api的古诗词完整代码


- [x] Edit By Porter, 积水成渊,蛟龙生焉。

<!-- more -->

## 百度文本识别的api创建

创建步骤为：

- 进入[百度AI](http://ai.baidu.com/)，右上角点击控制台选择登录

- 在你的控制台中点击左边栏的文字识别，如下图

![百度文字识别](https://s2.ax1x.com/2019/08/01/eUZLE8.png)

- 进入文字识别后，选择创建应用，如下图

![创建文字识别应用](https://s2.ax1x.com/2019/08/01/eUeZ8J.png)

- 随便填写下，由于我们使用的爬虫可以不用文字识别包，这都不重要了，随便填。

- ok应用创建成功

我们会用到三个应用接口参数[AppID, API Key, Secret Key]，如下图所示

![创建成功的应用](https://s2.ax1x.com/2019/08/01/eUeart.png)

我们接下来进行api调用


## 百度文本识别api调用接口介绍

### 第一步、安装百度文本识别接口的python轮子

```python
pip install baidu-aip
```

> 请注意本文是在python3版本下实现的，如果你默认是python2 请用pip3 install baidu-aip 替代上面的命令

### 第二步、新建AipOcr 对象

```python
from aip import AipOcr

""" 你的 APPID AK SK """
APP_ID = '你的 App ID'
API_KEY = '你的 Api Key'
SECRET_KEY = '你的 Secret Key'

client = AipOcr(APP_ID, API_KEY, SECRET_KEY)

```

### 第三步、获取验证码图像

```python
# -*- coding: utf-8 -*-
import requests
import http.cookiejar as cookielib
from PIL import Image

headers = {
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Cookie': 'ASP.NET_SessionId=jwe1ekgshmlwzy2forzsubsd',
        'Host': 'mm.buy.com.cn',
        'Referer': 'http://buy.mm.com.cn/mimi/zhaozhao/neiyi/Default.aspx',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
    }
captcha_url = 'http://buy.mm.com.cn/mimi/zhaozhao/neiyi/image.aspx?'
# captcha_url = "http://buy.mm.com.cn/mimi/zhaozhao/neiyi/image.aspx"
response = session.get(captcha_url, headers=headers, timeout=0.1)
# session.cookies.save()



# response = session.get(url)
image = Image.open(BytesIO(response.content))
image.save('./verify.jpg')
image = get_file_content('verify.jpg')
```

### 第三步、利用创建的AipOcr对象对图片进行识别

```python
""" 如果有可选参数 """
options = {}
options["detect_direction"] = "true"
options["probability"] = "true"
try:
    """ 带参数调用通用文字识别（高精度版） """
    Accuratemessage = client.basicAccurate(image, options)

    words = Accuratemessage['words_result'][0]['words']

    print("shuchu:", type(words), words)

    verify_result = verify_result_flow_baidugushici(words)# 自定义数据清洗函数
    print(verify_result)
    return verify_result
except:
    print(Accuratemessage)
    return '错'
```

> verify_result_flow_baidugushici(words)# 这是我数据清洗的函数，在完整代码中有贴出

### 第四步、对AipOcr识别的结果数据进行清洗

这部分直接贴代码，都叫不上清洗，不再重述。

```python
Accuratemessage = client.basicAccurate(image, options)
words = Accuratemessage['words_result'][0]['words']
```

这个返回的words就是我们识别的结果的古诗词词组。


## 百度古诗词查询的接口介绍

接下来我们需要进行古诗词匹配，古诗词匹配作者采用的是[百度汉语接口](https://hanyu.baidu.com/)

为什么使用这个可以把古诗词验证码中缺失的汉字匹配出来，客官请看图

在[百度汉语搜索框中](https://hanyu.baidu.com/)输入 **故西辞黄鹤楼** ，这里我们缺失汉字人，所以我们先检索截图，如下图：

![故人西辞黄鹤楼](https://s2.ax1x.com/2019/08/01/eUMtBR.png)

**<mark style=background-color:yellow><font color=red size=4 face=雅黑>请注意图中箭头所示<font></mark>**

看到了那个缺失的汉字**人**了吧

## python爬虫web页面数据清洗

这部分应该是清洗了，我们用的BeautifulSoup来清洗数据。

代码如下


```python
import re
from bs4 import BeautifulSoup
def verify_result_flow_baidugushici(inputpare = '故西辞黄鹤楼'):
    '''

    :param inputpare: 输入古诗词除了缺失待验证的汉字外的其他汉字词组
    :return:返回这句古诗词中确实待验证的验证汉字
    '''
    # 返回结果的数据
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Cookie': 'BAIDUID=3962E06AB8A904AC40FD84F3E2A70D90:FG=1; BIDUPSID=3962E06AB8A904AC40FD84F3E2A70D90; PSTM=1562918639; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; Hm_lvt_010e9ef9290225e88b64ebf20166c8c4=1563587125; BDUSS=p-LTh2WUpIbGJtVzR4TXJpemVVOFBUQTJTTzl5TW1wNXFMN2tvaHcwd1dVVnBkSUFBQUFBJCQAAAAAAAAAAAEAAADbXiAjcGFuY2hhb3BhbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABbEMl0WxDJdQW; H_PS_PSSID=1434_21120_29523_29520_28518_29098_28832_29221_26350_29458; Hm_lpvt_010e9ef9290225e88b64ebf20166c8c4=1563609689',
        'Host': 'hanyu.baidu.com',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
    }
    url = 'https://hanyu.baidu.com/s?wd='+ inputpare +'&from=poem'
    s = requests.Session()
    # 不需要验证码直接登录成功
    response_page = s.get(url, headers=headers)
    response_page.encoding = response_page.apparent_encoding

    soup = BeautifulSoup(response_page.text, features='html.parser')
    # print(soup)
    try:
        try:
            soup_obj = soup.find("div", class_=u"poem-list-item-body check-red").text
        except:
            soup_obj = soup.find("div", class_=u"poem-detail-item-content").text
            print(soup_obj)
    except:
        soup_obj=""
    # soup_obj = soup.find_all(name="div", attrs={"class" : "poem-list-item-body"}).text
    print(type(soup_obj), "输出的字符串为:", soup_obj.strip())


    dealords = re.split(r'[， 。]', soup_obj.replace('.', '').strip().lstrip('，').rstrip('。'))
    print(dealords)
    similarnumber = 0
    comparetext = ''
    outputtext = ''
    for i in range(0, len(dealords)):
        for x in dealords[i]:
            if x in inputpare:
                similarnumber += 1
        if similarnumber >= 3:
            comparetext = dealords[i]
            print(len(comparetext), comparetext)
            break

    for i in range(0, len(comparetext)):
        for x in comparetext[i]:
            if x in inputpare:
                similarnumber = 0
            else:
                outputtext=x
                # print(x)
    return outputtext
```


这部分应该也是网页清洗的步骤，虽然代码多点，但是也不是很难理解，暂时先这样贴出来，忘记了，在评论区留言

> 评论区，采用的[DISQUS](https://disqus.com/)留言系统，需要翻墙才能展示流言板块，靠缘分了。


----

到此古诗词验证码的自动识别过程已经带概记录了下，接下来直接贴完整python3的代码，qt5的GUI就不贴了

## 基于百度api的古诗词完整代码

```python
# -*- coding: utf-8 -*-
import requests
import http.cookiejar as cookielib

import urllib

import time
import re
from bs4 import BeautifulSoup

from aip import AipOcr
# import requests
from PIL import Image
from io import BytesIO

session = requests.Session()
# session.cookies = cookielib.LWPCookieJar(filename='cookies')
session.cookies = cookielib.LWPCookieJar(filename="cookies.txt")

def verify_result_flow_baidugushici(inputpare = '故西辞黄鹤楼'):
    '''

    :param inputpare: 输入古诗词除了缺失待验证的汉字外的其他汉字词组
    :return:返回这句古诗词中确实待验证的验证汉字
    '''
    # 返回结果的数据
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Cookie': 'BAIDUID=3962E06AB8A904AC40FD84F3E2A70D90:FG=1; BIDUPSID=3962E06AB8A904AC40FD84F3E2A70D90; PSTM=1562918639; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; Hm_lvt_010e9ef9290225e88b64ebf20166c8c4=1563587125; BDUSS=p-LTh2WUpIbGJtVzR4TXJpemVVOFBUQTJTTzl5TW1wNXFMN2tvaHcwd1dVVnBkSUFBQUFBJCQAAAAAAAAAAAEAAADbXiAjcGFuY2hhb3BhbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABbEMl0WxDJdQW; H_PS_PSSID=1434_21120_29523_29520_28518_29098_28832_29221_26350_29458; Hm_lpvt_010e9ef9290225e88b64ebf20166c8c4=1563609689',
        'Host': 'hanyu.baidu.com',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
    }
    url = 'https://hanyu.baidu.com/s?wd='+ inputpare +'&from=poem'
    s = requests.Session()
    # 不需要验证码直接登录成功
    response_page = s.get(url, headers=headers)
    response_page.encoding = response_page.apparent_encoding

    soup = BeautifulSoup(response_page.text, features='html.parser')
    # print(soup)
    try:
        try:
            soup_obj = soup.find("div", class_=u"poem-list-item-body check-red").text
        except:
            soup_obj = soup.find("div", class_=u"poem-detail-item-content").text
            print(soup_obj)
    except:
        soup_obj=""
    # soup_obj = soup.find_all(name="div", attrs={"class" : "poem-list-item-body"}).text
    print(type(soup_obj), "输出的字符串为:", soup_obj.strip())


    dealords = re.split(r'[， 。]', soup_obj.replace('.', '').strip().lstrip('，').rstrip('。'))
    print(dealords)
    similarnumber = 0
    comparetext = ''
    outputtext = ''
    for i in range(0, len(dealords)):
        for x in dealords[i]:
            if x in inputpare:
                similarnumber += 1
        if similarnumber >= 3:
            comparetext = dealords[i]
            print(len(comparetext), comparetext)
            break

    for i in range(0, len(comparetext)):
        for x in comparetext[i]:
            if x in inputpare:
                similarnumber = 0
            else:
                outputtext=x
                # print(x)
    return outputtext


def get_file_content(filePath):
    '''
    从本地读取古诗词验证码的待识别文字的图片
        :param inputpare: 本地验证码图片的保留位置
        :return:返回从本地读取的图片
    '''
    with open(filePath, 'rb') as fp:
        return fp.read()

def verify_by_gushici():
    '''

    :return: 返回验证码中缺少的古诗词中的那个文字
    '''
    """ 你的 APPID AK SK """
    APP_ID = '16xxxx43'
    API_KEY = 'IFeIxxxxxxEl'
    SECRET_KEY = 'S0OPhLxxxxxxxxwX'

    client = AipOcr(APP_ID, API_KEY, SECRET_KEY)

    headers = {
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Cookie': 'ASP.NET_SessionId=jwe1ekgshmlwzy2forzsubsd',
        'Host': 'buy.mm.com.cn',# 这个主机地址我已经影藏掉了，请自己配置
        'Referer': 'http://buy.mm.com.cn/mimi/zhaozhao/neiyi/Default.aspx',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
    }
    captcha_url = 'http://buy.mm.com.cn/mimi/zhaozhao/neiyi/image.aspx?'
    # captcha_url = "http://buy.mm.com.cn/mimi/zhaozhao/neiyi/image.aspx"
    response = session.get(captcha_url, headers=headers, timeout=0.1)
    # session.cookies.save()



    # response = session.get(url)
    image = Image.open(BytesIO(response.content))
    image.save('./verify.jpg')
    image = get_file_content('verify.jpg')

    """ 如果有可选参数 """
    options = {}
    options["detect_direction"] = "true"
    options["probability"] = "true"
    try:
        """ 带参数调用通用文字识别（高精度版） """
        Accuratemessage = client.basicAccurate(image, options)

        words = Accuratemessage['words_result'][0]['words']

        print("shuchu:", type(words), words)

        verify_result = verify_result_flow_baidugushici(words)
        print(verify_result)
        return verify_result
    except:
        print(Accuratemessage)
        return '错'

def log_out():
    session.cookies.clear()
    print("login out")

def moni_login():
    '''
    模拟客户端登录操作
    :return:none
    '''
    headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Content-Length': '56',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'ASP.NET_SessionId=jwe1ekgshmlwzy2forzsubsd',
        'Host': 'buy.mm.com.cn',
        'Origin': 'buy.mm.com.cn',
        'Referer': 'http://buy.mm.com.cn/mimi/zhaozhao/neiyi/Default.aspx',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }
    log_out()
    url = 'http://buy.mm.com.cn/mimi/zhaozhao/neiyi/login.aspx'
    code = verify_by_gushici()
    print(code)
    # code = '123'
    # String2 = input("Enter The Value of String2:")
    form = {
        'id': '2035229347',
        'pwd': 'dddddd2035229347',
        'number': code,
        'act': 'dlogin'
    }

    # form = urllib.parse.urlencode(form)
    print(type(code), "su:", form)
    # time.sleep(2)

    # 不需要验证码直接登录成功
    login_page = session.post(url, data=form, headers=headers, timeout=0.5)
    context = login_page.content.decode('utf-8')
    # 保存 cookies 到文件，
    # 下次可以使用 cookie 直接登录，不需要输入账号和密码
    session.cookies.save()
    print(context)

def shoudongxuanzuo():
    headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Cookie': 'ASP.NET_SessionId=xjen3olvq5lbydin0rgjafqr',
        'Host': 'buy.mm.com.cn',
        'Referer': 'http://buy.mm.com.cn/mimi/zhaozhao/neiyi/Default.aspx',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }

    content = {
        'dialogid': '',
        'type': 'ts',
        'prop': ''
    }

    url = "http://buy.mm.com.cn/mimi/zhaozhao/neiyi/reserve.aspx?"
    url_code1 = verify_by_gushici()


    print("xuanzdebug:\n%s" % url)

    # choise_seat = session.get(url, json=content, headers=headers, timeout=0.1)
    # cookies = dict(cookies_are='working')
    try:
        session.cookies.load(ignore_discard=True)
        print("Cookie正常加载")
    except:
        print("Cookie未能加载")
    choise_seat = session.get(url, params=content, headers=headers, timeout=0.5)
    # session.cookies.save()
    context = choise_seat.content.decode('utf-8')
    print(context)



if __name__ == '__main__':
    # outresult = verify_result_flow_baidugushici('轻罗小扇扑萤')在尔东西北风
    # print("output:",outresult)

    # 图像文字识别结果
    # verify_result = verify_by_gushici()
    # print("verify reslt:",verify_result)

    moni_login()# 带自动识别古诗词验证码的模拟登录函数
    shoudongxuanzuo() # 登录后的操作，这个函数可以省略，内容我也削了
```


