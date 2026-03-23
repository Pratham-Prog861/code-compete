import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { problems, testCases } from "./schema";
import { eq } from "drizzle-orm";

async function seed() {
  const { db } = await import("./index");

  console.log("Seeding database...");

  const problemsData = [
    {
      title: "Two Sum",
      slug: "two-sum",
      functionName: "twoSum",
      functionParams: ["nums", "target"],
      comparisonRule: "unordered" as const,
      description: `
Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

### Example 1:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

### Constraints:
* \`2 <= nums.length <= 10^4\`
* \`-10^9 <= nums[i] <= 10^9\`
* \`-10^9 <= target <= 10^9\`
      `,
      difficulty: "Easy" as const,
      points: 10,
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  
};`,
        python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        `,
      },
      testCases: [
        { input: JSON.stringify({ nums: [2, 7, 11, 15], target: 9 }), expectedOutput: "[0,1]", isHidden: false },
        { input: JSON.stringify({ nums: [3, 2, 4], target: 6 }), expectedOutput: "[1,2]", isHidden: false },
        { input: JSON.stringify({ nums: [3, 3], target: 6 }), expectedOutput: "[0,1]", isHidden: true },
      ],
    },
    {
      title: "Palindrome Number",
      slug: "palindrome-number",
      functionName: "isPalindrome",
      functionParams: ["x"],
      comparisonRule: "strict" as const,
      description: `
Given an integer \`x\`, return \`true\` if \`x\` is a **palindrome**, and \`false\` otherwise.

### Example 1:
\`\`\`
Input: x = 121
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: x = -121
Output: false
\`\`\`

### Example 3:
\`\`\`
Input: x = 10
Output: false
\`\`\`
      `,
      difficulty: "Easy" as const,
      points: 10,
      starterCode: {
        javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  
};`,
        python: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        `,
      },
      testCases: [
        { input: JSON.stringify({ x: 121 }), expectedOutput: "true", isHidden: false },
        { input: JSON.stringify({ x: -121 }), expectedOutput: "false", isHidden: false },
        { input: JSON.stringify({ x: 10 }), expectedOutput: "false", isHidden: true },
      ],
    },
    {
      title: "Reverse String",
      slug: "reverse-string",
      functionName: "reverseString",
      functionParams: ["s"],
      comparisonRule: "strict" as const,
      description: `
Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array **in-place** with O(1) extra memory.

### Example 1:
\`\`\`
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
\`\`\`

### Example 2:
\`\`\`
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
\`\`\`
      `,
      difficulty: "Easy" as const,
      points: 10,
      starterCode: {
        javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
  
};`,
        python: `class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        `,
      },
      testCases: [
        { input: JSON.stringify({ s: ["h","e","l","l","o"] }), expectedOutput: '["o","l","l","e","h"]', isHidden: false },
        { input: JSON.stringify({ s: ["H","a","n","n","a","h"] }), expectedOutput: '["h","a","n","n","a","H"]', isHidden: true },
      ],
    },
    {
      title: "Valid Parentheses",
      slug: "valid-parentheses",
      functionName: "isValid",
      functionParams: ["s"],
      comparisonRule: "strict" as const,
      description: `
Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\` and \`'['\`, \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

### Example 1:
\`\`\`
Input: s = "()"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`

### Example 3:
\`\`\`
Input: s = "(]"
Output: false
\`\`\`
      `,
      difficulty: "Easy" as const,
      points: 10,
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  
};`,
        python: `class Solution:
    def isValid(self, s: str) -> bool:
        `,
      },
      testCases: [
        { input: JSON.stringify({ s: "()" }), expectedOutput: "true", isHidden: false },
        { input: JSON.stringify({ s: "()[]{}" }), expectedOutput: "true", isHidden: false },
        { input: JSON.stringify({ s: "(]" }), expectedOutput: "false", isHidden: true },
      ],
    },
    {
      title: "Fizz Buzz",
      slug: "fizz-buzz",
      functionName: "fizzBuzz",
      functionParams: ["n"],
      comparisonRule: "strict" as const,
      description: `
