int fbu(int num) {
//     dp[0] = 0;
//     for (int i = 0; i < 9; i++) dp[num] = 1;
//     for (int n = 10; n < num; n++) {

//         vector<int> d = getDigit(n);
//         int res = INT_MAX;

//         for (int i = 0; i < d.size(); i++) {
//             res = min(res, dp[n - d[i]]);
//         }

//         dp[n] = 1 + res;
//     }
//     return dp[num];
// }