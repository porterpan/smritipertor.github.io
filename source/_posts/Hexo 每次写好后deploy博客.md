---
title: Hexo 每次写好后deploy博客
categories:     
    summary
tags: [Hexo,Blogs]
date: 2018-11-10 22:55:03
---

<center> Porter Pan </center>

## 摘要：

github page 结合Hexo-Yelee或者Next主题,搭建个人博客主页，是很不错的一个选择，个人使用情况，感觉Yelee界面布局啥的还是很不错的。

这篇文章中我将介绍每次我们写好的md博文怎么部署到github page 上去。

----

本文主要使用的命令行如下：

* 1、直接部署到网站

```bash
hexo clean && hexo g && hexo d
```
<!-- more -->

也可以本地部署，查看浏览效果

* 2、部署到本地，查看浏览效果

```bash
hexo clean && hexo g && hexo s
```

## 我们每次写好的博文如何正确推送至github

每次我们写好了博文后，需要上传至我们的github空间中,只需要每次将我们写好的博文放到文件路径：
```C
D:\Github\smritipertor.github.io\source\_posts
```

如果之前没有安装过
** hexo-deployer-git **
的话，先执行：

```bash
npm install hexo-deployer-git --save
```

然后执行如下命令操作：

* 首先在你之前建好的博文路径：比如我的是

```bash
hexo generate

hexo s //(或者:hexo server)

hexo deploy //(或者:hexo d)
```

### 至此你的网站上就有了网站数据



