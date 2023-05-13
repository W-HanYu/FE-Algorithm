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
