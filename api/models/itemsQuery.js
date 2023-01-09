const defaultQuery = `
SELECT
i.id,
i.name as product_name,
i.thumbnail,
i.price,
c.name AS product_category,
i.contents,
i.descriptions,
b.name AS brand_name,
JSON_ARRAYAGG(
  JSON_OBJECT("option_id",o.id,"option_content",o.content)
) AS options,
oc.category AS option_category_name,
oc.id AS option_category_id
FROM items i
LEFT JOIN category c ON i.category_id = c.id
LEFT JOIN brands b ON i.brand_id = b.id
LEFT JOIN options o ON o.item_id = i.id
LEFT JOIN option_categories oc ON oc.id = o.category_id
`;

const whereQuery = {
  getItemById: `WHERE i.id = ? `,

  //IF YOU WANT TO SEE CATEGORY PAGES
  categoryPage: (category) => {
    return `WHERE i.category_id=${Number(category)} `;
  },

  theOtherPages: `WHERE TRUE `,

  //IF YOU WANT TO SEARCH SPECIFIC ITEMS
  search: (search) => {
    return `
    WHERE 
    i.name LIKE '%${search}%' 
    OR 
    i.contents LIKE '%${search}%' 
    OR 
    i.descriptions LIKE '%${search}%' `;
  },
};

const groupByQuery = `GROUP BY i.id, oc.category, oc.id `;

const sortCategory = {
  new: "created_at DESC",
  expensive: "price DESC",
  cheap: "price",
  default: "created_at DESC",
};

const orderByQuery = (orderString) => {
  return `ORDER BY ${orderString} `;
};

const limitQuery = {
  //DEFAULT LIMIT WOULD BE 8
  mainPage: `LIMIT 8;`,

  //PAGINATION IN OTHER PAGES
  theOtherPages: (pageNumber) => {
    return `LIMIT ${20 * (pageNumber - 1)},20;`;
  },
};

const getItemOrList = async (sort, category, page, search) => {
  let extraQuery;

  //RETURN QUERY STRING FOR itemsDao.getItem
  if (!sort && !category && !page && !search) {
    extraQuery = whereQuery.getItemById + groupByQuery;
  }

  //RETURN QUERY STRING FOR itemsDao.getItemsList
  else {
    //DEFAULT SORT CONDITION WOULD BE created_at DESC
    const orderString = sortCategory[sort];

    extraQuery =
      (search
        ? whereQuery.search(search) //SEARCH PAGE
        : category > 0
        ? whereQuery.categoryPage(category) //CATEGORY PAGE
        : whereQuery.theOtherPages) +
      groupByQuery +
      orderByQuery(orderString) +
      (!category ? limitQuery.mainPage : limitQuery.theOtherPages(page));
  }
  return defaultQuery + extraQuery;
};

module.exports = {
  getItemOrList,
};
