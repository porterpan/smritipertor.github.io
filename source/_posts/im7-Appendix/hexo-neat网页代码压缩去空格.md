---
title: hexo-neat网页代码压缩去空格
urlname: htmlyasuo
categories:
    hexo
tags: [网站压缩,hexo-neat]
date: 2019-08-03 19:22:03
---

<center> Porter Pan </center>

## 摘要

本文主要介绍，网页空间压缩的办法，去除html或其他脚本中的空格和无用的换行符，注释等，以减少网页文件的响应速度，实现web的快速响应。

- 安装和配置
- 错误解决
- 附录

<!-- more -->


## 安装和配置

- 在你网站的根目录安装npm模块

```bash
npm install hexo-neat --save
```

- 配置站点文件_config.yml

```bash
# 网页压缩，去掉空格，提升响应速度
# hexo-neat https://github.com/rozbo/hexo-neat
# 博文压缩
neat_enable: true
# 压缩html
neat_html:
  enable: true
  exclude:
    - '**/index.h'  
# 压缩css  
neat_css:
  enable: true
  exclude:
    - '**/*.min.css'
    - '**/*cntl.css'
# 压缩js
neat_js:
  enable: true
  mangle: true
  output:
  compress:
  exclude:
    - '**/*.min.js'
    - '**/*.cntl.js'
    - '**/jquery.fancybox.pack.js'
    - '**/index.js'  
    - '**/love.js'
```

这里exlude是排除的选项，根据自己的来合理调整

具体的配置语法，见[hexo-neat](https://github.com/rozbo/hexo-neat)


## 错误解决

通过上面的配置后，我们还是会编译出错，常见错误及解决办法如下

### 错误现象

- 遇到尖括号就报错啥的

```bash
FATAL Something's wrong. Maybe you can find the solution here: https://hexo.io/docs/troubleshooting.html
Error: Parse Error: <--> C2: Cool label</p>
<ul>
<li>具体使用<a href="https://github.com/knsv/mermaid">帮助文档请移步github</a></li>
</ul>
```

### 解决办法

查找这个文件**node_modules/hexo-neat/index.js**

- [ x ] 我的文件路径为：

```java
/GitHub_Projects/porterpan.github.io/node_modules/hexo-neat/index.js
```

- [ x ] 改写里面的代码：

```java
            ignoreCustomComments: [/^\s*more/],
	///<[^>]*>/去除所有的标签
	    ignoreCustomFragments: [/<[^>]*>/,/<img[^>]*>/],
```

> ignoreCustomFragments: [/<[^>]*>/,/<img[^>]*>/],是新加的。忽略尖括号和图像链接

- 改变的整个代码

```java
/* global hexo */
var assign = require('object-assign');

//module.exports = function (hexo) {
    if (true === hexo.config.neat_enable) {
        // HTML minifier
        hexo.config.neat_html = assign({
            enable: true,
            exclude: [],
            ignoreCustomComments: [/^\s*more/],
	///<[^>]*>/去除所有的标签
	    ignoreCustomFragments: [/<[^>]*>/,/<img[^>]*>/],
            removeComments: true,
            removeCommentsFromCDATA: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            minifyJS: true,
            minifyCSS: true,
        }, hexo.config.neat_html);

        // Css minifier
        hexo.config.neat_css = assign({
            enable: true,
            exclude: ['*.min.css']
        }, hexo.config.neat_css);

        // Js minifier
        hexo.config.neat_js = assign({
            enable: true,
            mangle: true,
            output: {},
            compress: {},
            exclude: ['*.min.js']
        }, hexo.config.neat_js, {
                fromString: true
            });


        var filter = require('./lib/filter');
        hexo.extend.filter.register('after_render:html', filter.logic_html);
        hexo.extend.filter.register('after_render:css', filter.logic_css);
        hexo.extend.filter.register('after_render:js', filter.logic_js);
    }
//}
```

---

## 附录

常见的正则表达式及注释

```java
protected void Page_Load(object sender, EventArgs e)
　　{
　　//string regexstr = @"<[^>]*>"; //去除所有的标签
　　//@"<script[^>]*?>.*?</script >" //去除所有脚本，中间部分也删除
　　// string regexstr = @"<img[^>]*>"; //去除图片的正则
　　// string regexstr = @"<(?!br).*?>"; //去除所有标签，只剩br
　　// string regexstr = @"<table[^>]*?>.*?</table>"; //去除table里面的所有内容
　　string regexstr = @"<(?!img|br|p|/p).*?>"; //去除所有标签，只剩img,br,p
　　str = Regex.Replace(str, regexstr, string.Empty, RegexOptions.IgnoreCase);
　　}
```


