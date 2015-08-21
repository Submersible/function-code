# function-code [![Build Status](https://secure.travis-ci.org/Submersible/node-function-code.png?branch=master)](http://travis-ci.org/Submersible/node-function-code)


Turn functions into strings

```
npm install function-code
```

```javascript
var functionCode = require('function-code');
```

## functionCode(fn, args...)

```javascript
console.log(functionCode(function (a, b) {
    return a + b;
}, 2, 2));
```

Outputs

```
(function (a, b) {
    return a + b;
}(2,2))
```


## functionCode.inline(fn, args...)

```javascript
var functionCode = require('function-code');

console.log(functionCode.inline(function (a, b) {
    var a = 1,
        b = 2;
    console.log('a + b = ', a + b);
}));
```

Outputs

```
var a = 1,
    b = 2;
console.log('a + b = ', a + b);
```

## functionCode.code(fn, args...)

Alias to `functionCode(fn, args...)`

## Function.prototype.toCode(args...)

Alias to `functionCode(this, args...)`

## Function.prototype.toInline()

Alias to `functionCode.inline(this)`
