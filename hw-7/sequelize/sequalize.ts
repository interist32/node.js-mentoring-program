import { Sequelize } from 'sequelize';

// Hardcoded since my repo is private, and will be deleted after merge.
const CONNECTION_STRING = 'postgres://iwsdzgkawdewtl:0652fa68f8c46ec0c712d0b253db84b871f1451a92698b7f20a7dee1f2a33691@ec2-54-92-174-171.compute-1.amazonaws.com:5432/d7c050r5hcsaas';

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
});

sequelize.authenticate()
  .then(() => console.log('Database connection established'))
  .catch((error) => console.log(`Connection failed: ${error}`));

export default sequelize;
