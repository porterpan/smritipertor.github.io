---
title: web中插入视频和音乐播放
categories:
    web
tags: [网页嵌入,音视频嵌入]
date: 2019-5-11 19:15:03
---

# 摘要

本文介绍在web中简单的嵌入第三方音乐播放的相关html代码

实现网页上直接可以音乐或者视频的播放，适合博客文章的嵌入

每种播放都写了两种播放样式

- [x] Edit By Porter, 积水成渊,蛟龙生焉。

<!-- more -->

## 插入视频播放

### 视频在线播放方式1

无聊时刻看看剧也不错：
```html
<div>
<iframe height=498 width=100%  src="https://player.bilibili.com/player.html?aid=38792500&cid=68183480&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>
```

<div>
<iframe height=498 width=100%  src="https://player.bilibili.com/player.html?aid=38792500&cid=68183480&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div>

---

### 视频播放方式2

直接在优酷上打开视屏，选择分享，外链。即可

```html
<iframe height=498 width=510 src='http://player.youku.com/embed/XNDI4MDk3Mjc0NA==' frameborder=0 'allowfullscreen'></iframe>
```

<iframe height=498 width=510 src='http://player.youku.com/embed/XNDI4MDk3Mjc0NA==' frameborder=0 'allowfullscreen'></iframe>

----

## 插入音频播放

### 插入网易云音乐的方法一

```html
<iframe frameborder="no" border="0" 
	marginwidth="0" marginheight="0" 
	width=330 height=86 
	src="//music.163.com/outchain/player?type=2&id=1378085345&auto=0&height=66">
</iframe>
```

<iframe frameborder="no" border="0" 
	marginwidth="0" marginheight="0" 
	width=330 height=86 
	src="http://y.qq.com/n/yqq/song/004YUIB22WvTWe.html&auto=0&height=66">
</iframe>

### 插入网易云音乐的方法二

点击网易云音乐的某一首歌（不是歌曲列表）,然后选择生成外链，然后选择html外链

![音乐外链](https://s2.ax1x.com/2019/08/01/eUguh6.png)


```html
<iframe frameborder="0" border="1" 
    marginwidth="0" marginheight="0"
    width="100%" height="132"
    src="https://music.163.com/outchain/player?type=2&amp;id=2175282&amp;auto=0&amp;height=80">
</iframe>
```

<iframe frameborder="0" border="1" 
    marginwidth="0" marginheight="0"
    width="100%" height="132"
    src="https://music.163.com/outchain/player?type=2&amp;id=2175282&amp;auto=0&amp;height=80">
</iframe>

---

id：歌曲id 
auto：0/1 
0表示打开网页的时候不自动播放； 
1表示打开网页的时候自动播放。





