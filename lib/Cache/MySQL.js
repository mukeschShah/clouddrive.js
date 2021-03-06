'use strict';

let SQL = require('./SQL');

class MySQL extends SQL {
  constructor(config, callback) {
    super(config);

    this.db.raw(
      `CREATE TABLE IF NOT EXISTS configs (
        id INT(11) NOT NULL auto_increment,
        email VARCHAR(32),
        token_type VARCHAR(16),
        expires_in INT(12),
        refresh_token TEXT,
        access_token TEXT,
        last_authorized TIMESTAMP,
        content_url MEDIUMTEXT,
        metadata_url MEDIUMTEXT,
        checkpoint TEXT,
        PRIMARY KEY (id),
        INDEX (email)
      );`
    )
      .then(() => {
        return this.db.raw(
          `CREATE TABLE IF NOT EXISTS nodes (
             id VARCHAR(22) NOT NULL,
             name VARCHAR(255),
             kind VARCHAR(16),
             md5 VARCHAR(128),
             status VARCHAR(16),
             created DATETIME,
             modified DATETIME,
             raw_data LONGTEXT,
             PRIMARY KEY (id),
             INDEX (id, name, md5)
           );`
        );
      })
      .then(() => {
        return this.db.raw(
          `CREATE TABLE IF NOT EXISTS nodes_nodes (
             id INT(11) NOT NULL auto_increment,
             id_node VARCHAR(22) NOT NULL,
             id_parent VARCHAR(22) NOT NULL,
             PRIMARY KEY (id),
             UNIQUE KEY (id_node, id_parent),
             INDEX(id_node, id_parent)
           );`
        );
      })
      .then(() => {
        return callback(null, this);
      });
  }
}

module.exports = MySQL;
