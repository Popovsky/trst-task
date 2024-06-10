## Initial preparations

PostgreSQL: v15.6<br />
Node: v18.18.2<br />
Created empty database with name: `test_task_db`<br />
Database config: packages/server/config/config.json

## How to run the project locally

All commands are run from the project root.<br />
First run the command `npm install` to install Lerna.<br />
Once you have Lerna installed, run the command `lerna bootstrap` to install all remaining packages. <br />

Next you need to run the migration to initialize the database.
To do this, run the command:<br />`lerna exec --scope server -- npx sequelize-cli db:migrate`

After successfully installing all packages and completing the migration, you need to start the server and client.

To do this, run the following commands (Commands must be executed in separate terminals):<br />
server: `lerna exec --scope server -- npm run start:dev`<br />
client: `lerna exec --scope client -- npm start`
