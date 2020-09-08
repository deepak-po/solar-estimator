import sys 
import subprocess 
import os 
 
# Use C program to create a text file.
prog = r''' 
#include<stdio.h> 
int main(){ 
  printf("Hello World!\n"); 
  FILE *fp;
  fp = fopen("data.txt", "w");
  fprintf(fp, "data mydata");
  fclose(fp);
  return 0; 
} 
''' 

# Compile C program using subprocess and run it.
if not os.path.exists('foo'): 
    f = open('foo.c', 'w') 
    f.write(prog) 
    f.close() 
    # subprocess.call(["gcc", "foo.c", "-obar", "-std=c99", '-w', '-Ofast']) 
    subprocess.call(["gcc", "foo.c", "-obar"]) 
subprocess.call(["./bar"], stdin = sys.stdin) 

# Use text file to do stuff in Python
d = {}
with open('data.txt') as f:
  for line in f:
    (key, val) = line.split()
    d[key] = val
print(d)

# Clean up
os.remove("./bar")
os.remove("./foo.c")
os.remove("./data.txt")