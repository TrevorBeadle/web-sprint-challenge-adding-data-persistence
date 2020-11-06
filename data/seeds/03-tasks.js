exports.seed = function (knex) {
  return knex("tasks")
    .del()
    .then(function () {
      return knex("tasks").insert([
        {
          description: "Complete knex migration",
          notes: "Use knex.js docs",
          project_id: 1,
          completed: false,
        },
        {
          description: "Complete seeds",
          notes: "GIVE US SEED DATA NEXT TIME",
          project_id: 3,
          completed: false,
        },
        {
          description: "Stop Dr. Evil",
          notes: "Groovy Baby",
          project_id: 2,
          completed: false,
        },
      ]);
    });
};
