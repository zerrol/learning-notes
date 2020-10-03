const { fork, exec, execFile } = require('child_process')

// exec
// 创建一个shell环境，去执行脚本
// 底层是通过spawn实现的
// 会在脚本执行完成之后，进入到回调中
const n = exec('node ./child1.js', (err, stdout, stderr) => {
  if(err) throw err

  // console.log('stdout', stdout)
  // console.log('stdout type', typeof stdout)
  // console.log('stderr', stderr)
})


// execFile
// 不会创建一个shell环境，去执行脚本
// 需要通过文件执行，由于没有shell环境，无法如上例通过node执行，其他例如 ls 等也不行
// 底层是通过spawn实现的
// 会在脚本执行完成之后，进入到回调中
execFile('/usr/local/bin/node', ['./child1.js'], (err, stdout, stderr) => {
  if(err) throw err

  // console.log('stdout', stdout)
  // console.log('stdout type', typeof stdout)
  // console.log('stderr', stderr)
})


// fork
// 从当前进程，克隆一个进程，执行脚本
// 例子一：会打印出 output from the child
// 默认情况，silent 为 false，子进程的 stdout 等
// 从父进程继承
// fork('./child1.js', {
//   silent: false
// });

// 例子二：不会打印出 output from the silent child
// silent 为 true，子进程的 stdout 等
// pipe 向父进程
const child = fork('./child1.js', {
  silent: true
});
child.stdout.setEncoding('utf8');
child.stdout.on('data', function(data){
  console.log(data);
});
