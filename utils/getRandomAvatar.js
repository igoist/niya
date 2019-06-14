const AvatarCount = 15;
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'build';
const publishPath = './';

module.exports = function getRandomAvatar() {
  const number = Math.floor(Math.random() * AvatarCount);
  return `${publishPath}/avatar/${number}.jpg`;
};
