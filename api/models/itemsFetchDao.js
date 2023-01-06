const { myDataSource } = require("./myDataSource");

const itemsFetch = async (rawQuery) => {
  try {
    return await myDataSource.query(rawQuery);
  } catch (err) {
    console.log(err);
    const error = new Error("Unknwon ERROR in itemsFetch");
    error.statusCode = 400;
    throw error;
  }
};
module.exports = {
  itemsFetch,
};
