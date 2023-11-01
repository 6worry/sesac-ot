const fs = require('fs');

// 현재 디렉토리에서 파일 목록을 읽어옵니다.
fs.readdir('.', (err, files) => {
  if (err) {
    console.error('파일 목록을 읽어올 수 없습니다: ' + err);
    return;
  }

  console.log('현재 디렉토리의 파일 목록:');
  files.forEach(file => {
    console.log(file);
  });
});
