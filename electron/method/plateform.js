const Ps = require('ee-core/ps');
const os = require('os');
const path = require('path');
// const fileHomeDir =  == 'Linux' ? '/var/tmp/easysend' : Ps.getExecDir() + '/uplodFiles'

function getFileHomeDir() {
  const osType = os.type()
  if (osType == 'Windows_NT') {
    return path.join(Ps.getExecDir(), 'uplodFiles')
  } else if (osType == 'Linux') {
    return path.join('/var/tmp', 'easysend')
  } else if (osType == 'Darwin') {
    return path.join(path.dirname(Ps.getExecDir()), 'uplodFiles')
  }
}
const fileHomeDir = getFileHomeDir()
module.exports = fileHomeDir