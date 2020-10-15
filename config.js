const mssqlDbConfig = {
  user: 'demo',
  password: 'demo123',
  server: `localhost`,
  database: 'mem_leak',
  driver: 'ODBC Driver 17 for SQL Server',
  options: {
    instanceName: 'SQLEXPRESS',
  },
};

const table = 'MainlyBlobs';

const connectionString = `server=${mssqlDbConfig.server}\\${mssqlDbConfig.options.instanceName};Database=${mssqlDbConfig.database};Trusted_Connection=Yes;Driver={${mssqlDbConfig.driver}}`;

module.exports = {
  mssqlDbConfig,
  table,
  connectionString,
};
