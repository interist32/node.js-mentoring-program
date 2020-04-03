import {Sequelize} from 'sequelize';
import {DB_CONNECTION_STRING} from '../config';

const sequelize = new Sequelize(DB_CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
});

sequelize.authenticate()
    .then(() => console.log('Database connection established'))
    .catch((error) => console.log(`Connection failed: ${error}`));

export default sequelize;