Given an integer \`n\`, return a string array \`answer\` (1-indexed) where:

* \`answer[i] == "FizzBuzz"\` if \`i\` is divisible by 3 and 5.
* \`answer[i] == "Fizz"\` if \`i\` is divisible by 3.
* \`answer[i] == "Buzz"\` if \`i\` is divisible by 5.
* \`answer[i] == i\` (as a string) if none of the above conditions are true.

### Example 1:
\`\`\`
Input: n = 3
Output: ["1","2","Fizz"]
\`\`\`

### Example 2:
\`\`\`
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
\`\`\`
      `,
      difficulty: "Easy" as const,
      points: 10,
      starterCode: {
        javascript: `/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function(n) {
  
};`,
        python: `class Solution:
    def fizzBuzz(self, n: int) -> List[str]:
        `,
      },
      testCases: [
        { input: JSON.stringify({ n: 3 }), expectedOutput: '["1","2","Fizz"]', isHidden: false },
        { input: JSON.stringify({ n: 5 }), expectedOutput: '["1","2","Fizz","4","Buzz"]', isHidden: false },
        { input: JSON.stringify({ n: 15 }), expectedOutput: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]', isHidden: true },
      ],
    },
    {
      title: "Maximum Subarray",
      slug: "maximum-subarray",
      functionName: "maxSubArray",
      functionParams: ["nums"],
      comparisonRule: "strict" as const,
      description: `
Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

### Example 1:
\`\`\`
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1]
Output: 1
\`\`\`
      `,
      difficulty: "Medium" as const,
      points: 20,
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  
};`,
        python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        `,
      },
      testCases: [
        { input: JSON.stringify({ nums: [-2,1,-3,4,-1,2,1,-5,4] }), expectedOutput: "6", isHidden: false },
        { input: JSON.stringify({ nums: [1] }), expectedOutput: "1", isHidden: false },
        { input: JSON.stringify({ nums: [5,4,-1,7,8] }), expectedOutput: "23", isHidden: true },
      ],
    },
    {
      title: "Merge Intervals",
      slug: "merge-intervals",
      functionName: "merge",
      functionParams: ["intervals"],
      comparisonRule: "strict" as const,
      description: `
Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.

### Example 1:
\`\`\`
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
\`\`\`

### Example 2:
\`\`\`
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
\`\`\`
      `,
      difficulty: "Medium" as const,
      points: 20,
      starterCode: {
        javascript: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  
};`,
        python: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        `,
      },
      testCases: [
        { input: JSON.stringify({ intervals: [[1,3],[2,6],[8,10],[15,18]] }), expectedOutput: "[[1,6],[8,10],[15,18]]", isHidden: false },
        { input: JSON.stringify({ intervals: [[1,4],[4,5]] }), expectedOutput: "[[1,5]]", isHidden: false },
        { input: JSON.stringify({ intervals: [[1,4],[0,4]] }), expectedOutput: "[[0,4]]", isHidden: true },
      ],
    },
    {
      title: "Product of Array Except Self",
      slug: "product-of-array-except-self",
      functionName: "productExceptSelf",
      functionParams: ["nums"],
      comparisonRule: "strict" as const,
      description: `
Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

### Example 1:
\`\`\`
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
\`\`\`
      `,
      difficulty: "Medium" as const,
      points: 20,
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  
};`,
        python: `class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        `,
      },
      testCases: [
        { input: JSON.stringify({ nums: [1,2,3,4] }), expectedOutput: "[24,12,8,6]", isHidden: false },
        { input: JSON.stringify({ nums: [-1,1,0,-3,3] }), expectedOutput: "[0,0,9,0,0]", isHidden: false },
        { input: JSON.stringify({ nums: [2,3] }), expectedOutput: "[3,2]", isHidden: true },
      ],
    },
    {
      title: "Longest Common Prefix",
      slug: "longest-common-prefix",
      functionName: "longestCommonPrefix",
      functionParams: ["strs"],
      comparisonRule: "strict" as const,
      description: `
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string \`""\`.

### Example 1:
\`\`\`
Input: strs = ["flower","flow","flight"]
Output: "fl"
\`\`\`

### Example 2:
\`\`\`
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no such common prefix.
\`\`\`
      `,
      difficulty: "Easy" as const,
      points: 10,
      starterCode: {
        javascript: `/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  
};`,
        python: `class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        `,
      },
      testCases: [
        { input: JSON.stringify({ strs: ["flower","flow","flight"] }), expectedOutput: '"fl"', isHidden: false },
        { input: JSON.stringify({ strs: ["dog","racecar","car"] }), expectedOutput: '""', isHidden: false },
        { input: JSON.stringify({ strs: ["cir","car"] }), expectedOutput: '"c"', isHidden: true },
      ],
    },
    {
      title: "Climbing Stairs",
      slug: "climbing-stairs",
      functionName: "climbStairs",
      functionParams: ["n"],
      comparisonRule: "strict" as const,
      description: `
You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

### Example 1:
\`\`\`
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top:
1. 1 step + 1 step
2. 2 steps
\`\`\`

### Example 2:
\`\`\`
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top:
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
\`\`\`
      `,
      difficulty: "Easy" as const,
      points: 10,
      starterCode: {
        javascript: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  
};`,
        python: `class Solution:
    def climbStairs(self, n: int) -> int:
        `,
      },
      testCases: [
        { input: JSON.stringify({ n: 2 }), expectedOutput: "2", isHidden: false },
        { input: JSON.stringify({ n: 3 }), expectedOutput: "3", isHidden: false },
        { input: JSON.stringify({ n: 5 }), expectedOutput: "8", isHidden: true },
      ],
    },
    {
      title: "Binary Search",
      slug: "binary-search",
      functionName: "search",
      functionParams: ["nums", "target"],
      comparisonRule: "strict" as const,
      description: `
Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with O(log n) runtime complexity.

### Example 1:
\`\`\`
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
\`\`\`

### Example 2:
\`\`\`
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
\`\`\`
      `,
      difficulty: "Easy" as const,
      points: 10,
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  
};`,
        python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        `,
      },
      testCases: [
        { input: JSON.stringify({ nums: [-1,0,3,5,9,12], target: 9 }), expectedOutput: "4", isHidden: false },
        { input: JSON.stringify({ nums: [-1,0,3,5,9,12], target: 2 }), expectedOutput: "-1", isHidden: false },
        { input: JSON.stringify({ nums: [5], target: 5 }), expectedOutput: "0", isHidden: true },
      ],
    },
    {
      title: "Remove Duplicates from Sorted Array",
      slug: "remove-duplicates",
      functionName: "removeDuplicates",
      functionParams: ["nums"],
      comparisonRule: "strict" as const,
      description: `
Given an integer array \`nums\` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.

Return the number of unique elements in \`nums\`.

### Example 1:
\`\`\`
Input: nums = [1,1,2]
Output: 2
Explanation: The array becomes [1,2,_]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5
\`\`\`
      `,
      difficulty: "Easy" as const,
      points: 10,
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  
};`,
        python: `class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        `,
      },
      testCases: [
        { input: JSON.stringify({ nums: [1,1,2] }), expectedOutput: "2", isHidden: false },
        { input: JSON.stringify({ nums: [0,0,1,1,1,2,2,3,3,4] }), expectedOutput: "5", isHidden: false },
        { input: JSON.stringify({ nums: [1] }), expectedOutput: "1", isHidden: true },
      ],
    },
    {
      title: "Best Time to Buy and Sell Stock",
      slug: "best-time-to-buy-and-sell-stock",
      functionName: "maxProfit",
      functionParams: ["prices"],
      comparisonRule: "strict" as const,
      description: `
