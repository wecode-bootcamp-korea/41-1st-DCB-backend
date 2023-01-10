const { myDataSource } = require("./myDataSource");

const blablabla = async (blaId, labishId) => {
  const result = await myDataSource.query(
    `

    `,
    [blaId, labishId]
  );
  return result;
};


module.exports = {
  blablabla,
}