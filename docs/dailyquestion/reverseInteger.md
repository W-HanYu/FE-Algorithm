---
title: 07.整数反转
toc: content
tocDepth: 4
---

## 题目 🔥🔥 中等
给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。

如果反转后整数超过 32 位的有符号整数的范围 [−2<sup>31</sup>,  2<sup>31</sup> − 1] ，就返回 0。

**假设环境不允许存储 64 位整数（有符号或无符号）。**

### 示例 1：
```bash
输入：x = 123
输出：321
```

### 示例 2：
```bash
输入：x = -123
输出：-321
```

### 示例 3：
```bash
输入：x = 120
输出：21
```
### 示例 4：
```bash
输入：x = 0
输出：0
```

### 提示：
 -2<sup>31</sup> <= x <= 2<sup>31</sup> - 1

## 解法

#### 解题思路

可以转化为字符窜进行反转，其实没必要；
换一种思路：就是拿到该数字的最后一位进行数字反转运算；
以`12345`为例，先拿到5，在拿到4，... 最后拿到1；那么怎么可以拿到呢？
方法就是对数字取余%：
<img src='https://pic.leetcode-cn.com/be35cb60bec9a9ae794abad671e6618abb5664780bc7ee30ca93ca423884a666-1.jpg' width='300px' center>

**注意** 这里不能单纯一个循环解决，不能忽略为负数的情况，所以要有循环终止条件：`while(x!=0)`
还有，题目中要求不能`超过32位整数[2147483647]`,所以对于一个数字 `1147483644 反转过来 4463847411 `就大于该整数范围了，
<img src='https://pic.leetcode-cn.com/42c736510f4914af169907d61b22d1a39bd5a16bbd7eca0466d90350e2763164-2.jpg' width = '300px'>

上图中，绿色的是最大32位整数
第二排数字中，橘子的是5，它是大于上面同位置的4，这就意味着5后跟任何数字，都会比最大32为整数都大。
所以，我们到【最大数的1/10】时，就要开始判断了
如果某个数字大于 214748364那后面就不用再判断了，肯定溢出了。
如果某个数字等于 214748364呢，这对应到上图中第三、第四、第五排的数字，需要要跟最大数的末尾数字比较，如果这个数字比7还大，说明溢出了。

### 复杂度

### 代码

javascript

```js
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let res = 0;
    while(x !== 0){
        //拿到数字最后一位
        let tem = x % 10
        x = ~~(x/10)  // ~~ 两次按位与 表示 保持原值 但对于 boolean 回转化为数值
        res = res * 10 + tem
        if(res < Math.pow(-2,31) || res > Math.pow(2,31)-1) return 0;
    }
    return res

};

```

typescript

```js
function reverse(x: number): number {
    if (x === 0) {
        return 0
    }

    let result = null
    if (x < 0) {
        result =  -Number(String(-x).split('').reverse().join(''))
    } else {
        result = Number(String(x).split('').reverse().join(''))
    }


    if (result >= Math.pow(2,31) || result < Math.pow(-2,31) ) return 0;
    return result;

};
```
