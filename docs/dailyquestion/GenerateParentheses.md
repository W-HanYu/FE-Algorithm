---
title: 22. 括号生成
toc: content
tocDepth: 4
---

## 题目 🔥🔥中等

数字 `n` 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 `有效的` 括号组合。

 

### 示例 1：
```bash
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
```

### 示例 2：
```bash
输入：n = 1
输出：["()"]
```
### 提示：
- `1 <= n <= 8`

## 解题
这是一道回溯的题目，对于回溯算法不了解的同学，可以先看看我这篇文章 -->> [回溯算法](../datastr/backtrack.md)
### 解法一 回溯+剪枝
**思路：⬇️**
本题就是 `左括号` 、`右括号` 的一个选择
有几个注意的点：
- 主要有`(` ,就可以选
- 对于 `)` ,只有右括号多于左括号时，才可以选择；

回溯算法的三部曲：
1. 回溯函数模板返回值以及参数
    - `const dfs = (leftRemain:number,rightRemain:number,str:string):string[] =>{}`
2. 回溯函数终止条件
    -  ```bash 
            if(str.length == 2 * n){
                res.push(str)
                return res
            }
       ```
3. 回溯搜索的遍历过程
    - 使用递归 
    ```bash
            //只要左括号有剩余 就可以选左括号
            if(leftRemain > 0){
                dfs(leftRemain-1,rightRemain,str+'(')
            }

            //只有右括号 > 左括号数量 才可以选右括号
            if(rightRemain > leftRemain){
                dfs(leftRemain,rightRemain-1,str+')')
        }
    ```

- 画图演示
<img src = '../../assets/daily-question/GenerateParentheses.png'>

**javascript：⬇️**

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let res = [];
    const dfs = (leftRemain,rightRemain,str)=>{
        //出口
        if(str.length == 2 * n){
            res.push(str)
            return res
        }
        //只要左括号有剩余 就可以选左括号
        if(leftRemain > 0){
            dfs(leftRemain-1,rightRemain,str+'(')
        }

        //只有右括号 > 左括号数量 才可以选右括号
        if(rightRemain > leftRemain){
            dfs(leftRemain,rightRemain-1,str+')')
        }
    }
    dfs(n,n,'')
    return res
};
```

**typescript： ⬇️**
```ts
function generateParenthesis(n: number): string[] {
    let res:string[] = [];
    const dfs = (leftRemain:number,rightRemain:number,str:string):string[]=>{
        //出口
        if(str.length == 2 * n){
            res.push(str)
            return res
        }
        //只要左括号有剩余 就可以选左括号
        if(leftRemain > 0){
            dfs(leftRemain-1,rightRemain,str+'(')
        }

        //只有右括号 > 左括号数量 才可以选右括号
        if(rightRemain > leftRemain){
            dfs(leftRemain,rightRemain-1,str+')')
        }
    }
    dfs(n,n,'')
    return res
};

```

**typescript：⬇️**
```ts


// n = 1 ()
// n = 2 ()() / (())
// n = 3 ()()() / ()(()) / (())() / (()()) / ((()))

function generateParenthesis(n: number): string[] {

  const dp = [[], ["()"]]; // n = 1

  for (let i = 2; i <=n; i++) {
    const prev = dp[i - 1];
    dp[i] = [];
    // 去除prev中的每种组合，放入栈中，并将()与栈中的元素组合
    // @ts-ignore
    const temp = new Map();
    for (let j = 0; j < prev.length; j++) {
      const group = prev[j];


      for (let k = 0; k < group.length; k++) {
        if (group[k] === ')') {
          const newGroup = group.substring(0, k) + '()' + group.substring(k);
          if (temp.has(newGroup)) {
            continue;
          }
          temp.set(newGroup, true);
          dp[i].push(newGroup);
        }
      }

      const first = '()' + group;
      if (temp.has(first)) {
        continue;
      }
      // 从左至右遍历group，若当前为')'，则把"()"插入到')'之前
      temp.set(first, true);
      dp[i].push(first);

    }
  }

  return dp[n];
};
```

