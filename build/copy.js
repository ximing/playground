const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');

glob(`${process.cwd()}/dist/**/manifest.json`, { nodir: true }, async (err, files) => {
    if (err) throw err;
    console.log(files);
    const indexHtml = path.join(process.cwd(), 'dist/index.html');
    files.forEach((f) => {
        if (f !== path.join(process.cwd(), 'dist/manifest.json')) {
            const fileObj = fs.readJsonSync(f);
            Object.keys(fileObj).forEach((key) => {
                fs.copySync(indexHtml, f.replace('manifest.json', key.replace('.js', '.html')));
            });
        }
    });
});
