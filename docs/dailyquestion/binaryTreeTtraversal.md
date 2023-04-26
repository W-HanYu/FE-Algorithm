---
title: 99.二叉树的遍历
toc: content
tocDepth: 4
---
## 知识点
这次我们要好好谈一谈递归，为什么很多同学看递归算法都是“一看就会，一写就废”。

主要是对递归不成体系，没有方法论，每次写递归算法 ，都是靠玄学来写代码，代码能不能编过都靠运气。

本篇将介绍前后中序的递归写法，一些同学可能会感觉很简单，其实不然，我们要通过简单题目把方法论确定下来，有了方法论，后面才能应付复杂的递归。

这里帮助大家确定下来递归算法的**三个要素**。每次写递归，都按照这三要素来写，可以保证大家写出正确的递归算法！

1. 确定递归函数的参数和返回值： 确定哪些参数是递归的过程中需要处理的，那么就在递归函数里加上这个参数， 并且还要明确每次递归的返回值是什么进而确定递归函数的返回类型。

2. 确定终止条件： 写完了递归算法, 运行的时候，经常会遇到栈溢出的错误，就是没写终止条件或者终止条件写的不对，操作系统也是用一个栈的结构来保存每一层递归的信息，如果递归没有终止，操作系统的内存栈必然就会溢出。

3. 确定单层递归的逻辑： 确定每一层递归需要处理的信息。在这里也就会重复调用自己来实现递归的过程。

好了，我们确认了递归的三要素，接下来就来练练手：
以下以前序遍历为例：

1. 确定递归函数的参数和返回值：因为要打印出前序遍历节点的数值，所以参数里需要传入vector来放节点的数值，除了这一点就不需要再处理什么数据了也不需要有返回值，所以递归函数返回类型就是void，代码如下：
```c
void traversal(TreeNode* cur, vector<int>& vec)
```
2. 确定终止条件：在递归的过程中，如何算是递归结束了呢，当然是当前遍历的节点是空了，那么本层递归就要结束了，所以如果当前遍历的这个节点是空，就直接return，代码如下：
```c
if (cur == NULL) return;
```
3. 确定单层递归的逻辑：前序遍历是中左右的循序，所以在单层递归的逻辑，是要先取中节点的数值，代码如下：
```c
vec.push_back(cur->val);    // 中
traversal(cur->left, vec);  // 左
traversal(cur->right, vec); // 右
```
## 题目
### [前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)
<details><summary>代码示例</summary>
给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

#### 示例 1：

![](https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg)
输入：root = [1,null,2,3]
输出：[1,2,3]
#### 示例 2：

输入：root = []
输出：[]
#### 示例 3：

输入：root = [1]
输出：[1]
#### 示例 4：
![](https://assets.leetcode.com/uploads/2020/09/15/inorder_5.jpg)
输入：root = [1,2]
输出：[1,2]
#### 示例 5：
![](https://assets.leetcode.com/uploads/2020/09/15/inorder_4.jpg)
输入：root = [1,null,2]
输出：[1,2]
 

#### 提示：

树中节点数目在范围 [0, 100] 内
-100 <= Node.val <= 100

</details>

#### 进阶：递归算法很简单，你可以通过迭代算法完成吗？
### [中序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)

<details><summary>代码示例</summary>

给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。

#### 示例 1：

![](https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg)
输入：root = [1,null,2,3]
输出：[1,3,2]
#### 示例 2：

输入：root = []
输出：[]
#### 示例 3：

输入：root = [1]
输出：[1]
 

#### 提示：

树中节点数目在范围 [0, 100] 内
-100 <= Node.val <= 100
 

#### 进阶: 递归算法很简单，你可以通过迭代算法完成吗？

</details>

### [后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)

<details><summary>代码示例</summary>

给你一棵二叉树的根节点 root ，返回其节点值的 后序遍历 。

#### 示例 1：

![](https://assets.leetcode.com/uploads/2020/08/28/pre1.jpg)
输入：root = [1,null,2,3]
输出：[3,2,1]
#### 示例 2：

输入：root = []
输出：[]
#### 示例 3：

输入：root = [1]
输出：[1]
 

#### 提示：

树中节点的数目在范围 [0, 100] 内
-100 <= Node.val <= 100
 

#### 进阶：递归算法很简单，你可以通过迭代算法完成吗？

</details>

## 解法一

javascript

1. 前序遍历

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let res=[];
    const dfs=function(root){
        if(root===null)return ;
        //先序遍历所以从父节点开始
        res.push(root.val);
        //递归左子树
        dfs(root.left);
        //递归右子树
        dfs(root.right);
    }
    //只使用一个参数 使用闭包进行存储结果
    dfs(root);
    return res;
};
```
2. 中序遍历
```js
var inorderTraversal = function(root) {
    let res=[];
    const dfs=function(root){
        if(root===null){
            return ;
        }
        dfs(root.left);
        res.push(root.val);
        dfs(root.right);
    }
    dfs(root);
    return res;
};
```
3. 后序遍历
```js
var postorderTraversal = function(root) {
    let res=[];
    const dfs=function(root){
        if(root===null){
            return ;
        }
        dfs(root.left);
        dfs(root.right);
        res.push(root.val);
    }
    dfs(root);
    return res;
};

```


typescript

1. 前序遍历

```js
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function preorderTraversal(root: TreeNode | null): number[] {
    function traverse(node: TreeNode | null, res: number[]): void {
        if (node === null) return;
        res.push(node.val);
        traverse(node.left, res);
        traverse(node.right, res);
    }
    const res: number[] = [];
    traverse(node, res);
    return res;
};
```
2. 中序遍历
```js
function inorderTraversal(node: TreeNode | null): number[] {
    function traverse(node: TreeNode | null, res: number[]): void {
        if (node === null) return;
        traverse(node.left, res);
        res.push(node.val);
        traverse(node.right, res);
    }
    const res: number[] = [];
    traverse(node, res);
    return res;
}
```
3. 后序遍历
```js
function postorderTraversal(node: TreeNode | null): number[] {
    function traverse(node: TreeNode | null, res: number[]): void {
        if (node === null) return;
        traverse(node.left, res);
        traverse(node.right, res);
        res.push(node.val);
    }
    const res: number[] = [];
    traverse(node, res);
    return res;
}

```

## 解法二
