---
title: hexo Yelee网址修改为简短的英文
urlname: hexoYeleeUrl
categories:
    hexo
tags: [url,英文网址]
date: 2019-7-28 22:55:07
---

# 摘要

hexoYelee将以前时间或者文件夹的中文命名修改为简短的英文

-[x] 第一步、修改**_config.yml**文件内容
-[x] 第二步、为每篇文章添加urlname属性


<!-- more -->

## 第一步、修改**_config.yml**文件内容

- permalink: /:urlname/ 

```python
# permalink: :year/:month/:day/:title/
# 设置网页显示的地址后缀为文章中自定义的urlname,需要在文章开头加入 urlname: 标签
permalink: /:urlname/
permalink_defaults: 
```

将permalink:设置为 /:urlname/

## 第二步、为每篇文章添加urlname属性

- urlname: hexoYeleeUrl

具体内容如下

```python
---
title: hexo Yelee网址修改为简短的英文
urlname: hexoYeleeUrl
categories:
    hexo
tags: [url,英文网址]
date: 2019-7-28 22:55:07
---
```

## 编译

执行以下代码，本地查看效果

```python
hexo clean && hexo g && hexo s
```
ok改名成功