You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`ith\` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.

### Example 1:
\`\`\`
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
\`\`\`

### Example 2:
\`\`\`
Input: prices = [7,6,4,3,1]
Output: 0
\`\`\`
      `,
      difficulty: "Easy" as const,
      points: 10,
      starterCode: {
        javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  
};`,
        python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        `,
      },
      testCases: [
        { input: JSON.stringify({ prices: [7,1,5,3,6,4] }), expectedOutput: "5", isHidden: false },
        { input: JSON.stringify({ prices: [7,6,4,3,1] }), expectedOutput: "0", isHidden: false },
        { input: JSON.stringify({ prices: [2,4,1] }), expectedOutput: "2", isHidden: true },
      ],
    },
    {
      title: "Valid Anagram",
      slug: "valid-anagram",
      functionName: "isAnagram",
      functionParams: ["s", "t"],
      comparisonRule: "strict" as const,
      description: `
Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Example 1:
\`\`\`
Input: s = "anagram", t = "nagaram"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: s = "rat", t = "car"
Output: false
\`\`\`
      `,
      difficulty: "Easy" as const,
      points: 10,
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  
};`,
        python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        `,
      },
      testCases: [
        { input: JSON.stringify({ s: "anagram", t: "nagaram" }), expectedOutput: "true", isHidden: false },
        { input: JSON.stringify({ s: "rat", t: "car" }), expectedOutput: "false", isHidden: false },
        { input: JSON.stringify({ s: "a", t: "a" }), expectedOutput: "true", isHidden: true },
      ],
    },
    {
      title: "Sum of Two Integers",
      slug: "sum-of-two-integers",
      functionName: "getSum",
      functionParams: ["a", "b"],
      comparisonRule: "strict" as const,
      description: `
Given two integers \`a\` and \`b\`, return the sum of the two integers without using the operators \`+\` and \`-\`.

### Example 1:
\`\`\`
Input: a = 1, b = 2
Output: 3
\`\`\`

### Example 2:
\`\`\`
Input: a = 2, b = 3
Output: 5
\`\`\`
      `,
      difficulty: "Medium" as const,
      points: 20,
      starterCode: {
        javascript: `/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
  
};`,
        python: `class Solution:
    def getSum(self, a: int, b: int) -> int:
        `,
      },
      testCases: [
        { input: JSON.stringify({ a: 1, b: 2 }), expectedOutput: "3", isHidden: false },
        { input: JSON.stringify({ a: 2, b: 3 }), expectedOutput: "5", isHidden: false },
        { input: JSON.stringify({ a: -2, b: 3 }), expectedOutput: "1", isHidden: true },
      ],
    },
    {
      title: "Number of 1 Bits",
      slug: "number-of-1-bits",
      functionName: "hammingWeight",
      functionParams: ["n"],
      comparisonRule: "strict" as const,
      description: `
Write a function that takes an unsigned integer \`n\` and returns the number of \`1\` bits it has (also known as the Hamming weight).

### Example 1:
\`\`\`
Input: n = 11 (binary: 00000000000000000000000000001011)
Output: 3
\`\`\`

### Example 2:
\`\`\`
Input: n = 128 (binary: 00000000000000000000000010000000)
Output: 1
\`\`\`
      `,
      difficulty: "Easy" as const,
      points: 10,
      starterCode: {
        javascript: `/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
  
};`,
        python: `class Solution:
    def hammingWeight(self, n: int) -> int:
        `,
      },
      testCases: [
        { input: JSON.stringify({ n: 11 }), expectedOutput: "3", isHidden: false },
        { input: JSON.stringify({ n: 128 }), expectedOutput: "1", isHidden: false },
        { input: JSON.stringify({ n: 2147483648 }), expectedOutput: "1", isHidden: true },
      ],
    },
    {
      title: "Reverse Bits",
      slug: "reverse-bits",
      functionName: "reverseBits",
      functionParams: ["n"],
      comparisonRule: "strict" as const,
      description: `
Reverse bits of a given 32-bit unsigned integer \`n\`.

### Example 1:
\`\`\`
Input: n = 00000010100101000001111010011100
Output: 00111001011110000010100001010000
Explanation: The output binary string represents the integer 43261596.
\`\`\`

### Example 2:
\`\`\`
Input: n = 11111111111111111111111111111101
Output: 10111111111111111111111111111111
Explanation: The output binary string represents the integer 3221225471.
\`\`\`
      `,
      difficulty: "Easy" as const,
      points: 10,
      starterCode: {
        javascript: `/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var reverseBits = function(n) {
  
};`,
        python: `class Solution:
    def reverseBits(self, n: int) -> int:
        `,
      },
      testCases: [
        { input: JSON.stringify({ n: 43261596 }), expectedOutput: "964176192", isHidden: false },
        { input: JSON.stringify({ n: 4294967293 }), expectedOutput: "3221225471", isHidden: false },
        { input: JSON.stringify({ n: 0 }), expectedOutput: "0", isHidden: true },
      ],
    },
    {
      title: "Roman to Integer",
      slug: "roman-to-integer",
      functionName: "romanToInt",
      functionParams: ["s"],
      comparisonRule: "strict" as const,
      description: `
Roman numerals are represented by seven different symbols: \`I\`, \`V\`, \`X\`, \`L\`, \`C\`, \`D\` and \`M\`.

Given a roman numeral, convert it to an integer.

### Example 1:
\`\`\`
Input: s = "III"
Output: 3
\`\`\`

### Example 2:
\`\`\`
Input: s = "IV"
Output: 4
\`\`\`

### Example 3:
\`\`\`
Input: s = "IX"
Output: 9
\`\`\`
      `,
      difficulty: "Easy" as const,
      points: 10,
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
  
};`,
        python: `class Solution:
    def romanToInt(self, s: str) -> int:
        `,
      },
      testCases: [
        { input: JSON.stringify({ s: "III" }), expectedOutput: "3", isHidden: false },
        { input: JSON.stringify({ s: "IV" }), expectedOutput: "4", isHidden: false },
        { input: JSON.stringify({ s: "MCMXCIV" }), expectedOutput: "1994", isHidden: true },
      ],
    },
    {
      title: "Integer to Roman",
      slug: "integer-to-roman",
      functionName: "intToRoman",
      functionParams: ["num"],
      comparisonRule: "strict" as const,
      description: `
