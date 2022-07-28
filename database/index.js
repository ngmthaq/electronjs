const { v4: uuid } = require("uuid");

const {
  DatabaseTable,
  DATABASE_TABLE_COLUMN_NAME,
} = require("./tables/database.table");

const initDatabase = () => {
  new DatabaseTable().createTable();

  let db = new DatabaseTable().getVersion() || {
    [DATABASE_TABLE_COLUMN_NAME.version]: 0,
  };

  if (db.version < 1) {
    new DatabaseTable().save({
      [DATABASE_TABLE_COLUMN_NAME.uuid]: uuid(),
      [DATABASE_TABLE_COLUMN_NAME.version]: 1,
      [DATABASE_TABLE_COLUMN_NAME.createdAt]: Date.now(),
    });
  }
};

module.exports = {
  initDatabase,
};
