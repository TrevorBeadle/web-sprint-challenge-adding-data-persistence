exports.seed = function (knex) {
  return knex("tasks")
    .del()
    .then(function () {
      return knex("tasks").insert([
        {
          description: "Complete knex migration",
          notes: "Use knex.js docs",
          completed: false,
        },
        {
          description: "Complete seeds",
          notes: "GIVE US SEED DATA NEXT TIME",
          completed: false,
        },
        {
          description: "Stop Dr. Evil",
          notes: "Groovy Baby",
          completed: false,
        },
      ]);
    });
};
