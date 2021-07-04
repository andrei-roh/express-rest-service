import { PORT } from './common/config';
import { setConnectionToDatabase } from './common/database';

(async () => {
  try {
    await setConnectionToDatabase();
  } catch (err) {
    console.log('Failed to connect database', `${err}`)
    return
  }
  const app = await import('./app')
  app.default.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
})();
