exports.up = async function (knex) {
  await knex.schema.createTable("projects", tbl => {
    tbl.increments("id");
    tbl.text("name", 128).notNull();
    tbl.text("description");
    tbl.boolean("completed").notNull().defaultTo(false);
  });

  await knex.schema.createTable("resources", tbl => {
    tbl.increments("id");
    tbl.text("name", 128).notNull().unique();
    tbl.text("description");
  });

  await knex.schema.createTable("tasks", tbl => {
    tbl.increments("id");
    tbl.text("description", 128).notNull();
    tbl.text("notes", 128);
    tbl.integer("project_id").references("id").inTable("projects");
    tbl.boolean("completed").notNull().defaultTo(false);
  });

  await knex.schema.createTable("projects_resources", tbl => {
    tbl
      .integer("project_id")
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("resource_id")
      .references("id")
      .inTable("resources")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl.primary(["project_id", "resource_id"]);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("projects_resources");
  await knex.schema.dropTableIfExists("tasks");
  await knex.schema.dropTableIfExists("resources");
  await knex.schema.dropTableIfExists("projects");
};