Given an integer, convert it to a roman numeral.

### Example 1:
\`\`\`
Input: num = 3
Output: "III"
\`\`\`

### Example 2:
\`\`\`
Input: num = 4
Output: "IV"
\`\`\`

### Example 3:
\`\`\`
Input: num = 9
Output: "IX"
\`\`\`
      `,
      difficulty: "Medium" as const,
      points: 15,
      starterCode: {
        javascript: `/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
  
};`,
        python: `class Solution:
    def intToRoman(self, num: int) -> str:
        `,
      },
      testCases: [
        { input: JSON.stringify({ num: 3 }), expectedOutput: '"III"', isHidden: false },
        { input: JSON.stringify({ num: 4 }), expectedOutput: '"IV"', isHidden: false },
        { input: JSON.stringify({ num: 1994 }), expectedOutput: '"MCMXCIV"', isHidden: true },
      ],
    },
    {
      title: "Longest Substring Without Repeating Characters",
      slug: "longest-substring",
      functionName: "lengthOfLongestSubstring",
      functionParams: ["s"],
      comparisonRule: "strict" as const,
      description: `
Given a string \`s\`, find the length of the **longest substring** without repeating characters.

### Example 1:
\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
\`\`\`

### Example 2:
\`\`\`
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
\`\`\`
      `,
      difficulty: "Medium" as const,
      points: 20,
      starterCode: {
        javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  
};`,
        python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        `,
      },
      testCases: [
        { input: JSON.stringify({ s: "abcabcbb" }), expectedOutput: "3", isHidden: false },
        { input: JSON.stringify({ s: "bbbbb" }), expectedOutput: "1", isHidden: false },
        { input: JSON.stringify({ s: "pwwkew" }), expectedOutput: "3", isHidden: true },
      ],
    },
    {
      title: "Container With Most Water",
      slug: "container-with-most-water",
      functionName: "maxArea",
      functionParams: ["height"],
      comparisonRule: "strict" as const,
      description: `
You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`ith\` line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

### Example 1:
\`\`\`
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The max area is formed by lines at index 1 and 8.
\`\`\`

### Example 2:
\`\`\`
Input: height = [1,1]
Output: 1
\`\`\`
      `,
      difficulty: "Medium" as const,
      points: 20,
      starterCode: {
        javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  
};`,
        python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        `,
      },
      testCases: [
        { input: JSON.stringify({ height: [1,8,6,2,5,4,8,3,7] }), expectedOutput: "49", isHidden: false },
        { input: JSON.stringify({ height: [1,1] }), expectedOutput: "1", isHidden: false },
        { input: JSON.stringify({ height: [4,3,2,1,4] }), expectedOutput: "16", isHidden: true },
      ],
    },
    {
      title: "3Sum",
      slug: "3sum",
      functionName: "threeSum",
      functionParams: ["nums"],
      comparisonRule: "unordered" as const,
      description: `
Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.

### Example 1:
\`\`\`
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: The distinct triplets are [-1,0,1] and [-1,-1,2].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [0,1,1]
Output: []
\`\`\`
      `,
      difficulty: "Medium" as const,
      points: 20,
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  
};`,
        python: `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        `,
      },
      testCases: [
        { input: JSON.stringify({ nums: [-1,0,1,2,-1,-4] }), expectedOutput: "[[-1,-1,2],[-1,0,1]]", isHidden: false },
        { input: JSON.stringify({ nums: [0,1,1] }), expectedOutput: "[]", isHidden: false },
        { input: JSON.stringify({ nums: [0,0,0] }), expectedOutput: "[[0,0,0]]", isHidden: true },
      ],
    },
    {
      title: "Set Matrix Zeroes",
      slug: "set-matrix-zeroes",
      functionName: "setZeroes",
      functionParams: ["matrix"],
      comparisonRule: "strict" as const,
      description: `
Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`s, and return the matrix.

### Example 1:
\`\`\`
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
\`\`\`

### Example 2:
\`\`\`
Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
\`\`\`
      `,
      difficulty: "Medium" as const,
      points: 20,
      starterCode: {
        javascript: `/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
  
};`,
        python: `class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        `,
      },
      testCases: [
        { input: JSON.stringify({ matrix: [[1,1,1],[1,0,1],[1,1,1]] }), expectedOutput: "[[1,0,1],[0,0,0],[1,0,1]]", isHidden: false },
        { input: JSON.stringify({ matrix: [[0,1,2,0],[3,4,5,2],[1,3,1,5]] }), expectedOutput: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]", isHidden: false },
        { input: JSON.stringify({ matrix: [[1]] }), expectedOutput: "[[1]]", isHidden: true },
      ],
    },
    {
      title: "Gas Station",
      slug: "gas-station",
      functionName: "canCompleteCircuit",
      functionParams: ["gas", "cost"],
      comparisonRule: "strict" as const,
      description: `
There are \`n\` gas stations along a circular route. You are given two integer arrays \`gas\` and \`cost\`, where \`gas[i]\` is the amount of gas at the \`ith\` station, and \`cost[i]\` is the amount of gas needed to travel to the next station.

Return the starting gas station's index if you can travel around the circuit once in clockwise direction, otherwise return \`-1\`.

### Example 1:
\`\`\`
Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 2
\`\`\`

### Example 2:
\`\`\`
Input: gas = [2,3,4], cost = [3,4,3]
Output: -1
\`\`\`
      `,
      difficulty: "Medium" as const,
      points: 20,
      starterCode: {
        javascript: `/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
  
};`,
        python: `class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        `,
      },
      testCases: [
        { input: JSON.stringify({ gas: [1,2,3,4,5], cost: [3,4,5,1,2] }), expectedOutput: "2", isHidden: false },
        { input: JSON.stringify({ gas: [2,3,4], cost: [3,4,3] }), expectedOutput: "-1", isHidden: false },
        { input: JSON.stringify({ gas: [1], cost: [1] }), expectedOutput: "0", isHidden: true },
      ],
    },
    {
      title: "Jump Game",
      slug: "jump-game",
      functionName: "canJump",
      functionParams: ["nums"],
      comparisonRule: "strict" as const,
      description: `
You are given an integer array \`nums\`. You are initially positioned at the first index, and each element in the array represents your maximum jump length at that position.

Return \`true\` if you can reach the last index, or \`false\` otherwise.

### Example 1:
\`\`\`
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,1,0,4]
Output: false
\`\`\`
      `,
      difficulty: "Medium" as const,
      points: 20,
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
  
};`,
        python: `class Solution:
    def canJump(self, nums: List[int]) -> bool:
        `,
      },
      testCases: [
        { input: JSON.stringify({ nums: [2,3,1,1,4] }), expectedOutput: "true", isHidden: false },
        { input: JSON.stringify({ nums: [3,2,1,0,4] }), expectedOutput: "false", isHidden: false },
        { input: JSON.stringify({ nums: [1] }), expectedOutput: "true", isHidden: true },
      ],
    },
    {
      title: "Count Primes",
      slug: "count-primes",
      functionName: "countPrimes",
      functionParams: ["n"],
      comparisonRule: "strict" as const,
      description: `
