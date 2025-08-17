#include<iostream>
#include<vector>
#include<climits>

using namespace std;

vector<int> dp;

vector<int> getDigit(int n) {
    vector<int> res;
    while (n > 0) {
        if (n % 10 != 0) {
            res.push_back(n % 10);
        }
        n = n / 10;
    }
    return res;
}

int removingDigit(int n) {
    if ( n == 0) return 0;
    if (n <= 9) return 1;

    if (dp[n] != -1) return dp[n];

    vector<int> digits = getDigit(n);
    int res = INT_MAX;

    for (int d : digits) 
        res = min(res, removingDigit(n - d));
    

    return dp[n] = 1 + res;
}

int fbu(int num) {
    dp[0] = 0;
    for (int i = 1; i <= 9; i++) dp[i] = 1;
    for (int n = 10; n <= num; n++) {

        vector<int> d = getDigit(n);
        int res = INT_MAX;

        for (int digit : d) {
            res = min(res, dp[n - digit]);
        }

        dp[n] = 1 + res;
    }
    return dp[num];
}

int main() {
    int n;
    cin>>n;

    dp.clear();
    dp.resize(n + 1, -1);        
    
    // cout<<removingDigit(n)<<endl;
    cout<<fbu(n)<<endl;
}