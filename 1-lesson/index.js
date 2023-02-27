import colors from 'colors'

const a = +process.argv[2]
const b = +process.argv[3]
const colorNum = [colors.green, colors.yellow, colors.red]

if (!Number.isNaN(a) || !Number.isNaN(b)) {
    let n = 0;
    for (let i = a; i <= b; i++) {
        if (testPrimeNum(i)) {
            if (n <= 2) {
                console.log(colorNum[n](i));
                n++;
            } else {
                n = 0;
                console.log(colorNum[n](i));
                n++;
            }
        }
    }
} else if (process.argv[2] === undefined || process.argv[3] === undefined) {
    console.log(colors.red('undefined numbers'))
}
else {
    console.log(colors.red('incorrect numbers'))
}

function testPrimeNum(num) {
    if (num === 1) {
        return false;
    } else if (num === 2) {
        return true;
    } else {
        for (let i = 2; i < num; i++) {
            if (num % i === 0) {
                return false
            }
        }
        return true;
    }
}
