#include<iostream>
#include<vector>

using namespace std;

bool helper(int idx, int target, vector<int>& nums, vector<vector<int>>& dp) {
    if (target == 0) return true;
    if (idx == 0) return (target == nums[0]);

    if (dp[idx][target] != -1) return dp[idx][target];

    bool no_take = helper(idx - 1, target, nums, dp);
    bool take = false;
    if (target >= nums[idx]) take = helper(idx - 1, target - nums[idx], nums, dp);

    return dp[idx][target] = take || no_take;
}

bool isSubsetSum(vector<int> nums, int target) {
    int n = nums.size();
    vector<vector<int>> dp(n, vector<int>(target + 1, -1));

    return helper(n - 1, target, nums, dp);
}

int main() {
    vector<int> nums = {3, 34, 4, 12, 5, 2};
    int n = nums.size();
    int target = 9;

    cout<<isSubsetSum(nums, target);
}