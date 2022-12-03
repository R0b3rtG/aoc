#include <iostream>
#include <fstream>
#include <cstring>

using namespace std;

ifstream f("input.txt");

int main()
{
    int s = 0;
    char a[60], b[30];
    while (f >> a)
    {
        int len = strlen(a) / 2;
        strcpy(b, a + len);
        a[len] = '\0';
        for(int i = 0; i < len; i++)
        {
            if(strchr(b, a[i]) != 0)
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
