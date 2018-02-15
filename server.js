const app = require('./app');
const { PORT } = require('./config/app');

app.listen(PORT, () => console.log(`Incidents listenning on port ${PORT}`));
