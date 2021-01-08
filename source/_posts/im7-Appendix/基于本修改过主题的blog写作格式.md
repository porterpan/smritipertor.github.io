---
title: 基于本修改过主题的blog写作格式
localimage: image1
urlname: bolgwriteformat
categories:     
    summary    
tags: [System Conf,Github]
date: 2019-8-1 10:22:45
---

# 摘要

本文记录写博客文章，在我修改后的主题中的写作格式，格式固定后按照格式写作，可以保证效果最佳。

- [x] Edit By Porter, 积水成渊,蛟龙生焉。

<!-- more -->

## 文章开头的写作格式

-[x] title: 基于本修改过主题的blog写作格式

在博客中显示的文章题目

-[x]localimage: image1

暂时该参数未使用

-[x]urlname: installgitbook

打开该文章后，显示该文章的网址后缀

-[x]categories:     
-[x]    summary    

文章归类

-[x]tags: [System Conf,Github]

文章标签

-[x]date: 2018-6-10 22:55:03

文章写作时间

```python
title: 基于本修改过主题的blog写作格式
localimage: image1
urlname: installgitbook
categories:     
    summary    
tags: [System Conf,Github]
date: 2018-6-10 22:55:03
```


### 完整的开头格式

```python
---
title: 基于本修改过主题的blog写作格式
localimage: image1
urlname: installgitbook
categories:     
    summary    
tags: [System Conf,Github]
date: 2018-6-10 22:55:03
---

# 摘要

本文记录了 Ubuntu18安装Gitbook的相关步骤，和某些关键的终点输入指令，本文不是指导如何调试代码和修复代码，本文给出了一种安装的方法，具体修复方法见文中内容所示。

- [x] Edit By Porter, 积水成渊,蛟龙生焉。

<!-- more -->
```

## 文章本地图片加载

本部分分两种本地图片加载的方式

### 文章在post下的本地图片加载（md）

在该模式下，文章中的图片要放在以image[x]开头的图片文件夹中，并且文件夹image[x]要放在source目录下。

引用图片的格式为：

```python
![peek 软件安装演示效果](./image1/Peek_yanshi.gif)
```

而文章要放在，_post路径下。

## 文章在source目录下的本地图片加载（html）

这种模式下，请仿照，diary路径下。的html来操作就好

## 解析本地图片加载的代码优化

加载本地图片是需要通过修改index.js文件实现


```python
porterpan.github.io/node_modules/hex
o-asset-image/index.js
```


代码修改后的整体代码

```java
'use strict';
var cheerio = require('cheerio');

// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}
function getLocation(str, n) {
  var index=str.lastIndexOf('/');
  for (var i = 0; i < n-1; i++) {
      index=str.lastIndexOf('/',index-1);
  }
  var location=str.substring(index+1);
  return location;
}

hexo.extend.filter.register('after_post_render', function(data){
  var config = hexo.config;
  if(config.post_asset_folder){
    var link = data.permalink;
    var beginPos = getPosition(link, '/', 4);
    // In hexo 3.1.1, the permalink of "about" page is like ".../about/index.html".
    var endPos = link.lastIndexOf('/');

    link = link.substring(beginPos, endPos);
    // link = getLocation(data.permalink, 3);
    // link = link.split('/')[0]
    console.info&&console.info("yuanshi link:" + data.permalink+"del link: "+link);
    var toprocess = ['excerpt', 'more', 'content'];
    for(var i = 0; i < toprocess.length; i++){
      var key = toprocess[i];
 
      var $ = cheerio.load(data[key], {
        ignoreWhitespace: false,
        xmlMode: false,
        lowerCaseTags: false,
        decodeEntities: false
      });

      $('img').each(function(){
        if ($(this).attr('src')){
            // For windows style path, we replace '\' to '/'.
            var src = $(this).attr('src').replace('\\', '/');
            var src_temp = getLocation(src, 3);
            console.info&&console.info("yuanshi src:" + src+" del src: "+src_temp);

            if(!/http[s]*.*|\/\/.*/.test(src) &&
               !/^\s*\//.test(src)) {
              // For "about" page, the first part of "src" can't be removed.
              // In addition, to support multi-level local directory.
              var linkArray = link.split('/').filter(function(elem){
                return elem != '';
              });
              var srcArray = src.split('/').filter(function(elem){
                return elem != '' && elem != '.';
              });
              if(srcArray.length > 1)
                srcArray.shift();
              src = srcArray.join('/');


              //$(this).attr('src', config.root + link + src);
              //notes: src is image name,and config.root is localhost:port,the middle cahr string is my local image Repository
              if(src_temp.split('/')[1].substring(0,5)=="image"){
                link = src_temp.split('/')[1]+'/';
              }else{
                var link_temp = getLocation(data.permalink, 3);
                link = link_temp.split('/')[1]+'/';
                // link = ''
                // src = src_temp
              }
              if(src_temp.substring(0,5) =="img/a"){
                link="diary/img/";              
                console.info&&console.info("judement the seventh capture!");
                }
              $(this).attr('src', config.root + link + src);
              console.info&&console.info("update link as:-->"+config.root + "==" + link + "==" + src);
            }
        }else{
            console.info&&console.info("no src attr, skipped...");
            console.info&&console.info($(this));
            console.info&&console.info('config file = porterpan.github.io/node_modules/hexo-asset-image/index.js')
        }
      });
      data[key] = $.html();
    }
  }
});

```

