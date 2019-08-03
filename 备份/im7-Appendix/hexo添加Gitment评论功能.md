---
title: hexo添加Gitment评论功能
urlname: hexoFitment
categories:
    hexo
tags: [评论插件,Gitment]
date: 2019-7-28 22:55:07
---

# 摘要

* Socket 套接字的概念
* Socket 函数功能
* MFC 介绍
* TCP 变成步骤
* TCP 上位机实现

<!-- more -->

提示未初始化

```bash
Error: Comments Not Initialized
```

解决办法：
直接登录你的github,进入存放评论的仓库，选择Issue菜单，新建一条评论即可，如下图

![Not Initialized](https://s2.ax1x.com/2019/08/01/edSmuD.png)

github 网页的OAuth的配置如下图

![OAuth的配置](https://s2.ax1x.com/2019/08/01/edCIGn.png)

最终我们应该吧本地的地址改为你仓库的地址

根目录的_config.yml配置如下

![_config.yml配置](https://s2.ax1x.com/2019/08/01/edCxi9.png)


配置成功后的效果

![成功后的效果](https://s2.ax1x.com/2019/08/01/edFtK0.png)

注意如果你的网页后缀字符长度超过50个字符，就会提示未初始化，或者初始化不成功，如下图，后缀超过了50个

![](https://s2.ax1x.com/2019/08/01/edFrG9.png)

![](https://s2.ax1x.com/2019/08/02/eBum0H.png)
