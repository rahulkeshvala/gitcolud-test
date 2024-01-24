const jwt = require("jsonwebtoken");

// Retrieve all data from the database of particular model.
const findAll = (model) => {
  return model.find();
};

// Delete a data with the specified id in the request
const deleteById = (model, id) => {
  return model.findByIdAndRemove(id);
};

// Find all data using query params
const findByQuery = (model, query) => {
  return model.find(query);
};

// Update data using ID params
const updateDataById = (model, id, data) => {
  return model.findByIdAndUpdate(id, data, { useFindAndModify: false });
};

// findone user from collection
const findOneUser = (model, query) => {
  return model.findOne(query);
};

// Generate new JWT token
const generateJwtToken = (id) => {
  const token = jwt.sign({ _id: id }, "NODE_MONGO_DEMO", {
    expiresIn: "10h",
  });
  return token;
};

// Verify JWT token, If it's get error then return null
const verifyToken = (token) => {
  const decodedData = jwt.verify(token, "NODE_MONGO_DEMO", (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });
  return decodedData;
};

module.exports = {
  findAll,
  deleteById,
  findAll,
  findByQuery,
  updateDataById,
  findOneUser,
  generateJwtToken,
  verifyToken,
};
