const mariadb = require('mariadb');

class Database {
  constructor(username = '', password = '', host = '', dbName = '', connectionType = 'mariadb', attributes = {}) {
    this.pool = mariadb.createPool({
      host: host,
      user: username,
      password: password,
      database: dbName,
      ...attributes
    });
  }

  async executeStatement(query, params = []) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const result = await conn.query({sql: query, namedPlaceholders: true}, params);
      conn.release();
      return result;
    } catch (error) {
      console.error(error.message);
      if (conn) conn.release();
      return;
    }
  }

  async insert(query, params = []) {
    const result = await this.executeStatement(query, params);
    return result.insertId;
  }

  async select(query, params = []) {
    const result = await this.executeStatement(query, params);
    return result;
  }

  async update(query, params = []) {
    await this.executeStatement(query, params);
  }

  async remove(query, params = []) {
    await this.executeStatement(query, params);
  }

  createParameterString(data, excludedParameters = []) {
    let parameterString = '';
    for (const key in data) {
      if (!excludedParameters.includes(key)) {
        if (key.includes('.')) {
          const [table, column] = key.split('.');
          parameterString += `${key}=:${column},`;
        } else {
          parameterString += `${key}=:${key},`;
        }
      }
    }
    return parameterString.slice(0, -1);
  }
}

module.exports = Database;