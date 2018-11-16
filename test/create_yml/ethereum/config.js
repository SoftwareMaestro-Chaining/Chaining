const yaml = require('js-yaml');

var object = require('./kuberneteth.json');

// console.log(object);

var tmp = yaml.dump(object, {
    flowLevel: 3,
    styles: {
      '!!int'  : 'hexadecimal',
      '!!null' : 'camelcase'
    }
})
var envfile = 'tmp.yaml';
fs.writeFileSync(envfile, tmp);