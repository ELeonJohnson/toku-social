"use strict";

const Schema = use("Schema");

class PostsSchema extends Schema {
  up() {
    this.create("posts", table => {
      table.increments();
      table.text("content");
      table.string("type").notNullable();
      table.string("image_url", 600).nullable();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table.timestamps();
    });
  }

  down() {
    this.drop("posts");
  }
}

module.exports = PostsSchema;
