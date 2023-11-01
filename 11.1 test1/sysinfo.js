const os = require('os');

const hostname = os.hostname();
console.log(hostname);

const cpus = os.cpus();
console.log(cpus);