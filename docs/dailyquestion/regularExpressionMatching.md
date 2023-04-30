---
title: 10.正则表达式匹配
toc: content
tocDepth: 4
order:10
---

## 题目  🔥🔥🔥🔥困难

给你一个字符串 `s` 和一个字符规律 `p`，请你来实现一个支持 `'.'` 和 `'*'` 的正则表达式匹配。

- `'.'` 匹配任意单个字符
- `'*'` 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 `s`的，而不是部分字符串。

### 示例 1：
```bash
输入：s = "aa", p = "a"
输出：false
解释："a" 无法匹配 "aa" 整个字符串。
```

### 示例 2:
```bash
输入：s = "aa", p = "a*"
输出：true
解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
```
### 示例 3：
```bash
输入：s = "ab", p = ".*"
输出：true
解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
```
### 提示：

- 1 <= s.length <= 20
- 1 <= p.length <= 20
- s 只包含从 a-z 的小写字母。
- p 只包含从 a-z 的小写字母，以及字符 . 和 *。
- 保证每次出现字符 * 时，前面都匹配到有效的字符

## 解题
#### 解题思路 动态规划

**从左往右扫的话**
- 字符后面是否跟着星号会影响结果，分析起来有点复杂。
- <img src="https://pic.leetcode-cn.com/073085fa67286871f76e8e9daa162bdb291a101b4314666c75379a7b0441cad6-image.png" width='250px'>

**选择从右往左扫描**
- 星号的前面肯定有一个字符，星号也只影响这一个字符，它就像一个拷贝器。
<img src='https://pic.leetcode-cn.com/5e7b1748039a2a779d7378bebc4926ef3e584e88cc22b67f3a4e18c0590bcc55-image.png' width='250px'>

- s、p 串是否匹配，取决于：最右端是否匹配、剩余的子串是否匹配。
- 只是最右端可能是特殊符号，需要分情况讨论而已。

**通用地表示出子问题**
- 大子串是否匹配，和剩余子串是否匹配，是规模不一样的同一问题。
<img src='https://pic.leetcode-cn.com/e1bcac2ad07a3a5c959bf0fe5c8ceea9bbd033c3066e7ec7f384aedd98cd95aa-image.png' width='250px'>

- **情况1：s[i−1] 和 p[j−1] 是匹配的**
    - 最右端的字符是匹配的，那么，大问题的答案 = 剩余子串是否匹配。
    - <img src='https://pic.leetcode-cn.com/f817caaa40b0c39fc3ddabfa1383a8218ab364b8e49b30e5ce85cb30a3cdc503-image.png' width='250px'>

- **情况2：s[i−1] 和 p[j−1] 是不匹配的**
    - 右端不匹配，还不能判死刑——可能是 p[j−1] 为星号造成的不匹配，星号不是真实字符，它不匹配不算数。
    - 如果 p[j−1] 不是星号，那就真的不匹配了
    - <img src='https://pic.leetcode-cn.com/fe763378879a0a52e9f17171e3bc1db18cfc83bf59f14efcd31ec9edb37adfac-image.png' width='250px'>

p[j−1]=="∗"，且 s[i−1] 和 p[j−2] 匹配
- [j−1] 是星号，并且 s[i−1] 和 p[j−2] 匹配，要考虑三种情况：
    - p[j−1] 星号可以让 p[j−2] 在 p 串中消失、出现 1 次、出现 >=2 次。
    - 只要其中一种使得剩余子串能匹配，那就能匹配，见下图 a1、a2、a3。
    - <img src='https://pic.leetcode-cn.com/a1cc0caf806f7d7f5419d820e0e7be7a364c96656a98ca4d7f351661d6a62aa6-image.png' width='250px'>

    - a3 情况：假设 s 的右端是一个 a，p 的右端是 a * ，* 让 a 重复 >= 2 次
        - 星号不是真实字符，s、p是否匹配，要看 s 去掉末尾的 a，p 去掉末尾一个 a，剩下的是否匹配。
        - 星号拷贝了 >=2 个 a，拿掉一个，剩下 >=1 个a，p 末端依旧是 a* 没变。
        - s 末尾的 a 被抵消了，继续考察 s(0,i-2) 和 p(0,i-1) 是否匹配。

p[j−1]=="∗"，但 s[i−1] 和 p[j−2] 不匹配
- s[i−1] 和 p[j−2] 不匹配，还有救，p[j−1] 星号可以干掉 p[j−2]，继续考察 s(0,i−1) 和 p(0,j−3)。
- <img src='https://pic.leetcode-cn.com/dabf2195c460052e2719340de8f2d22f791694d4443424478201be3b5d601fe1-image.png' width='250px'>

