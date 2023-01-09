import dbConnect from "../db-connect";

export const getDocsWithPagination = async (Model, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      await dbConnect();
      let { search, page, limit } = query;
      if (!search) {
        search = "";
      }

      page = parseInt(page);
      limit = parseInt(limit);
      if (isNaN(page) || page < 1) {
        page = 1;
      }
      if (isNaN(limit)) {
        limit = 10;
      }
      if (limit < 1) {
        limit = 1;
      }
      const getSearchQuery = () => {
        const conditions = [];
        const indexedFields = Object.keys(Model.schema.paths).filter((key) => {
          return Model.schema.paths[key].options.index;
        });
        indexedFields.forEach((key) => {
          conditions.push({ [key]: { $regex: search } });
        });
        const searchQuery = { $or: conditions };
        return searchQuery;
      };
      const searchQuery = search ? getSearchQuery() : {};
      const count = await Model.count(searchQuery);

      let totalPages = Math.ceil(count / limit);
      if (totalPages < 1) {
        totalPages = 1;
      }
      if (page > totalPages) {
        page = totalPages;
      }
      const documents = await Model.find(searchQuery)
        .limit(limit)
        .skip((page - 1) * limit);
      resolve({
        documents,
        currentPage: page,
        totalPages,
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
