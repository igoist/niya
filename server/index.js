const Koa = require('koa');
const IO = require('koa-socket');
// const koaSend = require('koa-send');
var _ = require('koa-route');
// const path = require('path');

const route = require('./middlewares/route');
const userRoutes = require('./routes/user');

const mongoose = require('mongoose');

const config = require('../config/server');

const Socket = require('./models/socket');
const Group = require('./models/group');

const getRandomAvatar = require('../utils/getRandomAvatar');


let s0 = _.get('/', async (ctx, next) => {
  console.log('here s0');
  // await koaSend(
  //   ctx,
  //   'index.html',
  //   {
  //     root: path.join(__dirname, '../public'),
  //     maxage: 1000 * 60 * 60 * 24 * 7,
  //     gzip: true
  //   }
  // );
  ctx.body = '<div style="color: #cccfff;">Go back localhost:3103</div>';
});

let s1 = _.get('/s1/', async (ctx, next) => {
  console.log('here s1');
  ctx.body = '<div style="color: #cccfff;">ABC s1</div>';
});

const app = new Koa();

app.use(s0);
app.use(s1);

const io = new IO({
  ioOptions: {
    pingTimeout: 10000,
    pingInterval: 5000,
  },
});

io.attach(app);

io.use(route(
  app.io,
  app._io,
  Object.assign({}, userRoutes),
));

app.io.on('connection', async (ctx, data) => {
  console.log(`  <<<< connection ${ ctx.socket.id } ${ ctx.socket.request.connection.remoteAddress } data== ${ data }`);
  await Socket.create({
    id: ctx.socket.id,
    ip: ctx.socket.request.connection.remoteAddress,
  });
});

app.io.on('disconnect', async (ctx) => {
  console.log(`  >>>> disconnect ${ ctx.socket.id }`);
  await Socket.remove({
    id: ctx.socket.id,
  });
});


mongoose.connect(config.database, async (err) => {
  if (err) {
    console.error('connect database error!');
    console.error(err);
    return process.exit(1);
  }

  // 判断默认群是否存在, 不存在就创建一个
  const group = await Group.findOne({ isDefault: true });
  if (!group) {
    const defaultGroup = await Group.create({
      name: config.defaultGroupName,
      avatar: getRandomAvatar(),
      isDefault: true,
    });
    if (!defaultGroup) {
      console.error('create default group fail');
      return process.exit(1);
    }
  } else if (group.name !== config.defaultGroupName) {
    group.name = config.defaultGroupName;
    await group.save();
  }

  app.listen(config.port, async () => {
    await Socket.remove({}); // 删除Socket表所有历史数据
    console.log(` >>> server listen on http://localhost:${ config.port }`);
  });
});
