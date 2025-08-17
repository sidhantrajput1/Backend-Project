#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

void print(vector<int>& num) {
    for(int i = 0; i < num.size(); i++) {
        cout<<num[i]<<" ";
    }
}

// using recursive function
// int helper(vector<int>& num, int i,int sum) {
//     if (i >= num.size()) return sum;
//     return min(helper(num, i+1 , sum + num[i]), helper(num, i+2, sum + num[i]));
// }

// int minCostClimbingStairs(vector<int>& cost) {
//     return min(helper(cost, 0 , 0), helper(cost, 0,0));
// }


int minCost(vector<int>& cost, int i, vector<int>& dp) {
    if (i == 0 || i == 1) return cost[i];

    if (dp[i] != -1) return dp[i];

    int oneStep = cost[i] + minCost(cost, i - 1, dp);
    int twoStep = cost[i] + minCost(cost, i - 2, dp);

    return dp[i] = min(oneStep, twoStep);
}

int minCostClimbingStairs(vector<int>& cost) {
    int n = cost.size();
    vector<int> dp(n, -1);
    return min(minCost(cost, n-1, dp), minCost(cost, n-2, dp));
}


// Using tabulation method
// int minCostClimbingStairs(vector<int>& cost) {
//     int n = cost.size();

//     for (int i = 2; i < n; i++) {
//         cost[i] += min(cost[i-1] , cost[i-2]);
//     }

//     return min(cost[n-1], cost[n-2]);
// }

// memoization

int main() {
    vector<int> num = {1,100,1,1,1,100,1,1,100,1};
    print(num);
    cout<<endl;
    cout<<"Minimum cost is "<<minCostClimbingStairs(num);

}