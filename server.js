const express = require('express');
const app = express();

app.use(express.static('./dist/eurder-front-end'));

app.listen(process.env.PORT || 8080);
