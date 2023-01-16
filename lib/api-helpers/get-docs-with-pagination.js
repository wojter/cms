import dbConnect from "../db-connect";
import PostCategories from "../../models/PostCategory";
import ReactionCategories from "../../models/ReactionCategory";
import mongoose from "mongoose";

export const getDocsWithPagination = async (Model, query, populateData) => {
  return new Promise(async (resolve, reject) => {
    try {
      await dbConnect();
      let { search, page, limit, additional_data, filter } = query;

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
      const getFilterQuery = () => {
        // Ex. const filter = "user_id:63a2f12cc4264856c120c75f,post_id:63a2f12cc4264856c120c75f"
        let filters = filter.split(",");
        const conditions = {};
        filters.forEach((con) => {
          const [key, value] = con.split(":");
          if (key.endsWith("_id") && mongoose.isValidObjectId(value)) {
            conditions[key] = mongoose.Types.ObjectId(value);
          } else {
            conditions[key] = value;
          }
        });
        return conditions;
      };

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
      const filterQuery = filter ? getFilterQuery() : {};
      const searchQuery = search ? getSearchQuery() : {};
      const finalQuery = { $and: [filterQuery, searchQuery] };
      const count = await Model.count(finalQuery);

      let totalPages = Math.ceil(count / limit);
      if (totalPages < 1) {
        totalPages = 1;
      }
      if (page > totalPages) {
        page = totalPages;
      }

      let dbQuery = Model.find(finalQuery)
        .limit(limit)
        .skip((page - 1) * limit);

      if (populateData && Array.isArray(populateData)) {
        populateData.forEach(([field, Model]) => {
          dbQuery.populate({ path: field, model: Model });
        });
      }

      const documents = await dbQuery;

      let additionalData = {};
      if (additional_data === "posts") {
        const postCategories = await PostCategories.find();
        if (postCategories.length) {
          additionalData.postCategories = postCategories;
        }
      } else if (additional_data === "reactions") {
        const reactionCategories = await ReactionCategories.find();
        if (reactionCategories.length) {
          additionalData.reactionCategories = reactionCategories;
        }
      }

      resolve({
        documents,
        currentPage: page,
        totalPages,
        additionalData,
        totalDocumentNumber: count,
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
