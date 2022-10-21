#include <stdio.h>
#include "libcheckmin.h"
void main() {
  while(1){
    int x;
    printf("\nInsert number(0:Exit) :");
    scanf("%d",&x);
    if (x == 0) break;
    if(checkmin(x) ==x)
      printf("%d is a prime number \n", x);
    else
      printf("%d is not prime number \n", x);
  }
}
