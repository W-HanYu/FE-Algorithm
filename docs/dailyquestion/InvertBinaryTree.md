---
title: 226.翻转二叉树
toc: content
tocDepth: 4
---

## 题目
给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。
### 示例 1
<img src="https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg" width="300px">

```bash
输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
```

### 示例 2
<img src="https://assets.leetcode.com/uploads/2021/03/14/invert2-tree.jpg">

```bash
输入：root = [2,1,3]
输出：[2,3,1]
```
### 示例 3

```bash
输入：root = []
输出：[]
```
### 提示：

- `树中节点数目范围在 [0, 100] 内`
- `-100 <= Node.val <= 100`

## 解题

**动画演示：⬇️**

<img src="https://code-thinking.cdn.bcebos.com/gifs/%E7%BF%BB%E8%BD%AC%E4%BA%8C%E5%8F%89%E6%A0%91.gif">

### 递归

#### javascript
- 前序遍历
```js

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    // 终止条件
    if (!root) {
      return null;
    }
    // 交换左右节点
    const rightNode = root.right;
    root.right = invertTree(root.left);
    root.left = invertTree(rightNode);
    return root;
  };
```
- 中序遍历
```js
var invertTree = function(root) {
  if(!root) return null
  invertTree(root.left)
  invertTree(root.right)
  let temNode = root.left
  root.left = root.right
  root.right = temNode
  return root
};
```
- 后序遍历
```js
var invertTree = function(root) {
  if(!root) return root
  invertTree(root.left)
  let temNode = root.left
  root.left = root.right
  root.right = temNode
  invertTree(root.left)
  return root
};
```

#### typescript

- 前序遍历
```ts
function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return root;
  let tempNode: TreeNode | null = root.left;
  root.left = root.right;
  root.right = tempNode;
  invertTree(root.left);
  invertTree(root.right);
  return root;
};
```
- 中序遍历
```ts
function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return root;
  invertTree(root.left);
  let tempNode: TreeNode | null = root.left;
  root.left = root.right;
  root.right = tempNode;
  // 因为左右节点已经进行交换，此时的root.left 是原先的root.right
  invertTree(root.left);
  return root;
};
```
- 后序遍历
```ts
function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return root;
  invertTree(root.left);
  invertTree(root.right);
  let tempNode: TreeNode | null = root.left;
  root.left = root.right;
  root.right = tempNode;
  return root;
};
```

### 迭代

#### typescript
- 前序遍历
```ts
// 迭代法（栈模拟前序遍历）
function invertTree(root: TreeNode | null): TreeNode | null {
    let helperStack: TreeNode[] = [];
    let curNode: TreeNode,
        tempNode: TreeNode | null;
    if (root !== null) helperStack.push(root);
    while (helperStack.length > 0) {
        curNode = helperStack.pop()!;
        // 入栈操作最好在交换节点之前进行，便于理解
        if (curNode.right) helperStack.push(curNode.right);
        if (curNode.left) helperStack.push(curNode.left);
        tempNode = curNode.left;
        curNode.left = curNode.right;
        curNode.right = tempNode;
    }
    return root;
};
```
- 中序遍历
```ts
// 迭代法（栈模拟中序遍历-统一写法形式）
function invertTree(root: TreeNode | null): TreeNode | null {
    let helperStack: (TreeNode | null)[] = [];
    let curNode: TreeNode | null,
        tempNode: TreeNode | null;
    if (root !== null) helperStack.push(root);
    while (helperStack.length > 0) {
        curNode = helperStack.pop();
        if (curNode !== null) {
            if (curNode.right !== null) helperStack.push(curNode.right);
            helperStack.push(curNode);
            helperStack.push(null);
            if (curNode.left !== null) helperStack.push(curNode.left);
        } else {
            curNode = helperStack.pop()!;
            tempNode = curNode.left;
            curNode.left = curNode.right;
            curNode.right = tempNode;
        }
    }
    return root;
};
```

- 后序遍历
```ts
// 迭代法（栈模拟后序遍历-统一写法形式）
function invertTree(root: TreeNode | null): TreeNode | null {
    let helperStack: (TreeNode | null)[] = [];
    let curNode: TreeNode | null,
        tempNode: TreeNode | null;
    if (root !== null) helperStack.push(root);
    while (helperStack.length > 0) {
        curNode = helperStack.pop();
        if (curNode !== null) {
            helperStack.push(curNode);
            helperStack.push(null);
            if (curNode.right !== null) helperStack.push(curNode.right);
            if (curNode.left !== null) helperStack.push(curNode.left);
        } else {
            curNode = helperStack.pop()!;
            tempNode = curNode.left;
            curNode.left = curNode.right;
            curNode.right = tempNode;
        }
    }
    return root;
};

```

- 层序遍历
```ts
// 迭代法（队列模拟层序遍历）
function invertTree(root: TreeNode | null): TreeNode | null {
    const helperQueue: TreeNode[] = [];
    let curNode: TreeNode,
        tempNode: TreeNode | null;
    if (root !== null) helperQueue.push(root);
    while (helperQueue.length > 0) {
        for (let i = 0, length = helperQueue.length; i < length; i++) {
            curNode = helperQueue.shift()!;
            tempNode = curNode.left;
            curNode.left = curNode.right;
            curNode.right = tempNode;
            if (curNode.left !== null) helperQueue.push(curNode.left);
            if (curNode.right !== null) helperQueue.push(curNode.right);
        }
    }
    return root;
};

```
