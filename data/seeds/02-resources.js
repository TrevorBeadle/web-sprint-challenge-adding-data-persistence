exports.seed = function (knex) {
  return knex("resources")
    .truncate()
    .then(function () {
      return knex("resources").insert([
        { name: "VSCode", description: "text-editor" },
        { name: "Knex", description: "JS library" },
        { name: "Morgan", description: "API Logger" },
        { name: "Cape", description: "Every hero needs a cape" },
      ]);
    });
};
