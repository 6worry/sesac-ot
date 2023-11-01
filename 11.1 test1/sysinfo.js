const { cp } = require('fs');
const os = require('os');

const hostname = os.hostname();
console.log(hostname);

const cpus = os.cpus();
// console.log(cpus);

console.log('---');
console.log(cpus[0]);
console.log(cpus[0].model);

console.log('---');
for (let i =0; i<cpus.length; i++){
    console.log(cpus[i].model);
}

console.log('---');
for (const cpu of cpus){
    console.log(cpu.model);
}

const totalMemory = os.totalmem();
console.log('전체메모리', totalMemory);
console.log('전체메모리', totalMemory/1024/1024/1024, "GB");

console.log('전체메모리', Math.floor(totalMemory/1024/1024/1024), "GB");
console.log('전체메모리', Math.round(totalMemory/1024/1024/1024), "GB");