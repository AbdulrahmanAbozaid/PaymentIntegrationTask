const Item = require("./item.model");

exports.getAllItems = async () => {
  try {
    const items = await Item.find({});
    return items;
  } catch (err) {
    console.error(err);
  }
};

exports.getItem = async (id) => {
  try {
    const item = await Item.findById(id);
    return item;
  } catch (err) {
    console.error(err);
  }
};
