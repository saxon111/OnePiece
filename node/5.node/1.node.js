// const fs = require("fs");

// fs.readFile;

// var sumOddLengthSubarrays = function(arr) {

//     let res = 0
//    for (let i = 0; i < arr.length;i++) {
//        for (let j = i; j < arr.length; j++) {
//            if ((j - i) % 2 === 0) {
//                const temp = arr.slice(i, j + 1)
//                res += temp.reduce((sum, cur) => sum += cur, 0)
//            }
//        }
//    }
//     return res

// };

// console.log(sumOddLengthSubarrays([1, 4, 2, 5, 3]));


// var minSubarray = function(nums, p) {
//     let res = Infinity
//     let paths = []
//     const sum = nums.reduce((pre, cur) => pre += cur, 0)
//     const helper = (path, curSum, rest) => {
//         if (rest.length === 0) {
//             return
//         }
//         if (rest.length > 0 && curSum % p === 0 ) {
//             res = Math.min(res, path.length)
//             paths.push(path.slice())
//             return
//         }
//         for (let i = 0; i < rest.length; i++) {
//             path.push(nums[i])
//             curSum = curSum - nums[i]
//             helper(path, curSum, rest.filter((item,index) => index !== i) )
//             curSum = curSum + nums[i]
//             path.pop()
//         }
//     }
//     helper([], sum, nums )
//     return paths.length === 0 ? -1 : res

// };


// var subsets = function(nums) {
//     const res = []
//     res.push()
//     const helper = (sub,idx) => {
//         if(idx >= nums.length) {
//             return
//         }
//         res.push(sub.slice())
//         for (let i = idx; i < nums.length; i++) {
//             sub.push(nums[i])
//             helper(sub, i + 1)
//             sub.pop()
//         }
//     }
//     helper([], 0)
//     return res
// };

// console.log(subsets([1,2,3]))

// var reorderSpaces = function(text) {
//     let space = 0
//     let letterNum = 0
//     if (text[0] !== ' ') {
//         letterNum = 1
//     }
//     else {
//         space = 1
//     }
//     for (let i = 1; i < text.length; i++) {
//         if (text[i] === ' ') {
//             space += 1
//         }
//         if (text[i-1] === ' ' && text[i] !== ' ') {
//             letterNum += 1
//         }
//     }
//     const divide = Math.floor(space / (letterNum - 1))
//     const rest = space % (letterNum - 1)
//     const arr = text.split(' ')
//     const res = []
//     for(let i = 0; i < arr.length;i++) {
//         if(arr[i].length > 0) {
//             res.push(arr[i])
//         }
//     }
//     let diviStr = ' '.repeat(divide)
//     let resStr = arr.join(diviStr)
//     return rest === 0 ? resStr : resStr + ' '.repeat(rest)
    
// };

// console.log(this)


// console.log(process.platform)
// console.log(process.cwd())

console.log(process.argv.slice(2))