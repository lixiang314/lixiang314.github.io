function curry(fn) {
    var outerArgs = Array.prototype.slice.call(arguments, 1);
    return function() {
        var innerArgs = Array.prototype.slice.call(arguments),
            finalArgs = outerArgs.concat(innerArgs);
        return fn.apply(null, finalArgs); //注意别漏了return
    };
}

function loc(a,b,c){
	console.log(a+'-'+b+'-'+c);
}

curry(loc,'浙江','杭州','西湖区');