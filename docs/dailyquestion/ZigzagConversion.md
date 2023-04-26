---
title: 6.N 字形变换
toc: content
tocDepth: 4
---

## 题目
将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
```
P   A   H   N
A P L S I I G
Y   I   R
```


之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。

请你实现这个将字符串进行指定行数变换的函数：
```
string convert(string s, int numRows);
```

#### 示例 1：
```
输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"
```
#### 示例 2：

```
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
```
解释：
```
P     I    N
A   L S  I G
Y A   H R
P     I
```
#### 示例 3：
```
输入：s = "A", numRows = 1
输出："A"
```

#### 提示：
```
1 <= s.length <= 1000
s 由英文字母（小写和大写）、',' 和 '.' 组成
1 <= numRows <= 1000
```

## 代码

### 解法

#### 解题思路：
整体的思路是遍历字符串，遍历过程中将每行都看成新的字符串构成字符串数组，最后再将该数组拼接起来即可
- 如果 numRows=1 则说明当前字符串即为结果，直接返回
- 否则整个字符串需要经历，向下向右，向下向右，这样的反复循环过程，设定 down 变量表示是否向下，loc 变量表示当前字符串数组的下标
- 如果 down 为 true，则 loc+=1，字符串数组下标向后移动，将当前字符加入当前字符串中
- 如果 down 为 false，则表示向右，则 loc−=1，字符串数组下标向前移动，将当前字符加入当前字符串中

javascript
```js
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if(numRows == 1)
        return s;

    const len = Math.min(s.length, numRows);
    const rows = [];
    for(let i = 0; i< len; i++) rows[i] = "";
    let loc = 0;
    let down = false;

    for(const c of s) {
        rows[loc] += c;
        if(loc == 0 || loc == numRows - 1)
            down = !down;
        loc += down ? 1 : -1;
    }

    let ans = "";
    for(const row of rows) {
        ans += row;
    }
    return ans;
};

```


typescript
```ts
function convert(s: string, numRows: number): string {
    if (numRows === 1) return s;
    const strs: string[] = new Array(numRows).fill('');
    let i = 0;
    let flag = 1;
    for (let str of s) {
        strs[i] += str;
        if (i === 0) {
            flag = 1;
        } else if (i === numRows - 1) {
            flag = -1;
        }
        i += flag;
    }
    // console.log(strs);
    return strs.join('');
};
```