javascript
```js
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatch(s, p) {
  const m = s.length, n = p.length;
  // 定义一个二维数组 dp，其中 dp[i][j] 表示 s 的前 i 个字符和 p 的前 j 个字符是否匹配
  const dp = new Array(m + 1).fill(false).map(() => new Array(n + 1).fill(false));
  // s 和 p 都为空时，两者显然匹配
  dp[0][0] = true;
  // 当 s 为空字符串时，只有 p 的偶数位为 '*' 时才能匹配
  for (let j = 2; j <= n; j += 2) {
    dp[0][j] = p[j - 1] === '*' && dp[0][j - 2];
  }
  // i 从 1 到 m，j 从 1 到 n
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] !== '*') {
        // 当 p[j-1] 不为 '*' 时，若 s[i-1] 与 p[j-1] 相等或 p[j-1] 为 '.'，则 dp[i][j] 的值与 dp[i-1][j-1] 的值相同
        if (s[i - 1] === p[j - 1] || p[j - 1] === '.') {
          dp[i][j] = dp[i - 1][j - 1];
        }
      } else {
        // 当 p[j-1] 为 '*' 时，若 s 的前 i 个字符与 p 的前 j-2 个字符匹配，则 dp[i][j] 的值为 true
        if (dp[i][j - 2]) {
          dp[i][j] = true;
        }
        // 或者 s 的前 i-1 个字符与 p 的前 j 个字符匹配，且 s 的第 i 个字符与 p 的第 j-1 个字符相等或 p 的第 j-1 个字符为 '.'
        if (s[i - 1] === p[j - 2] || p[j - 2] === '.') {
          dp[i][j] |= dp[i - 1][j];
        }
      }
    }
  }
  // 返回 dp[m][n]，即 s 的前 m 个字符和 p 的前 n 个字符是否匹配
  return dp[m][n];
}



/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    // 动态规划 aa a*
    // dp[i][j]表示s[0-i]个和p[0-j]个是否匹配
    // 1. 当p[j]=字母时，dp[i][j] = (p[j]==s[i] && dp[i-1][j-1])
    // 2. 当p[j]='.'时，dp[i][j] = dp[i-1][j-1]
    // 3. 当p[j]='*'时，将*和前面的字母算作一个整体来考虑匹配例如a*
    //    当p[j-1]==s[i]时，则可以匹配0-多个s[i]连续相同的字符
    //                     dp[i][j] = dp[i][j-2] （当匹配0个时，丢弃掉a*）
    //                     dp[i][j] = dp[i-1][j-2] （当匹配1个时，丢掉s[i],丢弃掉a*）
    //                     dp[i][j] = dp[i-1][j] （当匹配>=1个时，丢掉s[i],不丢弃掉a*,因为可以匹配多个）
    //                     上面2种可以合并为一种，因为dp[i-1][j]包含了dp[i-1][j-2]的情况
    //    当p[j-1]!=s[i]时，相当于匹配0个a*，此时应该丢弃a*，来转移动态方程 
    //                     dp[i][j] = dp[i][j-2]

    let m = s.length
    let n = p.length

    // 初始化dp
    let dp = new Array(m + 1)
    for (var i = 0; i <= m; i++) {
        dp[i] = new Array(n + 1).fill(false)
    }
    dp[0][0] = true

    for (var i = 0; i <= m; i++) {
        for (var j = 1; j <= n; j++) {
            if (p[j - 1] !== '*') {
                // 匹配*和.
                if (i > 0 && isMatch(i - 1, j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1]
                } else {
                    dp[i][j] = false
                }
            } else {
                if (i > 0 && isMatch(i - 1, j - 2)) {
                    // a*匹配 1个或者多个
                    dp[i][j] = dp[i][j - 2] || dp[i - 1][j]
                } else {
                    // a*匹配0个，等同于a*丢弃掉
                    dp[i][j] = dp[i][j - 2]
                }
            }
        }   
    }
    return dp[m][n]

    function isMatch(i, j) {
        return (s[i] === p[j]) || p[j] === '.'
    }
};

```


typescript

```ts
//一
function isMatch(s: string, p: string): boolean {
  const m: number = s.length, n: number = p.length;
  const dp: boolean[][] = new Array(m + 1).fill(false).map(() => new Array(n + 1).fill(false));
  dp[0][0] = true;
  for (let i: number = 0; i <= m; i++) {
    for (let j: number = 1; j <= n; j++) {
      if (p[j - 1] !== '*') {
        if (i > 0 && (s[i - 1] === p[j - 1] || p[j - 1] === '.')) {
          dp[i][j] = dp[i - 1][j - 1];
        }
      } else {
        if (j > 1) {
          dp[i][j] ||= dp[i][j - 2];
        }
        if (i > 0 && j > 1 && (s[i - 1] === p[j - 2] || p[j - 2] === '.')) {
          dp[i][j] ||= dp[i - 1][j];
        }
      }
    }
  }
  return dp[m][n];
}

//二
const ZERO_OR_MORE_CHARS = '*';
const ANY_CHAR = '.';

function isMatch(text: string, pattern: string, i = 0, j = 0, cache = new Map<string, boolean>()): boolean {
  if (j === pattern.length) {
    return i === text.length;
  }

  const key = `${i},${j}`;
  if (cache.has(key)) {
    return cache.get(key);
  }

  const isCurrentMatch = i < text.length && (pattern[j] === text[i] || pattern[j] === ANY_CHAR);
  let result: boolean;

  if (pattern[j + 1] === ZERO_OR_MORE_CHARS) {
    result = (isCurrentMatch && isMatch(text, pattern, i + 1, j, cache)) || isMatch(text, pattern, i, j + 2, cache);
  } else {
    result = isCurrentMatch && isMatch(text, pattern, i + 1, j + 1, cache);
  }

  cache.set(key, result);
  return result;
}


```