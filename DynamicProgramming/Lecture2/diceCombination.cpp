#include<iostream>
#include<vector>

using namespace std;

const int MOD = 1e9 + 7;
vector<int> dp(1000006, -1);

int diceCombination(int n) {
    if (n == 0) return 1;
    if ( n < 0 ) return 0;

    if (dp[n] != -1) return dp[n];

    int res = 0;
    for (int i = 1; i <= 6; i++) {
        res = (res + diceCombination(n - i)) % MOD;
    }

    return dp[n] = res;
}

int diceCombinationTab(int n) {
    dp[0] = 1;

    for (int k = 1; k <= n; k++) {
        int res = 0;
        for (int i = 1; i <= 6; i++) {
            if (k - i >= 0) {
                res = (res + dp[k - i]) % MOD;
            }
        }
        dp[k] = res;
    }

    return dp[n];
}

int main() {
    int n;
    cin>>n;
    // dice combination
    int res = diceCombinationTab(n);
    // print(nums);
    cout<<res;
}