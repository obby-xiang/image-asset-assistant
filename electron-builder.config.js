/** @type {import('electron-builder').Configuration} */
module.exports = {
  directories: {
    output: './dist',
  },
  win: {
    target: 'portable',
    icon: './public/favicon.png',
  },
};
