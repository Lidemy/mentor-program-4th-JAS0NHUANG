## Chapter 1. Execution Contexts

**Execution Context** of ECMAScript & types of **executable code**.

Control enter an EC when transferred to ECMAScript.
No definition about implementation
STACK -> global EC at the bottom, current EC at the top.

### executable code
##### global code
does not include any function block inside it.

##### function code
does not include inner functions(as above)
EVERY RETURN from a function exits the EC and pops the EC from the 'EC Stack'. 

##### Eval code
Usage of `eval()` function.  
A concept of 'calling context' witch is the EC where `eval` is called.
So it's EC will contain:
1. it's own eval EC
2. it's 'calling context'

## Chapter 2. Variable object
HOW and WHERE the interpreter finds our data(functions, variables...)
EC and function scope.

### Data declaration
Variable Object
- variable declaration
- function declaration
- function formal parameters

**In ES5, VO is replaced with Lexical Environments model.**
