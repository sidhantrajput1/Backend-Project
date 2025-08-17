#include<iostream>
#include<vector>

using namespace std;

// sc = starting column, sr = starting row, int m = no of row, int n = no fo column
int helper(int sr, int sc, int er, int ec, vector<vector<int>>& dp) {
        if (sr == er && sc == ec) return 1;
        if (sr > er || sc > ec) return 0;

        if (dp[sr][sc] != -1) return dp[sr][sc];
        
        return dp[sr][sc] = helper(sr + 1, sc, er, ec, dp) + helper(sr, sc + 1, er, ec, dp);
}

// int uniquePaths(int m, int n) {
//     vector<vector<int>> dp(m, vector<int> (n, -1));
//     return helper(0, 0, m-1, n-1, dp);
// }

int uniquePaths(int m, int n) {
    int dp[m][n];

    for(int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 || j == 0) dp[i][j] =  1;
            else dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }

    return dp[m-1][n-1];
}

int main() {
    int m = 3, n = 7;
    cout<<uniquePaths(m, n);
}