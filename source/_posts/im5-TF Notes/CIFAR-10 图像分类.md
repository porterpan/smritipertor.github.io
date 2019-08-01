---
title: CIFAR-10 图像分类Notes
categories:      
    Deep Learning      
tags: [Deep Learning,Tensorflow]
date: 2019-7-22 22:55:03
---

# 摘要

## CIFAR-10 图像分类PDF笔记

本节主要记录CIFAR-10 图像分类的相关学习笔记，该项目实战代码主要包括，2层卷积层，3层全连接层。

内容包括如下：

- 需要用到的python基础语法
- TensorFlow样本读取机制
- TensorFlow代码实现10类图像分类的相关函数和实现过程

> 提示本部分是一个PDF手稿，暂时未整理排版，只能在电脑端预览本部分的PDF笔记,手机上的PDF笔记将不会显示出来。

- [x] Edit By Porter, 积水成渊,蛟龙生焉。

<!-- more -->


<div id="pdf1-view1" class=" pdfobject-container" style="height:400px">
<embed class="pdfobject" src="/TensorFlow-index/CIFAR-10 - Colaboratory.pdf#navpanes=1&amp;view=FitH&amp;pagemode=thumbs&amp;page=3" type="application/pdf" style="overflow: auto; width: 100%; height: 180%;" internalinstanceid="29">
</div>

<div style="height:400px">

</div>

----
以下为截取我部分PDF笔记中的内容

## 二、TensorFlow读取机制图解

![普通的数据读取过程](https://s2.ax1x.com/2019/07/10/Z65Du6.png)

假设我们的硬盘中有一个图片数据集0001.jpg，0002.jpg，0003.jpg……我们只需要把它们读取到内存中，然后提供给GPU或是CPU进行计算就可以了。这听起来很容易，但事实远没有那么简单。事实上，我们必须要把数据先读入后才能进行计算，假设读入用时0.1s，计算用时0.9s，那么就意味着每过1s，GPU都会有0.1s无事可做，这就大大降低了运算的效率。

如何解决这个问题？方法就是将读入数据和计算分别放在两个线程中，将数据读入内存的一个队列，如下图所示：

![高效率的读取文件方式](https://s2.ax1x.com/2019/07/10/Z6IyMq.png)

TensorFlow使用文件名队列+内存队列双队列的形式读入文件，可以很好地管理epoch。下面我们用图片的形式来说明这个机制的运行方式。如下图，还是以数据集A.jpg, B.jpg, C.jpg为例，假定我们要跑一个epoch，那么我们就在文件名队列中把A、B、C各放入一次，并在之后标注队列结束。


![双队列](https://s2.ax1x.com/2019/07/10/Zcpjkd.png)

对于文件名队列，我们使用tf.train.string_input_producer函数。这个函数需要传入一个文件名list，系统会自动将它转为一个文件名队列。

- num_epochs：它就是我们上文中提到的epoch数
- shuffle：是指在一个epoch内文件的顺序是否被打乱。

```python
tf.train.string_input_producer(
    string_tensor,
    num_epochs=None,
    shuffle=True,
    seed=None,
    capacity=32,
    shared_name=None,
    name=None,
    cancel_op=None
)
```

### 2.1 tf.WholeFileReader()

读取队列目录中的所有文件，并把文件 **<font color = 'blue'>全部内容</font>** 提取出key和value返回。

通常该函数一般用在一个文件就是一个图片的情况下。

读取的代码如下

```python 
# 输入文件列表
filename = ['A.jpg', 'B.jpg', 'C.jpg']
# 创建文件队列
filename_queue = tf.train.string_input_producer(filename, shuffle=False,
                                                    num_epochs=5)
# 创建reader对象
reader = tf.WholeFileReader()
# 从队列中读取key和value值
key, value = reader.read(filename_queue)
# 初始化变量
tf.local_variables_initializer().run()
# 入栈线程启动
threads = tf.train.start_queue_runners(sess=sess)

```

> 如果要使用,请在队列(Queue)中的排列文件名.Read的输出将是一个文件名(key)和该文件的内容(value).

### 2.2 tf.FixedLengthRecordReader()

固定长度记录一个或多个二进制文件，送入队列中。

tf.FixedLengthRecordReader
(
    record_bytes,
    header_bytes=None,
    footer_bytes=None,
    hop_bytes=None,
    name=None,
    encoding=None
)

record_bytes: 整形数，输出的Record中每个文件的长度

```python
  label_bytes = 1  # 2 for CIFAR-100
  result.height = 32
  result.width = 32
  result.depth = 3
  image_bytes = result.height * result.width * result.depth
  # Every record consists of a label followed by the image, with a
  # fixed number of bytes for each.
  record_bytes = label_bytes + image_bytes

  # Read a record, getting filenames from the filename_queue.  No
  # header or footer in the CIFAR-10 format, so we leave header_bytes
  # and footer_bytes at their default of 0.
  reader = tf.FixedLengthRecordReader(record_bytes=record_bytes)
  result.key, value = reader.read(filename_queue)
```





