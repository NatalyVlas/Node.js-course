import { createReadStream, createWriteStream } from 'fs';
import { createInterface } from 'readline';

const ip1 = '89.123.1.41';
const ip2 = '34.48.240.111';

const rs = createReadStream('./access_tmp.log', 'utf-8');
const ws1 = createWriteStream(`${ip1}_requests.log`);
const ws2 = createWriteStream(`${ip2}_requests.log`);
const rl = createInterface({
    input: rs
});

rl.on('line', (input) => {
    if (input.includes(ip1)) {
        ws1.write(input + '\n')
    }
    if (input.includes(ip2)) {
        ws2.write(input + '\n')
    }
});