const sql = require('msnodesqlv8');
const config = require('./config');
const { sqlQuery, memoryUsage } = require('./helper');

sql.open(config.connectionString, async (err, con) => {
  if (err) {
    console.error(err);
    return;
  }

  await createTable(con);
  await fillData(con);
});

function createTable(con) {
  return new Promise(async (resolve, reject) => {
    await sqlQuery(`DROP TABLE IF EXISTS ${config.table}`, con);
    await sqlQuery(
      `CREATE TABLE ${config.table} (
           id INT  PRIMARY KEY IDENTITY (1, 1),
           field0 image,
           field1 image,
           field2 image,
           field3 image,
           field4 image,
           field5 image,
           field6 image,
           field7 image,
           field8 image,
           field9 image,
           )`,
      con
    );
    console.log(`Table ${config.table} created`);
    resolve();
  });
}

function fillData(con) {
  return new Promise(async (resolve, reject) => {
    const insert = [];

    for (let iRow = 0; iRow < 1; iRow++) {
      insert['fields'] = '';
      insert['values'] = '';
      console.log(`Prepare row: ${iRow + 1}`);

      const noOfInserts = 1;

      for (let iField = 0; iField < noOfInserts; iField++) {
        const a = new Array(3 * 1024 * 1024);
        a.fill(255);
        const b = Buffer.from(a);

        let hex = '0x' + b.toString('hex');

        insert['fields'] += 'field' + iField;
        insert['values'] += hex;

        if (iField < 9) {
          insert['fields'] += ',';
          insert['values'] += ',';
        }
      }

      let query = `INSERT INTO ${config.table} (${insert['fields']}) VALUES (${insert['values']})`;
      await sqlQuery(query, con);

      console.log(`Row ${iRow + 1} inserted, rss memory usage:`, memoryUsage());
    }

    resolve();
  });
}
