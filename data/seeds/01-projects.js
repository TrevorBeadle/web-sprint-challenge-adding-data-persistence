exports.seed = function (knex) {
  return knex("projects")
    .truncate()
    .then(function () {
      return knex("projects").insert([
        {
          name: "Sprint Challenge",
          description: "Adding Data Persistance",
          completed: false,
        },
        { name: "Save the World", completed: false },
        {
          name: "Complete this database",
          description: "Give us seed data next time please",
          completed: false,
        },
      ]);
    });
};
