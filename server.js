const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception ... Shutting Down');
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log('DB Connected Succesfully'))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App Running on port : ${port}`);
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log('user connected');
  socket.on('message', (msg) => {
    io.emit('message', msg);
    socket.broadcast.emit('msg-sound', 'hello');
  });
});

//! Handling Errors outside of Express :: Unhandled Rejections

process.on('unhandledRejection', (err) => {
  console.log('Unhadled Rejection :(  Shutting Down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
