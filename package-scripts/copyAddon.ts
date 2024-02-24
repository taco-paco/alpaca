const fs = require('fs-extra');
const path = require('path');

function getSuffix() {
    if (process.platform === 'win32') {
        if (process.arch !== 'x64') {
            throw new Error('Support is coming...');
        }

        return `win-${process.arch}`;
    } else if (process.platform === 'darwin') {
        return `mac-${process.arch}`;
    } else if (process.platform === 'linux') {
        throw new Error('Support is coming...');
    }

    throw new Error(`Unsupported platform: ${process.platform}`);
}

const alpacaAddon = `alpaca-addon-${getSuffix()}`;
const src = path.resolve(path.join('node_modules', '@taco-paco', alpacaAddon, 'alpaca.node'));
const dst = path.resolve(path.join('dist', 'alpaca.node'));
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

fs.copyFileSync(src, dst);
