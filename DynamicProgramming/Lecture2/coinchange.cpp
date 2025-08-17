#include<iostream>
#include<vector>
#include<climits>

using namespace std;

vector<int> coins;
vector<int> dp(1000006, -2);

int coinChange(int amount) {
    if (amount == 0) return 0;

    if (dp[amount] != -2) return dp[amount];

    int result = INT_MAX;
    for(int coin : coins) {
        if (amount - coin < 0) continue;
        result = min(result, coinChange(amount - coin));
    }

    if (result == INT_MAX) return dp[amount] = INT_MAX;

    return dp[amount] = 1 + result;
}

int main() {
    int n, x;
    cin>>n>>x;

    for (int i = 0; i < n; i++) {
        int num;
        cin>>num;
        coins.push_back(num);
    }
    int ans = coinChange(x);
    if (ans == INT_MAX) cout<<"-1 \n";
    else cout<<ans<<"\n";
}