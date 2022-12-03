#include <iostream>
#include <fstream>
#include <cstring>

using namespace std;

ifstream f("input.txt");

int main()
{
    int s = 0;
    char a[60], b[60], c[60];
    while (f >> a && f >> b && f >> c)
    {
        int lenA = strlen(a);
        for(int i = 0; i < lenA; i++)
        {
            if(strchr(b, a[i]) != 0 && strchr(c, a[i]) != 0)
            {
                if(a[i] >= 97 && a[i] <= 122)
                {
                    s = s + (int)a[i] - 96;
                    break;
                } else {
                    s = s + (int)a[i] - 38;
                    break;
                }
            }
        }
    }
    cout << s;

    return 0;
}
