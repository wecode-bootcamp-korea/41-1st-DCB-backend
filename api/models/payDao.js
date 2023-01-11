const { myDataSource } = require("./myDataSource");

const addOrder = async (points) => {
  const orderId = await myDataSource.query(
    `
    INSERT INTO
      orders o
    SELECT
      d
    `,
    [없다치고]
  );
  return result;
};

module.exports = {
  addOrder
}