Given an integer \`n\`, return the number of prime numbers that are strictly less than \`n\`.

### Example 1:
\`\`\`
Input: n = 10
Output: 4
Explanation: There are 4 primes less than 10, they are 2, 3, 5, 7.
\`\`\`

### Example 2:
\`\`\`
Input: n = 0
Output: 0
\`\`\`
      `,
      difficulty: "Medium" as const,
      points: 20,
      starterCode: {
        javascript: `/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
  
};`,
        python: `class Solution:
    def countPrimes(self, n: int) -> int:
        `,
      },
      testCases: [
        { input: JSON.stringify({ n: 10 }), expectedOutput: "4", isHidden: false },
        { input: JSON.stringify({ n: 0 }), expectedOutput: "0", isHidden: false },
        { input: JSON.stringify({ n: 2 }), expectedOutput: "0", isHidden: true },
      ],
    },
    {
      title: "Sort Colors",
      slug: "sort-colors",
      functionName: "sortColors",
      functionParams: ["nums"],
      comparisonRule: "strict" as const,
      description: `
Given an array \`nums\` with \`n\` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers \`0\`, \`1\`, and \`2\` to represent the color red, white, and blue.

### Example 1:
\`\`\`
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [2,0,1]
Output: [0,1,2]
\`\`\`
      `,
      difficulty: "Medium" as const,
      points: 20,
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
  
};`,
        python: `class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        `,
      },
      testCases: [
        { input: JSON.stringify({ nums: [2,0,2,1,1,0] }), expectedOutput: "[0,0,1,1,2,2]", isHidden: false },
        { input: JSON.stringify({ nums: [2,0,1] }), expectedOutput: "[0,1,2]", isHidden: false },
        { input: JSON.stringify({ nums: [0] }), expectedOutput: "[0]", isHidden: true },
      ],
    },
    {
      title: "Find Minimum in Rotated Sorted Array",
      slug: "find-minimum",
      functionName: "findMin",
      functionParams: ["nums"],
      comparisonRule: "strict" as const,
      description: `
