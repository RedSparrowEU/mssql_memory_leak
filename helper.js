function memoryUsage() {
  return (process.memoryUsage().rss / 1024 / 1024 / 1024).toFixed(3) + ' GiB';
}

function sqlQuery(sql, con) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
        res = {};
      }
    });
  });
}

module.exports = {
  memoryUsage,
  sqlQuery,
};
