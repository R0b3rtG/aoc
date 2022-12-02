#include <iostream>
#include <fstream>

using namespace std;
ifstream f("input.txt");

int main()
{
    int s = 0;
    char a,b;
    while(f>>a>>b)
    {
        if(a == 'A' && b == 'X')
            s+= 4;
        if(a == 'B' && b == 'X')
            s+= 1;
        if(a == 'C' && b == 'X')
            s+= 7;
        if(a == 'A' && b == 'Y')
            s+= 8;
        if(a == 'B' && b == 'Y')
            s+= 5;
        if(a == 'C' && b == 'Y')
            s+= 2;
        if(a == 'A' && b == 'Z')
            s+= 3;
        if(a == 'B' && b == 'Z')
            s+= 9;
        if(a == 'C' && b == 'Z')
            s+= 6;
    }

    cout << "Your score is: " << s;
    return 0;
}
