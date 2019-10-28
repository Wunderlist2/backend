exports.up = function(knex, Promise) {
    return knex.schema
  
      .createTable("users", table => {
          table.increments(); //users id
          table.string("first_name", 30).notNullable();
          table.string("last_name", 40).notNullable();
          table
              .string("username", 30)
              .notNullable()
              .unique();
          table.string("password", 100).notNullable();
          table.timestamps(true, true); //created, updated
      })
      .createTable("todos", table => {
          table.increments();
          table
              .integer("user_id")
              .unsigned()
              .references("users.id")
              .onDelete("CASCADE")
              .onUpdate("CASCADE");
          table.string("title", 128).notNullable();
          table.string("task", 256).notNullable();
          table.string("notes", 600);
          table.string("setDate").notNullable(); //date reminder
          table.boolean("completed"); //completed y/n
          table.timestamps(true, true);
  
      })
      .createTable("tasks", table => {
          table.increments();
          table
              .integer("todo_id")
              .unsigned()
              .references("id")
              .inTable("todos")
              .onDelete("CASCADE")
              .onUpdate("CASCADE");
          table.string("title", 128).notNullable();
          table.string("setDate").notNullable(); //date reminder
          table.boolean("completed"); //completed y/n
      })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
      .dropTableIfExists("todos")
      .dropTableIfExists("users")
      .dropTableIfExists("tasks")
  };
  