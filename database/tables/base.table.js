const db = require("better-sqlite3")(process.env.DB_NAME);

class BaseTable {
  conditions = DEFAULT_CONDITIONS;
  relations = DEFAULT_RELATIONS;
  limit = DEFAULT_LIMIT;
  offset = DEFAULT_OFFSET;
  orderBy = DEFAULT_ORDER_BY;
  orderDir = DEFAULT_ORDER_DIR;

  constructor(tableName, columns) {
    this.tableName = tableName;
    this.columns = columns;
  }

  all() {
    return db.prepare(`SELECT * FROM ${this.tableName}`).all();
  }

  where(column, condition, operator = "=") {
    this.conditions = this.conditions.push(
      `${column} ${operator} ${condition}`
    );

    return this;
  }

  andWhere(column, condition, operator = "=") {
    this.conditions = this.conditions.push(
      `AND ${column} ${operator} ${condition}`
    );

    return this;
  }

  orWhere(column, condition, operator = "=") {
    this.conditions = this.conditions.push(
      `OR ${column} ${operator} ${condition}`
    );

    return this;
  }

  orderBy(column, dir = "asc") {
    this.orderBy = column;
    this.orderDir = dir;

    return this;
  }

  limit(limit = 10) {
    this.limit = limit;

    return this;
  }

  offset(offset = 0) {
    this.offset = offset;

    return this;
  }

  join(relationTable, relationKey, rootKey = "id", rootTable = this.tableName) {
    let query = `INNER JOIN ${relationTable} ON ${rootTable}.${rootKey} = ${relationTable}.${relationKey}`;
    this.relations = this.relations.push(query);

    return this;
  }

  leftJoin(
    relationTable,
    relationKey,
    rootKey = "id",
    rootTable = this.tableName
  ) {
    let query = `LEFT JOIN ${relationTable} ON ${rootTable}.${rootKey} = ${relationTable}.${relationKey}`;
    this.relations = this.relations.push(query);

    return this;
  }

  rightJoin(
    relationTable,
    relationKey,
    rootKey = "id",
    rootTable = this.tableName
  ) {
    let query = `RIGHT JOIN ${relationTable} ON ${rootTable}.${rootKey} = ${relationTable}.${relationKey}`;
    this.relations = this.relations.push(query);

    return this;
  }

  get(columns = ["*"]) {
    let selectQuery = `SELECT ${columns.join(", ")} FROM ${this.tableName}`;
    let relationQuery = this.relations.join(" ");
    let conditionQuery = `WHERE ${this.conditions.join(" ")}`;
    let query = `${selectQuery} ${relationQuery} ${conditionQuery}`;

    if (this.orderBy) {
      query = `${query} ORDER BY ${this.orderBy} ${this.orderDir}`;
    }

    if (this.limit) {
      query = `${query} LIMIT ${this.limit}`;
    }

    if (this.offset) {
      query = `${query} OFFSET ${this.offset}`;
    }

    this.resetValue();

    return db.prepare(query).all();
  }

  first(columns = ["*"]) {
    let selectQuery = `SELECT ${columns.join(", ")} FROM ${this.tableName}`;
    let relationQuery = this.relations.join(" ");
    let conditionQuery = `WHERE ${this.conditions.join(" ")}`;
    let query = `${selectQuery} ${relationQuery} ${conditionQuery}`;

    if (this.orderBy) {
      query = `${query} ORDER BY ${this.orderBy} ${this.orderDir}`;
    }

    if (this.limit) {
      query = `${query} LIMIT ${this.limit}`;
    }

    if (this.offset) {
      query = `${query} OFFSET ${this.offset}`;
    }

    this.resetValue();

    return db.prepare(query).get();
  }

  save(record, isDebug = false) {
    let key = Object.keys(record);
    let keyQuery = key.join(", ");
    let valueQuery = key.map((k) => `@${k}`).join(", ");
    let sql = `INSERT INTO ${this.tableName} (${keyQuery}) VALUES (${valueQuery})`;

    try {
      db.prepare(sql).run(record);
    } catch (error) {
      if (isDebug) {
        throw error;
      } else {
        return false;
      }
    }

    return true;
  }

  saveMany(records, isDebug = false) {
    try {
      db.transaction(() => {
        records.forEach((record) => {
          this.save(record);
        });
      });
    } catch (error) {
      if (isDebug) {
        throw error;
      } else {
        return false;
      }
    }

    return true;
  }

  createTable() {
    let columnNames = Object.keys(this.columns);
    let dataTypes = Object.values(this.columns);
    let query = [];

    columnNames.forEach((col, index) => {
      let str = `${col} ${dataTypes[index]}`;
      query.push(str);
    });

    let queryString = query.join(", ");
    let sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (${queryString})`;

    db.prepare(sql).run();
  }

  resetValue() {
    this.conditions = DEFAULT_CONDITIONS;
    this.relations = DEFAULT_RELATIONS;
    this.limit = DEFAULT_LIMIT;
    this.offset = DEFAULT_OFFSET;
    this.orderBy = DEFAULT_ORDER_BY;
    this.orderDir = DEFAULT_ORDER_DIR;
  }
}

const DEFAULT_CONDITIONS = [];
const DEFAULT_RELATIONS = [];
const DEFAULT_LIMIT = null;
const DEFAULT_OFFSET = null;
const DEFAULT_ORDER_BY = null;
const DEFAULT_ORDER_DIR = null;

module.exports = {
  BaseTable,
};
