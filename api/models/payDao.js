const { myDataSource } = require("./myDataSource");

const addOrder = async (userId) => {
  const result = await myDataSource.query(
    `
    INSERT INTO
      orders o (userId)
    SELECT
      u.id
    FROM
      users u
    WHERE u.id = ?
    `,
    [userId]
  );
  return result;
};

module.exports = {
  addOrder
}