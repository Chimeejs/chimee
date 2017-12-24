const flowgen = require('flowgen');
const path = require('path');
const fs = require('fs');
const { compiler } = flowgen.default;
const flowdef = compiler.compileDefinitionFile(path.resolve(__dirname, '../node_modules/flv.js/d.ts/flv.d.ts'));
fs.writeFileSync(path.resolve(__dirname, '../flow/flv.js'), flowdef, 'utf8');
