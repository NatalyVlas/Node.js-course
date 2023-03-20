import fsp from 'fs/promises';
import path from 'path';
import readline from 'readline';
import inquirer from 'inquirer';
import colors from 'colors';

const __dirname = process.cwd();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const findFilesInDir = (dirName) => {
    return fsp
        .readdir(dirName)
        .then((choices) => {
            return inquirer.prompt([
                {
                    name: 'fileName',
                    type: 'list',
                    message: 'Choose file',
                    choices,
                },
                {
                    name: 'findString',
                    type: 'input',
                    message: 'Enter something for search',
                },
            ])
        })
        .then(async ({ fileName, findString }) => {
            const fullPath = path.join(dirName, fileName);
            const stat = await fsp.stat(fullPath);
            if (!stat.isFile()) {
                return findFilesInDir(fullPath)
            }
            return Promise.all([
                fsp.readFile(path.join(dirName, fileName), 'utf-8'),
                Promise.resolve(findString),
            ])
        })
        .then((result) => {
            if (result) {
                const [text, findString] = result;
                const pattern = new RegExp(findString, 'g');
                let count = 0;
                const out = text.replace(pattern, () => {
                    count++;
                    return colors.red(findString);
                })
                console.log(out, '\n', colors.green(`Found ${count} values`));
            }
        })
}

rl.question(
    `You are in: ${__dirname} \n Please enter the path to the directory: `,
    (dirPath) => {
        const dirName = path.join(__dirname, dirPath);
        findFilesInDir(dirName);
    }
);

rl.on('close', () => process.exit(0))