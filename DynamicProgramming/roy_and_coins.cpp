#include<iostream>
#include<vector>

using namespace std;

int main () {
    int n;
    cin>>n;

    vector<int> f(n+1, 0);
    int m;
    cin>>m;

    vector<int> l(n+1, 0);
    vector<int> r(n+1, 0);

    for (int i = 0; i < m; i++) {
        int  L, R;
        cin>>L>>R;

        l[L]++;
        r[R]++;
    }

    f[1] = l[1];
    for (int i = 2; i <= n; i++) {
        f[i] = l[i] - r[i-1] + f[i-1];
    }

    vector<int> c(10000007, 0);

    for (int i = 0; i <= n; i++) {
        int coins = f[i];
        c[coins]++;
    }

    for (int i = c.size() - 1; i >= 0; i--) {
        c[i] = c[i] + c[i+1];
    }

    int q;
    cin>>q;
    for (int i = 0; i < q; i++) {
        int num;
        cin>>num;
        cout<<c[num]<<"\n";
    }
}