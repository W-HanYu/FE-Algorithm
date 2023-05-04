---
title: 12. 整数转罗马数字
toc: content
tocDepth: 4
# order:11
---

## 题目 🔥🔥中等
罗马数字包含以下七种字符: `I`， `V`， `X`， `L`，`C`，`D` 和 `M`。
```bash
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```
例如， 罗马数字 `2` 写做 `II` ，即为两个并列的 `1 `。`12` 写做 `XII` ，即为 `X + II` 。 `27` 写做  `XXVII`, 即为 `XX + V + II `。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 `4` 不写做 `IIII`，而是 `IV`。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 `9 `表示为 `IX`。这个特殊的规则只适用于以下六种情况：

- `I` 可以放在 `V (5)` 和 `X (10)` 的左边，来表示 4 和 9。
- `X` 可以放在 `L (50)` 和 `C (100)` 的左边，来表示 40 和 90。 
- `C` 可以放在 `D (500)` 和 `M (1000)` 的左边，来表示 400 和 900。
给你一个整数，将其转为罗马数字。

### 示例 1:
```bash
输入: num = 3
输出: "III"
```
### 示例 2:
```bash
输入: num = 4
输出: "IV"
```
### 示例 3:
```bash
输入: num = 9
输出: "IX"
```
### 示例 4:
```bash
输入: num = 58
输出: "LVIII"
解释: L = 50, V = 5, III = 3.
```
### 示例 5:
```bash
输入: num = 1994
输出: "MCMXCIV"
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```

### 提示：

- `1 <= num <= 3999`

## 解题
### 解法一 贪心算法
贪心法则：我们每次尽量使用最大的数来表示。 比如对于 1994 这个数，如果我们每次尽量用最大的数来表示，依次选 1000，900，90，4，会得到正确结果 MCMXCIV。

所以，我们将哈希表按照从大到小的顺序排列，然后遍历哈希表，直到表示完整个输入

<img src='https://assets.leetcode-cn.com/solution-static/12/1.png' width='300px'>

javascript

```js
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    // 此处根据mark[n][1]降序排列，为满足后续贪心法则
    const romanArr=[['M',1000],['CM',900],['D',500],['CD',400],['C',100],['XC',90],['L',50],['XL',40],
    ['X',10],['IX',9],['V',5],['IV',4],['I',1]];
    let number=num
    let romanStr=''
    // 此处贪心法则，从最大的进制值遍历
    for([symbol,key] of romanArr)
    {
        // 当number大于了当前进制值，由于使用了贪心法则（从最大的进制值开始遍历）则证明
        // 此进制值为number能满足的最大进制
        while(number>=key)
        {
            // 不断减去当前满足的最大进制，直到小于当前进制为止
            number-=key
            // 加上当前进制的roman字符
            romanStr+=symbol
        }
    }
    return romanStr
};
```

typescript

```ts
function intToRoman(num: number): string {
    const romanArr = [['M',1000],['CM',900],['D',500],['CD',400],['C',100],['XC',90],['L',50],['XL',40],
    ['X',10],['IX',9],['V',5],['IV',4],['I',1]];
    let romanStr:string = ''
    let n = num
    for(let [key,value] of romanArr){
        while(n >= value){
            n -= value as number
            romanStr += key
        }
    }
    return romanStr
    
};
```

#### 复杂度分析

- 时间复杂度：O(1)。
- 空间复杂度：O(1)。


### 解法二 硬编码数字

**根据罗马数字对应表：**
<img src='https://assets.leetcode-cn.com/solution-static/12/1.png' width='300px'>

回顾前言中列出的这 13 个符号，可以发现：
- 千位数字只能由 M 表示；
- 百位数字只能由 C，CD 和 CM 表示；
- 十位数字只能由 X，XL，L 和 XC 表示；
- 个位数只能由 I，IV，V 和 IX 表示
于是我们将其分为四组，如下：
<img src='https://assets.leetcode-cn.com/solution-static/12/3.png' width='400px'>

利用模运算和除法运算，我们可以得到 num 每个位上的数字：
```bash
thousands_digit = num / 1000
hundreds_digit = (num % 1000) / 100
tens_digit = (num % 100) / 10
ones_digit = num % 10
```
最后，根据 num 每个位上的数字，在硬编码表中查找对应的罗马字符，并将结果拼接在一起，即为 num 对应的罗马数字。

javascript

```js
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    const thousands = ["", "M", "MM", "MMM"];
    const hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    const tens     = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    const ones     = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

    const roman = [];
    roman.push(thousands[Math.floor(num / 1000)]);
    roman.push(hundreds[Math.floor(num % 1000 / 100)]);
    roman.push(tens[Math.floor(num % 100 / 10)]);
    roman.push(ones[num % 10]);
    return roman.join('');
};

```
typescript
```ts
var intToRoman = function(num:number):string {
    const thousands = ["", "M", "MM", "MMM"];
    const hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    const tens     = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    const ones     = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

    const roman:string[] = [];
    roman.push(thousands[Math.floor(num / 1000)]);
    roman.push(hundreds[Math.floor(num % 1000 / 100)]);
    roman.push(tens[Math.floor(num % 100 / 10)]);
    roman.push(ones[num % 10]);
    return roman.join('');
};
```

#### 复杂度分析

- 时间复杂度：O(1)。
- 空间复杂度：O(1)。
