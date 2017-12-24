import { compiler } from 'flowgen';
const flowdef = compiler.compileDefinitionFile('../node_modules/flv.js/d.ts/flv.d.ts');
console.log(flowdef);

declare module 'toxic-decorators' {
  declare module.exports: any;
}