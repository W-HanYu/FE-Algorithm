---
title: 16.最接近的三数之和
toc: content
tocDepth: 4
---

## 题目 🔥🔥 中等
给你一个长度为 `n` 的整数数组`nums`和 一个目标值`target`。请你从 `nums` 中选出三个整数，使它们的`和`与`target`最接近。

返回这三个数的和。

假定每组输入只存在恰好一个解。



### 示例 1：
```bash
输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
```

### 示例 2：
```bash
输入：nums = [0,0,0], target = 1
输出：0
```
### 提示：

- `3 <= nums.length <= 1000`
- `-1000 <= nums[i] <= 1000`
- `-104 <= target <= 104`

## 解题
### 解法 排序+双指针
- 由于要计算三个数，如果使用暴力枚举的话`时间复杂度`会到 O(n<sup>3</sup>)，需要`降低时间复杂度`
- 首先给数组排序，时间复杂度为 `O(nlogn)`
- 在数组 `nums` 中，进行遍历，每遍历一个值利用其下标`i`，形成一个固定值 `nums[i]`
- 再使用前指针指向 `left = i + 1` 处，后指针指向 `right = nums.length - 1` 处，也就是结尾处
- 根据 `sum = nums[i] + nums[left] + nums[right]` 的结果，判断 `sum` 与目标 `target` 的距离，如果更近则更新结果 `res`;
- 同时判断 `sum` 与 `target` 的大小关系，因为数组有序，如果 `sum > target` 则 `right--`，如果 `sum < target` 则 `left++`，如果 `sum == target` 则说明距离为 `0` 直接返回结果
- 整个遍历过程，固定值为 `n` 次，双指针为 `n` 次，时间复杂度为 O(n<sup>2</sup>)

整个程序时间复杂度：**O(nlogn) + O(n<sup>2</sup>) = O(n<sup>2</sup>)**



**javascript**
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var threeSumClosest = function(nums, target) {
    nums.sort((a,b)=>a-b)
    const len = nums.length
    let res = nums[0] + nums[1] + nums[len-1]
    for(let i = 0; i < len-2;i++){
      let left = i + 1
      let right = len-1
      while(left < right){
        let sum = nums[i] + nums[left] + nums[right]
        if(sum > target){
          right--
        }else{
          left++
        }
        //更新最小和
        if(Math.abs(res-target) > Math.abs(sum-target)){
          res = sum
        }
      }
    }
    return res
  };



/**
 * @param {number[]} nums
 * @param {number} target
 * @param {number[]} helpArr
 * @return {number}
 */
var threeSumClosest = function(nums, target,helpArr=[]) {
  nums.sort((a,b)=>a-b)
  let len = nums.length
  for(let i = 0; i < len-1;i++){
    let left = i + 1
    let right = len-1
    while(left < right){
      let sum = nums[i] + nums[left] + nums[right]
      sum >= target ? (helpArr[sum-target] = sum ,right--) : (helpArr[target-sum] = sum,left++)
    }
  }
  return helpArr.find( v => v !== undefined)
}
```
**typescript**
```ts
function threeSumClosest(nums: number[], target: number): number {
    nums.sort((a,b)=>a-b)
    const len:number = nums.length
    let res:number = nums[0] + nums[1] + nums[len-1]
    for(let i:number = 0; i < len-2;i++){
      let left:number = i + 1
      let right:number = len-1
      while(left < right){
        let sum = nums[i] + nums[left] + nums[right]
        if(sum > target){
          right--
        }else{
          left++
        }
        //更新最小和
        if(Math.abs(res-target) > Math.abs(sum-target)){
          res = sum
        }
      }
    }
    return res
};


function threeSumClosest(nums: number[], target: number,helpArr:number[] = []): number {
  nums.sort((a,b)=>a-b)
  let len:number = nums.length
  for(let i:number = 0; i < len-1;i++){
    let left:number = i + 1
    let right:number = len-1
    while(left < right){
      let sum = nums[i] + nums[left] + nums[right]
      sum >= target ? (helpArr[sum-target] = sum ,right--) : (helpArr[target-sum] = sum,left++)
    }
  }
  return helpArr.find( v => v !== undefined)
}
```
