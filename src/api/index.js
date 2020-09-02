const Express = require('express');
const Cors = require('cors');

const PORT = process.env.PORT || 5000; // https://help.heroku.com/P1AVPANS/why-is-my-node-js-app-crashing-with-an-r10-error
const app = Express();
const server = require('http').Server(app);

app.use(Cors());
app.use('/health', (req, res) => {
  res.status(200).json({
    appName: 'API',
    version: process.env.npm_package_version,
    status: 'OK',
  });
});

server.listen(PORT, (error) => {
  if (error) {
    console.log(`
          \n\n
          --------------------------------
          --------------------------------

          API:

          Status: Error
          Log: ${error}

          --------------------------------
          --------------------------------
          \n\n`
    );
  } else {
    console.log(`
          \n\n
          --------------------------------
          --------------------------------

          API:

          Name: Express API
          Port: ${PORT}
          Status: OK

          --------------------------------
          --------------------------------
          \n\n`
    );
  }
});