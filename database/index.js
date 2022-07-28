const { v4: uuid } = require("uuid");

const {
  DatabaseTable,
  DATABASE_TABLE_COLUMN_NAME,
} = require("./tables/database.table");

const initDatabase = () => {
  new DatabaseTable().createTable();

  let ver = new DatabaseTable().getVersion() || 0;
  if (ver < 1) {
    new DatabaseTable().save(
      {
        [DATABASE_TABLE_COLUMN_NAME.uuid]: uuid(),
        [DATABASE_TABLE_COLUMN_NAME.version]: 1,
        [DATABASE_TABLE_COLUMN_NAME.createdAt]: Date.now(),
      },
      true
    );
  }
};

module.exports = {
  initDatabase,
};
