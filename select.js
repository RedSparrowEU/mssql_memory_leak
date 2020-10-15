'use strict';

const sql = require('msnodesqlv8');
const config = require('./config');
const { sqlQuery, memoryUsage } = require('./helper');

sql.open(config.connectionString, async (err, con) => {
  if (err) {
    console.error(err);
    return;
  }
  await readRow(con);
  console.log('End: ', memoryUsage());
});

function readRow(con) {
  return new Promise(async (resolve, reject) => {
    const query = `SELECT TOP 1 * FROM ${config.table}`;

    const noOfQueries = 20;

    for (let i = 0; i < noOfQueries; i++) {
      const res = await sqlQuery(query, con);
      console.log('Query: ', i, res);
      console.log('RSS Mem: ', memoryUsage());
    }
    con.close();

    console.log('Closed. RSS Mem: ', memoryUsage());

    setTimeout(() => {
      resolve();
    }, 10000);
  });
}
