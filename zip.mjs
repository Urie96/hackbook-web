import fs from 'fs';
import glob from "glob";
import brotli from 'brotli';
import zlib from 'zlib';

const pattern = './dist/**/*.{js,css,json,svg,html}'
const threshold = 1024 * 5

glob(pattern, (err, files) => {
    files.forEach((file) => {
        fs.readFile(file, (err, src) => {
            if (src.length > threshold) {
                const brFileName = file + '.br'
                const gzFileName = file + '.gz'
                const brzip = brotli.compress(src, { mode: 1 })
                const gzip = zlib.gzipSync(src)
                fs.writeFile(brFileName, brzip, () => { })
                fs.writeFile(gzFileName, gzip, () => { })
            }
        })
    })
})