---
title: 1143.最长公共子序列
toc: content
tocDepth: 4
---

## 题目 最长公共子序列（Longest Common Subsequence 简称 LCS）
## 难度  🔥🔥中等
给定两个字符串 `text1` 和 `text2`，返回这两个字符串的最长 `公共子序列` 的长度。如果不存在 `公共子序列` ，返回 `0` 。

一个字符串的 `子序列` 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

例如，`"ace"` 是 `"abcde"` 的子序列，但 `"aec" `不是 `"abcde"` 的子序列。
两个字符串的 `公共子序列` 是这两个字符串所共同拥有的子序列。

#### 示例 1：

```bash
输入：text1 = "abcde", text2 = "ace"
输出：3
解释：最长公共子序列是 "ace" ，它的长度为 3 。
```

#### 示例 2：

```bash
输入：text1 = "abc", text2 = "abc"
输出：3
解释：最长公共子序列是 "abc" ，它的长度为 3 。
```

#### 示例 3：
```bash
输入：text1 = "abc", text2 = "def"
输出：0
解释：两个字符串没有公共子序列，返回 0 。
```

#### 提示：

```bash
- 1 <= text1.length, text2.length <= 1000
- text1 和 text2 仅由小写英文字符组成。
```

## 代码

首先，子序列问题本身就相对子串、子数组更困难一些，因为前者是不连续的序列，而后两者是连续的，就算穷举你都不一定会，更别说求解相关的算法问题了。

而且，子序列问题很可能涉及到两个字符串，比如` 最长公共子序列`，如果没有一定的处理经验，真的不容易想出来。所以本文就来扒一扒子序列问题的套路，其实就有两种模板，相关问题只要往这两种思路上想，十拿九稳。

一般来说，这类问题都是让你求一个最长子序列，因为最短子序列就是一个字符嘛，没啥可问的。`一旦涉及到子序列和最值，那几乎可以肯定，考察的是动态规划技巧`，时间复杂度一般都是 `O(n^2`)。

原因很简单，你想想一个字符串，它的子序列有多少种可能？起码是指数级的吧，这种情况下，不用动态规划技巧，还想怎么着？

既然要用动态规划，那就要定义 `dp` 数组，找状态转移关系。我们说的两种思路模板，就是` dp` 数组的定义思路。不同的问题可能需要不同的 `dp `数组定义来解决。

### 解法一 暴力算法
最简单的暴力算法就是，把 `text1` 和 `text2` 的所有子序列都穷举出来，然后看看有没有公共的，然后在所有公共子序列里面再寻找一个长度最大的。

显然，这种思路的复杂度非常高，你要穷举出所有子序列，这个复杂度就是指数级的，**肯定不实际**。(`大家可以自己尝试`)

### 解法二 动态规划
这个题目是典型的`二维动态规划问题`,就以本题而言，假设 `text1` 的长度为 `m`，`text2` 的长度为 `n`，那么，`dp` 数组的定义就是 `dp[i][j]` 表示 `text1` 的前 `i` 个字符和 `text2` 的前 `j` 个字符的最长公共子序列的长度。

`dp[i][j]` 的状态转移关系就是:，
 - 如果 `text1[i-1] == text2[j-1]`，那么 `dp[i][j] = dp[i-1][j-1] + 1`，
 - 否则 `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`。

对于边界处理：
- 当 `i=0`时，text1[0,i] 为空，空字符串和任何字符串的最长公共子序列的长度都是 `0`，因此对任意` 0<=j<=n ,有 dp[0][j]=0`，
- 当 `j=0`时，text2[0,j]为空，同理可得，对任意 `0<=i<=m ，有 dp[i][0]=0`。

所以动态规划的边界情况是：当 `i= 0 ||  j = 0时, dp[i][j] = 0`。

#### typescript
```typescript
function longestCommonSubsequence(text1: string, text2: string): number {
    /**
     * 动态规划
     */

    const m = text1.length , n = text2.length
    const dp = new Array(m+1).fill(0).map(()=>new Array(n+1).fill(0))

    for(let i = 1; i < m+1;i++){
        for(let j = 1; j < n+1;j++){
            if(text1.charAt(i-1) === text2.charAt(j-1)){
                dp[i][j] = 1 + dp[i-1][j-1]
            }else{
                dp[i][j] = Math.max(dp[i][j-1],dp[i-1][j])
            }
        }
    }
    return dp[m][n]

};
```


#### javascript
```javascript
function longestCommonSubsequence(text1, text2) {
    const m = text1.length , n = text2.length
    const dp = new Array(m+1).fill(0).map(()=>new Array(n+1).fill(0))

    for(let i = 1; i < m+1;i++){
        for(let j = 1; j < n+1;j++){
            if(text1.charAt(i-1) === text2.charAt(j-1)){
                dp[i][j] = 1 + dp[i-1][j-1]
            }else{
                dp[i][j] = Math.max(dp[i][j-1],dp[i-1][j])
            }
        }
    }
    return dp[m][n]
};
```



