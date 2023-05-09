---
title: 18.四数之和
toc: content
tocDepth: 4
---
## 题目 🔥🔥🔥中等

给你一个由 `n` 个整数组成的数组 `nums` ，和一个目标值 `target` 。请你找出并返回满足下述全部条件且不重复的四元组 `[nums[a], nums[b], nums[c], nums[d]] `若两个四元组元素一一对应，则认为两个四元组重复）：
- `0 <= a, b, c, d < n`
- `a、b、c 和 d 互不相同`
- `nums[a] + nums[b] + nums[c] + nums[d] == target`
  你可以按 **任意顺序** 返回答案 。

### 示例 1：
```bash
输入：nums = [1,0,-1,0,-2,2], target = 0
输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

### 示例 2：
```bash
输入：nums = [2,2,2,2,2], target = 8
输出：[[2,2,2,2]]
```
### 提示：
- `1 <= nums.length <= 200`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`

## 解题
### 解法 双指针
**解题思路：⬇️**
最简单粗暴的方法就是`for循环`，但需要嵌套 `四层` ，这样的 时间复杂度很大：O(n<sup>4</sup>),为了降低复杂度，我们再次采用 `双指针` ；
同时呢 ，为了避免 枚举到重复的 `四元组`， 则需要保证每一重循环枚举到的元素`不小于`其上一重循环枚举到的元素，且在同一重循环中不能多次枚举到相同的元素。
1. 对数组进行 `小 ➡️ 大` 的排序;
2. 当 `nums[++r] === nums[r]` 时，该循环 `跳过` 到下一次；


使用两重循环分别枚举前两个数，然后在两重循环枚举到的数之后使用双指针枚举剩下的两个数。假设两重循环枚举到的前两个数分别位于下标`i和j`;其中 i<j ,`左右指针`分别指向下标 `j+1` 和 下标 `n-1`;
每次计算四个数的和，并进行如下操作：
- 如果和等于 `target` 则将枚举到的四个数加到答案中，然后将左指针右移直到遇到不同的数，将右指针左移直到遇到不同的数
- 如果和小于 `target`，则将左指针右移一位；
- 如果和大于 `target`，则将右指针左移一位；

总复杂度：O(n<sup>3</sup>)

**javascript：⬇️**
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    const len = nums.length;
    if(len < 4) return [];
    nums.sort((a, b) => a - b);
    const res = [];
    for(let i = 0; i < len - 3; i++) {
      // 去重i
      if(i > 0 && nums[i] === nums[i - 1]) continue;
      for(let j = i + 1; j < len - 2; j++) {
        // 去重j
        if(j > i + 1 && nums[j] === nums[j - 1]) continue;
        let l = j + 1, r = len - 1;
        while(l < r) {
          const sum = nums[i] + nums[j] + nums[l] + nums[r];
          if(sum < target) { l++; continue}
          if(sum > target) { r--; continue}
          res.push([nums[i], nums[j], nums[l], nums[r]]);

          // 对nums[left]和nums[right]去重
          while(l < r && nums[l] === nums[++l]);
          while(l < r && nums[r] === nums[--r]);
        }
      }
    }
    return res;
  };

```

**typescript：⬇️**
```ts
function fourSum(nums: number[], target: number): number[][] {
    /**
        双指针
     */
    nums.sort((a,b)=>a-b)
    const res:number[][] = []
    let first:number = 0
    let second:number
    let  third:number
    let forth:number
    let len:number = nums.length
    for(;first < len;first++){
        if(first > 0 && nums[first] == nums[first-1]) continue  //进行下一次循环
        for(second = first+1;second < len;second++){
            if((second-first)>1 && nums[second] === nums[second-1]) continue  //进行下一次循环
            third = second+1
            forth = len-1
            while(third < forth){
                let total:number = nums[first] + nums[second] + nums[third] + nums[forth]
                if(total === target){
                    res.push([nums[first] , nums[second] , nums[third] , nums[forth]])
                    third++
                    forth--
                    //防止重复
                    while(nums[third] === nums[third-1]) third++
                    while(nums[forth] === nums[forth + 1]) forth--
                }else if(total < target){
                    third++
                }else {
                    forth--
                }
            }
        }
    }
    return res

};
```

 





