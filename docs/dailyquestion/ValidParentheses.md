---
title: 20. 有效的括号
toc: content
tocDepth: 4
---

## 题目 🔥简单
给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。


### 示例 1：
```bash
输入：s = "()"
输出：true
```

### 示例 2：
```bash
输入：s = "()[]{}"
输出：true
```

### 示例 3：
```bash
输入：s = "(]"
输出：false
```
### 提示：

- `1 <= s.length <= 104`
- `s 仅由括号 '()[]{}' 组成`

## 解题
### 解法一  String 原生 APi

使用`replace` 将 `s`中出现的 `（）`、`[]` 、`{}` 均替换成 `''`；
判断 处理后的字符串和原先的进行 `===` 比较;

**javascript：⬇️**
```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    while(s.length){
        let tem = s;
        s = s.replace('()','')
        s = s.replace('[]','')
        s = s.replace('{}','')
        if(tem === s) return false
    }
    return true
}
```

**typescript：⬇️**

```ts
function isValid(s:string):boolean{
    while(s.length){
        let tem:string = s;
        s = s.replace('()','')
        s = s.replace('[]','')
        s = s.replace('{}','')
        if(tem === s) return false
    }
    return true
}

```

### 解法二 栈
**思路：⬇️**

- 借用一个 栈 `stack = []` 来存储`左括号`;
- 记录栈中括号的数量`count`;
- 当遇到`右括号`时，判断栈顶的括号和此括号是不是配套的；
    - 若是：则弹出栈顶的括号，`count--`
    - 若不是：则`直接退出` 返回`false`

- 最后判断 `count === 0`；

**javascript：⬇️**

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let queue = []  //存放左括号
    let count  = 0; //记录栈中存放的左括号的数量
    for(let i = 0; i < s.length;i++){
        if(s[i] == '(' || s[i] == '[' || s[i] == '{'){
            queue.push(s[i])
            count++
        }
        if(s[i] == ')'){
            if(queue[queue.length-1] == '('){
                queue.pop();
                count--
            }else{
                return false;
            }

        }
        if(s[i] == ']'){
            if(queue[queue.length-1] == '['){
                queue.pop();
                count--
            }else{
                return false;
            }

        }
        if(s[i] == '}'){
            if(queue[queue.length-1] == '{'){
                queue.pop();
                count--
            }else{
                return false;
            }

        }
    }
    return count == 0;   //当count = 0 时。说明括号的是有效的
}
```

**typescript：⬇️**
```ts
function isValid(s:string):boolean{
    let queue:string[] = []  //存放左括号
    let count:number  = 0; //记录栈中存放的左括号的数量
    for(let i:number = 0; i < s.length;i++){
        if(s[i] == '(' || s[i] == '[' || s[i] == '{'){
            queue.push(s[i])
            count++
        }
        if(s[i] == ')'){
            if(queue[queue.length-1] == '('){
                queue.pop();
                count--
            }else{
                return false;
            }

        }
        if(s[i] == ']'){
            if(queue[queue.length-1] == '['){
                queue.pop();
                count--
            }else{
                return false;
            }

        }
        if(s[i] == '}'){
            if(queue[queue.length-1] == '{'){
                queue.pop();
                count--
            }else{
                return false;
            }

        }
    }
    return count == 0;   //当count = 0 时。说明括号的是有效的
}


```

### 解法三 哈希表
**思路：⬇️**
- 将三对括号保存到map｜object中
- 维护一个数组`res=[]`，当遇到左括号时，存到数组中；遇到右括号时，对比 `flag = 数组末尾的左括号 === 哈希表中对应的value`;
    - flag:true --- continue
    - flag:false --- return false
- 最后 return  `res.length === 0`

**javascript：⬇️**
```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let map = new Map()
    map.set("}","{").set("]","[").set(")","(")
    let len = s.length;
    const stack = [];
    for(let i = 0; i < len; i++){
        if(s[i] === '{' || s[i] === '[' || s[i] === '('){
            stack.push(s[i])
        }else if(s[i] === '}' || s[i] === ']' || s[i] === ')'){
            let tem = stack.pop();
            if(tem === map.get(s[i])) continue;
            return false;
        }
    }
    return stack.length === 0;
}
```

**typescript：⬇️**
```ts
function isValid(s: string): boolean {
    let map:Map<string,string> = new Map()
    map.set("}","{").set("]","[").set(")","(")
    let len = s.length;
    const stack:string[] = [];
    for(let i = 0; i < len; i++){
        if(s[i] === '{' || s[i] === '[' || s[i] === '('){
            stack.push(s[i])
        }else if(s[i] === '}' || s[i] === ']' || s[i] === ')'){
            let tem = stack.pop();
            if(tem === map.get(s[i])) continue;
            return false;
        }
    }
    return stack.length === 0;
};
```