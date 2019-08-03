---
title: hexo添加Gitment评论功能
urlname: hexoFitment
categories:
    hexo
tags: [评论插件,Gitment]
date: 2019-7-28 22:55:07
---

# 摘要

* 修改代码
* 添加gitment
* 设置githubOAuth
* 初始化评论
* 常见问题

<!-- more -->


## 修改代码

我们要加入gitment评论功能，需要修改yelee

该脚本的路径为：

```python
GitHub_Projects/porterpan.github.io/themes/yelee/layout/_partial/article.ejs
```

这个文件中需要修改的地方为原该脚本的82行

```python
<% if (!index && post.comments){ %>
    <% if (theme.duoshuo.on) { %>
      <%- partial('comments/duoshuo', {
          key: post.path,
          title: post.title,
          url: config.url+url_for(post.path),
          }) %>
    <% } else if (theme.youyan.on) { %>
        <%- partial('comments/youyan') %>
    <% } else if (theme.disqus.on) { %>
        <%- partial('comments/disqus', {
            shortname: theme.disqus.shortname
          }) %>
    <% } else if (config.disqus_shortname) { %>
        <%- partial('comments/disqus', {
            shortname: config.disqus_shortname
          }) %>
    <% } if (theme.gitment_on) { %>
        <%- partial('comments/gitment', {
            key: post.slug,
            title: post.title,
            url: config.url+url_for(post.path)
          }) %>
    <% } %>
```

也就是添加的

```python
if (theme.gitment_on) { %>
        <%- partial('comments/gitment', {
            key: post.slug,
            title: post.title,
            url: config.url+url_for(post.path)
          }) %>
    <% } %>
```

这句判断。

## 添加gitment

然后去下载[itment.ejs](https://github.com/porterpan/gitment/blob/gh-pages/link_src/gitment.ejs)

- 将gitment.ejs放到该路径中即可：

```python
GitHub_Projects/porterpan.github.io/themes/yelee/layout/_partial/comments/gitment.ejs
```

- gitment.ejs 文件内容为

```java
<div id="gitment-ctn"></div> 
<!--汉化-->

<link rel="stylesheet" href="https://porterpan.github.io/gitment/link_src/gitment.css">
<script src="https://porterpan.github.io/gitment/link_src/gitment.js"></script>

<!--
<link rel="stylesheet" href="gitment/gitment.css">
<script src="gitment/gitment.js"></script>
-->
<!--原型-->
<!--
<link rel="stylesheet" href="//imsun.github.io/gitment/style/default.css">
<script src="//imsun.github.io/gitment/dist/gitment.browser.js"></script>
-->
<script>
var gitment = new Gitment({
  id: "<%=url%>",
  owner: '<%=theme.gitment_owner%>',
  repo: '<%=theme.gitment_repo%>',
  oauth: {
    client_id: '<%=theme.gitment_oauth.client_id%>',
    client_secret: '<%=theme.gitment_oauth.client_secret%>',
  },
})
gitment.render('gitment-ctn')
</script>
```


## 设置githubOAuth

github 网页的OAuth的配置如下图

![OAuth的配置](https://s2.ax1x.com/2019/08/01/edCIGn.png)

之后我们应该把本地的地址改为你仓库的地址

根目录的_config.yml配置如下

![_config.yml配置](https://s2.ax1x.com/2019/08/01/edCxi9.png)


## 初始化评论

提示未初始化

```bash
Error: Comments Not Initialized
```

解决办法：
直接登录你的github,进入存放评论的仓库，选择Issue菜单，新建一条评论即可，如下图

![Not Initialized](https://s2.ax1x.com/2019/08/01/edSmuD.png)

> 或者直接在页面登录你的github账号进行初始化



## 常见问题






配置成功后的效果

![成功后的效果](https://s2.ax1x.com/2019/08/01/edFtK0.png)

- 注意

如果你的网页后缀字符长度超过50个字符，就会提示未初始化，或者初始化不成功，如下图，后缀超过了50个

![初始化不成功](https://s2.ax1x.com/2019/08/01/edFrG9.png)

- 解决办法

将你的网址缩短，具体怎么缩短，看我这篇文章[如何把博客文章缩短，取消之前的带中文路径办法](https://porterpan.github.io/hexoYeleeUrl/)

![缩短后的效果](https://s2.ax1x.com/2019/08/02/eBum0H.png)

更加详细的办法，直接看我这个[第50次提交版本的源代码](https://github.com/porterpan/porterpan.github.io/tree/f8ee60945902346640dbb29f437f8b1d3ebf8df9)，研究下


