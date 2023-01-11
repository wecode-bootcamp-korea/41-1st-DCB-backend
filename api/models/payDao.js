const { myDataSource } = require("./myDataSource");

const addOrder = async (userId) => {
  const result = await myDataSource.query(
    `

    `,
    [userId]
  );
  return result;
};

module.exports = {
  addOrder
}