---
title: 09.回文数
toc: content
tocDepth: 4
---
## 题目 🔥简单
给你一个整数 `x` ，如果 `x` 是一个回文整数，返回 `true` ；否则，返回 `false` 。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

- 例如，`121` 是回文，而 `123` 不是。

### 示例 1：
```bash
输入：x = 121
输出：true
```
### 示例 2：
```bash
输入：x = -121
输出：false
解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
```
### 示例 3：
```bash
输入：x = 10
输出：false
解释：从右向左读, 为 01 。因此它不是一个回文数。
```
### 提示：

- -2<sup>31</sup> <= x <= 2<sup>31</sup> - 1

**进阶**：你能不将整数转为字符串来解决这个问题吗？

## 解题
**思路：** 本题很简单，当该数字为负数、或者个位为零（排除不为零）时，不可能是回文数；对于其他情况，将其后一半反转之后看与其前一半是否相同。

javascript
```js
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if(x < 0 || (x % 10 === 0 && x !== 0) ) return false
    let reversenum = 0
    while(x > reversenum){
        reversenum = reversenum * 10 + x % 10;
        x = Math.floor(x/10)
    }

    return x === reversenum || x === Math.floor(reversenum / 10)
};



/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let newX
    if (x > 0) {
        newX = +(x + '').split('').reverse().join('')
        if (x == newX) {
            return true
        } else {
            return false
        }
    } else if (x == 0) {
        return true
    } else {
        return false
    }
};

```

typescript
```ts
function isPalindrome(x: number): boolean {
    if(x < 0 || x % 10 === 0 &&x !== 0){//排除负数以及个位是零的数 如：1220、10、-121等
        return false
    }
    let reversedNum:number = 0
    while(x > reversedNum){ //翻转数字的后一半
        reversedNum = reversedNum * 10 + x % 10;
        x = Math.floor(x/10)
    }
    //数字为奇数或者偶数情况
    return x === reversedNum || x === Math.floor(reversedNum/10)
};
```
