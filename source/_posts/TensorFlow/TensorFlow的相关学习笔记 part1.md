---
title: TensorFlow的相关学习笔记 part1
categories:      
    Deep Learning      
tags: [Deep Learning,PyTorch]
date: 2019-5-10 22:55:03
---

# 摘要

本节主要是学习TensorFlow的相关学习笔记，主要是基础的学习路线，包括简单的实例笔记等。

内容包括如下：

- 部分数学推导
- 部分代码实现
- 莺尾花数据集
- MNIST手写字等

> 提示本部分是一个PDF手稿，暂时未整理排版，只能在电脑端预览本部分的PDF笔记,手机上的PDF笔记将不会显示出来。

- [x] Edit By Porter, 积水成渊,蛟龙生焉。

<!-- more -->

<div>
<embed src="/TensorFlow-index/deeplearning.pdf#page=1" type="application/pdf" style="overflow: auto; position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 180%;">
</div>

<div id="pdf1-view1" class=" pdfobject-container" style="height:400px">
<embed class="pdfobject" src="/TensorFlow-index/deeplearning.pdf#navpanes=1&amp;view=FitH&amp;pagemode=thumbs&amp;page=3" type="application/pdf" style="overflow: auto; width: 100%; height: 180%;" internalinstanceid="29">
</div>

<div style="height:400px">

</div>

# MNIST 手写字识别程序入门

# 一、部分基础

```python
import numpy as np
test = np.array([[1,2,3],
                 [2,3,4],
                 [5,4,3],
                 [8,7,2]])
np.argmax(test,1)
```

## 1.1 线性回归基础
### 1.1.1 最小二乘法曲线拟合问题

### 1.1.2 模型假设

理想的线性模型

$$
y = 0.99x + 9.31; x \in {[1:1:10]}
$$

假设的线性模型

$$
f(x;a,b) = ax + b
$$

### 1.1.3 最小二乘法确定参数

$$
f(x;a,b) = ax + b
$$

均方误差函数

$$
S = \sum_{i=1}^{n} (y_{i}-(ax_{i}+b)
)^{2}
$$

对误差求极限，找误差函数的最小值点

$$
\frac{\partial S}{\partial a}=-2(\sum_{i=1}^{n}x_{i}y_{i}-b\sum_{i=1}{n}x_{i}-a\sum_{i=1}^{n}x_{i}^{2})
$$

$$
\frac{\partial S}{\partial b}=-2(\sum_{i=1}^{n}y_{i}-nb-a\sum_{i=1}^{n}x_{i})
$$

令偏导数为零，求得凸函数的极小值点处的a,b 值

$$
a=\frac {n\sum_{}^{}{x_iy_i}-\sum_{}^{}{x_i}\sum_{}^{}{y_i}}  {n\sum_{}^{}{x_i}^2-(\sum_{}^{}{x_i})^2}
$$

$$
b = \frac {\sum_{}^{}{x_i}^2\sum_{}^{}{y_i}-\sum_{}^{}{x_i}\sum_{}^{}{x_iy_i}}  {n\sum_{}^{}{x_i}^2-(\sum_{}^{}{x_i})^2}
$$

下面用两种代码的实现方式实现上述曲线拟合过程

- 用户自定义函数代码实现
- 调用numpy的最小二乘法的线性拟合问题lstsq函数实现

```python
# 用户自定义函数代码实现
import numpy as np
import matplotlib.pyplot as plt

def calcAB(x,y):
    n = len(x)
    sumX,sumY,sumXY,sumXX =0,0,0,0
    for i in range(0,n):
        sumX  += x[i]
        sumY  += y[i]
        sumXX += x[i]*x[i]
        sumXY += x[i]*y[i]
    a = (n*sumXY -sumX*sumY)/(n*sumXX -sumX*sumX)
    b = (sumXX*sumY - sumX*sumXY)/(n*sumXX-sumX*sumX)
    return a,b,

# xi = [1,2,3,4,5,6,7,8,9,10]
# yi = [10,11.5,12,13,14.5,15.5,16.8,17.3,18,18.7]
xi = [1,2,3,4,5,6,7,8,9,10]
# yi = [1 for i in range(10)]
yi = [0] * 10
print(yi)
for num in xi:
  yi[num -1] = num*1.201030944 + 9.8678999766
  
a,b=calcAB(xi,yi)
print("y = 1.201030944*x + 9.8678999766", '\n', "f(x;a,b) = (a)%3.5fx + (b)%3.5f" %(a,b))
x = np.linspace(0,10)
y = a * x + b
plt.plot(x,y,'red', label='fitting curve')
plt.scatter(xi,yi, label='primitive curve')
plt.legend(loc='right')
plt.title('last square method fitting curve')
plt.show()
```

```python
# 最小二乘法的线性拟合问题lstsq函数实现
import numpy as np
import matplotlib.pyplot as plt

x = [1,2,3,4,5,6,7,8,9,10]
# y = [10,11.5,12,13,14.5,15.5,16.8,17.3,18,18.7]
y = [0] * 10
for num in x:
  y[num -1] = num*1.201030944 + 9.8678999766


A = np.vstack([x,np.ones(len(x))]).T

a,b = np.linalg.lstsq(A,y, rcond=-1)[0]
print("1.理想曲线:","y = 1.201030944*x + 9.8678999766")
print('2.拟合曲线:', "f(x;a,b) = %10.5fx + %10.5f" %(a,b))
x = np.array(x)
y = np.array(y)

plt.plot(x,y,'o',label='idea curve',markersize=10)
plt.plot(x,a*x+b,'r',label='fitting curve')
plt.legend(loc='upper left')
plt.title(' the least-squares solution to a linear matrix equation.')
plt.show()
```

----

更多内容见上边的PDF在线预览

