function sumStrings(a, b) {
    a = 0 + a; b = 0 + b;
    var maxLen = a.length > b.length ? a.length : b.length;
    var aArr = a.split('');
    var bArr = b.split('');
    var poor = a.length - b.length;
    var carr = 0;
    var res = [];
    if (poor > 0) {
        for (let i = 0; i < poor; i++) {
            bArr.unshift('0');
        }
    } else {
        for (let i = 0; i < Math.abs(poor); i++) {
            aArr.unshift('0');
        }
    }
    for (let i = maxLen - 1; i >= 0; i--) {
        carr = (+bArr[i]) + (+aArr[i]) + carr;
        console.log(carr, 'kk')
        if (carr >= 10) {
            res.unshift('' + (carr - 10));
            carr = 1;
        } else {

            res.unshift('' + carr);
            carr = 0
        }
    }
    return res.join('').replace(/^0/, '');

}