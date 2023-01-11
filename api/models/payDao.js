const { myDataSource } = require("./myDataSource");

const addOrder = async (userId) => {
  const result = await myDataSource.query(
    `
    INSERT INTO

    SELECT

    FROM
      orders o
    WHERE
    `,
    [ooooo]
  );
  return result;
};


module.exports = {
  addOrder
}