---
title: 19. 删除链表的倒数第 N 个结点
toc: content
tocDepth: 4
---
## 题目 🔥🔥 中等
给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

### 示例 1
<img src="https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg" width="300px">

```bash
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

### 示例 2：
```bash
输入：head = [1], n = 1
输出：[]
```
### 示例 3：

```bash
输入：head = [1,2], n = 1
输出：[1]
```
### 提示：

- `链表中结点的数目为 sz`
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

## 解题
### 解法一 计算链表长度
**解题思路：⬇️**
- 首先遍历求出链表长度 `len`;
- 再次从头遍历链表，当遍历到`len - n +1 `时，该节点就是需要删除的；
- 但是为了方便删除，我们从 哑巴节点 开始 那么`len - n +1 `的下一节点 就是需要删除的节点
- 注意处理一些边界条件 `len <=0 || len < n` 说明在这里无删除节点；

<img src="https://assets.leetcode-cn.com/solution-static/19/p1.png" width="400px">

**javascript：⬇️**
```js
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let node = head
    let a=0
    while(node!=null){
        node=node.next
        a++  //求出链表长度
    }
    if(n<=0||a<n){  //说明n所在位置无节点
        return head
    }
    if(n===a){
        return head.next
    }
    node=head
    for(let i=0 ;i<a-n-1 ; i++){
        node=node.next
    }
    node.next=node.next.next
    return head
};
```

**typescript：⬇️**
```ts
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    let node:ListNode|null = head
    let len:number = 0
    while(node!==null){
        node = node.next
        len++
    }
    if(n <= 0 || len > n){
        return head
    }
    if(len === n){
        return head.next
    }
    node = head
    for(let i:number = 0; i < len-n-1;i++){ //找到要出的那个节点的前一个节点
        node = node.next
    }
    //删除该节点
    node.next = node.next.next
    return node
};
```


### 解法二 双指针
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode()
    dummy.next = head
    let fast = dummy, slow = dummy
    for (let i = 0; i < n; i++) {
        fast = fast.next
    }
    while (fast.next) {
        fast = fast.next
        slow = slow.next
    }
    slow.next = slow.next.next
    return dummy.next
};
```

```ts
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode()
    dummy.next = head
    let fast = dummy, slow = dummy
    for (let i = 0; i < n; i++) {
        fast = fast.next
    }
    while (fast.next) {
        fast = fast.next
        slow = slow.next
    }
    slow.next = slow.next.next
    return dummy.next
};
```





