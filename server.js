import dotenv from 'dotenv';
import colors from 'colors';
import { connectDB } from './config/db.js';
import app from './app.js';

dotenv.config({ path: './config/config.env' });

connectDB();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.status(400).json({ success: false });
});

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  server.close(() => process.exit(1));
});
