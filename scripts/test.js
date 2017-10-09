console.time('performance test');
var json = require('../app/data/rawText.json');
var huang = require('../app/data/marshuang.json');
var filtered = json.map((e, i) => e.rawText.includes('大法官') ? e.rawText.substring(0,8) : null)
.filter(e => !!e);
console.log(filtered);
console.timeEnd('performance test');
