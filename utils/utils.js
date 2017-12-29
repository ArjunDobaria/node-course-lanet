module.exports.add = (a,b) => a+b;


module.exports.asyncAdd = (a, b, callback) => {
    setTimeout(() => {
        callback(a+b)
    },1000);
}

module.exports.asyncMul = (a, callback) => {
    setTimeout(() => {
        callback(a*a)
    },1000);
}