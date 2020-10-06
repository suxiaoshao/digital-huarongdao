"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var time = new Date().getTime();
var data = lib_1.getSwaps([5, 9, 1, 8, 3, 2, 4, 6, 0]);
if (data !== false) {
    console.log('答案是: ', data);
}
else {
    console.log('无解');
}
console.log(new Date().getTime() - time);
