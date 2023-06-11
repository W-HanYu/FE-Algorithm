import { defineConfig } from 'dumi';
const repo = 'FE_Algorithm'; // 项目名
export default defineConfig({
  favicons: [
    'public/favicon.ico',
  ],
  base: process.env.NODE_ENV === 'production' ? `/${repo}/` : '/',
  publicPath: process.env.NODE_ENV === 'production' ? `/${repo}/` : '/',
  themeConfig: {
    name: 'Ustinian',
    // title: 'algorithm',
    logo: false,
    nav: [
      { title: '每日一题', link: '/dailyquestion/two-sum' },
      { title: '算法',link: '/algorithm/stack/reversePolish',},
      { title: '挑战', link: '/challenge' },
      { title: '数据结构', link: '/datastr/structure' },
      { title: 'React中的算法', link: '/react/bitfield' },
      {
        title: 'Github',
        link: 'https://github.com/W-HanYu/FE-Algorithm',
      },
    ],
    sidebar: {
      '/algorithm/dynamic/': [
        {
          title:'数组',
          children:[

          ]
        },
        {
          title: '链表相关',
          children: [
            {
              link: '/algorithm/chainList/reversePolish',
              title: '01.奇偶链表',
              order: 1,
              frontmatter: { title: '' },
            },
            {
              link: '/algorithm/chainList/stockTiming',
              title: '02.删除链表重复元素II',
              order: 2,
              frontmatter: { title: '' },
            },
            {
              link: '/algorithm/chainList/decoding',
              title: '03.删除链表重复元素',
              order: 3,
              frontmatter: { title: '' },
            },
          ],
        },
        {
          title:'哈希表',
          children:[]
        },
        {
          title:'字符串',
          children:[]
        },
        {
          title:'双指针',
          children:[]
        },
        {
          title: '栈与队列',
          children: [
            {
              link: '/algorithm/stack/reversePolish',
              title: '01.逆波兰表达式求值',
              order: 1,
              frontmatter: { title: '' },
            },
            {
              link: '/algorithm/stack/topKFrequentElements',
              title: '02.前K个高频元素',
              order: 2,
              frontmatter: { title: '' },
            },
            {
              link: '/algorithm/stack/decoding',
              title: '03.删除相邻重复项',
              order: 3,
              frontmatter: { title: '' },
            },
          ],
        },
        {
          title:'二叉树',
          children:[]
        },
        {
          title:'回溯算法',
          children:[]
        },
        {
          title:'贪心算法',
          children:[]
        },
        {
          title: '动态规划',
          children: [
            {
              link: '/algorithm/dynamic/subsequence',
              title: '01.不同的子序列',
              order: 1,
              frontmatter: { title: '' },
            },
            {
              link: '/algorithm/dynamic/stockTiming',
              title: '02.买卖股票的最佳时机 III',
              order: 2,
              frontmatter: { title: '' },
            },
            {
              link: '/algorithm/dynamic/decoding',
              title: '03.解码问题',
              order: 3,
              frontmatter: { title: '' },
            },
          ],
        },
      ],

    },
    prefersColor: { default: 'dark', switch: true },
    footer: `Ustinian MIT Licensed | Copyright © 2023-present
<br />
Powered by Ustinian`,
  },
});
