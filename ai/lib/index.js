"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwaps = void 0;
var allowSwap = [
    [-1, 1, 3, -1],
    [-1, 2, 4, 0],
    [-1, -1, 5, 1],
    [0, 4, 6, -1],
    [1, 5, 7, 3],
    [2, -1, 8, 4],
    [3, 7, -1, -1],
    [4, 8, -1, 6],
    [5, -1, -1, 7],
];
var allowDict = ['w', 'd', 's', 'a'];
var QueueItem = /** @class */ (function () {
    function QueueItem(now_string, swaps) {
        this.nowString = now_string;
        this.swaps = swaps;
        this.zeroIndex = now_string.indexOf('0');
    }
    QueueItem.prototype.getNext = function () {
        var _this = this;
        var newItemList = [];
        allowSwap[this.zeroIndex].forEach(function (otherIndex, value) {
            if (otherIndex !== -1) {
                var nowString = _this.nowString;
                nowString = nowString.slice(0, _this.zeroIndex) + nowString[otherIndex] + nowString.slice(_this.zeroIndex + 1);
                nowString = nowString.slice(0, otherIndex) + '0' + nowString.slice(otherIndex + 1);
                var swaps = _this.swaps + allowDict[value];
                newItemList.push(new QueueItem(nowString, swaps));
            }
        });
        return newItemList;
    };
    return QueueItem;
}());
function getSwaps(serialNumber) {
    var nowString = serialNumber.join('');
    var targetString = new Array(9)
        .fill(0)
        .map(function (value, index) {
        return serialNumber.includes(index + 1) ? index + 1 : 0;
    })
        .join('');
    var q = [new QueueItem(nowString, '')];
    var seenStringList = [nowString];
    var maxPath = 0;
    while (q.length !== 0) {
        var qItem = q.shift();
        if (maxPath < qItem.swaps.length) {
            maxPath = qItem.swaps.length;
            console.log(maxPath, seenStringList.length);
        }
        if (qItem.nowString === targetString) {
            return qItem.swaps;
        }
        var newItemList = qItem.getNext();
        newItemList.forEach(function (newItem) {
            if (!seenStringList.includes(newItem.nowString)) {
                seenStringList.push(newItem.nowString);
                q.push(newItem);
            }
        });
    }
    return false;
}
exports.getSwaps = getSwaps;
//# sourceMappingURL=index.js.map