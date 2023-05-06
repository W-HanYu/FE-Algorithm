---
title: 15.三数之和
toc: content
tocDepth: 4
---

## 题目 🔥🔥 中等

给你一个整数数组 `nums` ，判断是否存在三元组 `[nums[i], nums[j], nums[k]] `满足 `i != j、i != k 且 j != k` ，同时还满足 `nums[i] + nums[j] + nums[k] == 0 `。请

你返回所有和为 `0` 且不重复的三元组。

**注意**：答案中不可以包含重复的三元组。

### 示例 1：
```bash
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
```

### 示例 2：
```bash
输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。
```

### 示例 3：
```bash
输入：nums = [0,0,0]
输出：[[0,0,0]]
解释：唯一可能的三元组和为 0 。
```

### 提示：

- `3 <= nums.length <= 3000`
- `-105 <= nums[i] <= 105`

## 解题

### 解法一：双指针
**难点：** 本题的难度在于如何去重？
**动画演示：**
对于这组数据：`[-4,-1,-1,-1,-1,2]`
<img src='../../assets/daily-question/sumOfThreeNumbers.gif'>

算法流程：
- 对于数组长度 n，如果数组为 `null`或者数组长度小于 `3`，返回`[]`。
- 对数组进行排序。 
- 遍历排序后数组：

  - 若 nums[i]>0：因为已经排序好，所以后面不可能有三个数加和等于 0，直接返回结果。
  - 对于重复元素：跳过，避免出现重复解
  - 令左指针 `left=i+1`，右指针 `right=n−1`，当 `left<right` 时，执行循环:
  
    - 当 `nums[i]+nums[left]+nums[right]===0`，执行循环，判断左界和右界是否和下一位置重复，去除重复解。并同时将 `left,right` 移到下一位置，寻找新的解
    - 若和大于 `0`，说明 `nums[right]` 太大， `right` 左移 若和小于 `0`，说明 `nums[left] `太小， `left` 右移

**javascript**

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    //先给数组排序
    nums = nums.sort((a,b)=> a-b);
    let len = nums.length;
    let i = 0, res = [];
    while(i < len -1){
        let a = nums[i],
            j = i + 1,
            k = len -1;
            while(j < k){
                let b = nums[j],c = nums[k];
                let sum = a + b + c;
                if(sum == 0){
                    res.push([a,b,c])   //保存起来
                }
                if(sum <= 0){
                    while(nums[j] == b && j < k) j++; //第二个
                }
                if(sum >= 0){
                    while(nums[k] == c && j < k) k--; //第三个
                }
            }
            while(nums[i] == a && i < len -1) i++;//第一个
    }
    return res;

};
```

**typescript**

```ts
function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    let length = nums.length;
    let left: number = 0,
        right: number = length - 1;
    let resArr: number[][] = [];
    for (let i = 0; i < length; i++) {
        if (nums[i]>0) {
            return resArr; //nums经过排序后，只要nums[i]>0, 此后的nums[i] + nums[left] + nums[right]均大于0,可以提前终止循环。	
	    }
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        left = i + 1;
        right = length - 1;
        while (left < right) {
            let total: number = nums[i] + nums[left] + nums[right];
            if (total === 0) {
                resArr.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;
                while (nums[right] === nums[right + 1]) {
                    right--;
                }
                while (nums[left] === nums[left - 1]) {
                    left++;
                }
            } else if (total < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return resArr;
};
```