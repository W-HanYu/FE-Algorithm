---
title: 11. 盛最多水的容器
toc: content
tocDepth: 4
# order:11
---

## 题目 🔥🔥中等
给定一个长度为 `n` 的整数数组` height `。有 `n `条垂线，第 `i `条线的两个端点是 `(i, 0)` 和 `(i, height[i]) `。

找出其中的两条线，使得它们与 `x `轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

**说明**：你不能倾斜容器。

### 示例 1
<img src='https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg' width='300px'>

```bash
输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
```

### 示例 2
```bash
输入：height = [1,1]
输出：1
```

### 提示

- n == height.length
- 2 <= n <= 105
- 0 <= height[i] <= 104

## 解法

### 双指针
算法流程：
1. 初始化： 双指针 i , j 分列水槽左右两端；
2. 循环收窄： 直至双指针相遇时跳出；
    1. 更新面积最大值 res ；
    2. 选定两板高度中的短板，向中间收窄一格；
3. 返回值： 返回面积最大值 res 即可；

**如图所示**

<img src='https://pic.leetcode-cn.com/1628780627-VtSmcP-Picture0.png' width='300px'>

javascript
```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let res = 0;
    let i = 0, j = height.length - 1;
    while(i < j){
        let minHeight = height[i]<height[j]? height[i++]:height[j--]
        let maxA = minHeight*(j-i+1)
        res = Math.max(res,maxA)
    }
    return res
};

```

typescript
```ts
var maxArea = function(height:number[]):number {
    /**
        双指针
    */
    let res:number = 0;
    for(let i:number = 0,j:number = height.length-1;i<j;){
        //最小高度，哪个小，哪个指针先往里面缩
        let minHeight:number = height[i] < height[j] ? height[i++] : height[j--];
        //记录此时的面积
        let maxArea = minHeight * (j - i + 1);
        res = Math.max(res,maxArea)
    }

    return res
};
```