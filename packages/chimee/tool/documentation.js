const documentation = require('documentation');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const streamArray = require('stream-array');
const vfs = require('vinyl-fs');
const files = glob.sync('./src/**/*.js');
const config = {shallow: true};

// 创建所有目录
function mkdirp (dirpath, callback) {
  fs.exists(dirpath, function (exists) {
    if(exists) return callback(dirpath);
    mkdirp(path.dirname(dirpath), () => fs.mkdir(dirpath, callback));
  });
}

files.forEach(file => {
  documentation.build([file], config)
  .then((...args) => documentation.formats.md(...args, config))
  .then(output => {
    const dist = file.replace(/^\.\/src/, './docs/markdown');
    mkdirp(dist.replace(/\/[^\/]+$/, ''), () => fs.writeFileSync(path.resolve(dist.replace(/js$/, 'md')), output, 'utf8'));
  });
});

files.forEach(file => {
  documentation.build([file], config)
    .then((...args) => documentation.formats.html(...args, config))
    .then(output => {
      const dist = file.replace(/^\.\/src/, './docs/html').replace(/\/[^\/]+$/, '');
      streamArray(output).pipe(vfs.dest(dist));
    });
});