Suppose an array of length \`n\` sorted in ascending order is rotated between \`1\` and \`n\` times.

Given the sorted array \`nums\`, return the minimum element of this array.

### Example 1:
\`\`\`
Input: nums = [3,4,5,1,2]
Output: 1
\`\`\`

### Example 2:
\`\`\`
Input: nums = [4,5,6,7,0,1,2]
Output: 0
\`\`\`
      `,
      difficulty: "Medium" as const,
      points: 20,
      starterCode: {
        javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  
};`,
        python: `class Solution:
    def findMin(self, nums: List[int]) -> int:
        `,
      },
      testCases: [
        { input: JSON.stringify({ nums: [3,4,5,1,2] }), expectedOutput: "1", isHidden: false },
        { input: JSON.stringify({ nums: [4,5,6,7,0,1,2] }), expectedOutput: "0", isHidden: false },
        { input: JSON.stringify({ nums: [11,13,15,17] }), expectedOutput: "11", isHidden: true },
      ],
    },
  ];

  for (const problem of problemsData) {
    const existing = await db.query.problems.findFirst({
      where: (problems, { eq }) => eq(problems.slug, problem.slug),
    });

    let problemId;

    if (existing) {
      console.log(`Updating problem: ${problem.title}`);
      await db
        .update(problems)
        .set({
          title: problem.title,
          description: problem.description,
          difficulty: problem.difficulty,
          starterCode: problem.starterCode,
          functionName: problem.functionName,
          functionParams: problem.functionParams,
          comparisonRule: problem.comparisonRule,
          points: problem.points || 10,
        })
        .where(eq(problems.slug, problem.slug));

      problemId = existing.id;
      await db.delete(testCases).where(eq(testCases.problemId, problemId));
    } else {
      const [inserted] = await db
        .insert(problems)
        .values({
          title: problem.title,
          slug: problem.slug,
          description: problem.description,
          difficulty: problem.difficulty,
          starterCode: problem.starterCode,
          functionName: problem.functionName,
          functionParams: problem.functionParams || [],
          comparisonRule: problem.comparisonRule || "strict",
          points: problem.points || 10,
        })
        .returning();
      problemId = inserted.id;
      console.log(`Inserted problem: ${problem.title}`);
    }

    for (const testCase of problem.testCases) {
      await db.insert(testCases).values({
        problemId: problemId,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        isHidden: testCase.isHidden || false,
      });
    }
  }

  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
