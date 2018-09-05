# Eventing

Eventing was a team submission for the Facebook Hackathon 2018 in Barcelona, under the theme 'Collaboration'. The concept is simple - Currently facebook events are created by people creating an event based on their interest. We would like to invert this principle - instead, when enough people express interest on a certain topic to our Facebook bot, they are put together in a group where they can meet others who have expressed the same interest.

## How the bot works

A Facebook user makes the first move by initiating conversation with the bot. User interacts with a frontend that collects data about what the user is interested in. The database is queried for other users who are interested in the same thing. If it finds that the number of people interested in an event has reached a set limit, it alerts all the users in the channel and broadcasts messages between them.

## Table of contents

- [Getting started](#getting-started)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Developers team](#developers-team)
- [License](#license)

## Getting started

A few things you have to take in consideration before using Eventing

After cloning the repo you'll have to :

### Install global and local dependancies:

- [Homebrew](https://brew.sh/)
- [Node](https://nodejs.org/en/): `brew install node`
- [Npm](https://www.npmjs.com/): `npm install`
- [Ngrok](https://ngrok.com/): `brew install ngrok`

### Migrate and connect Postgres database

- Install PostgreSQL and PostGIS on your machine and run the service:

```bash
brew install postgres
brew install postgis
brew services start postgres
```

- Access PostgresSQL command line on the default database:

```bash
psql postgres
```

Your bash should now look like this:

```bash
psql (10.3)
Type "help" for help.

postgres=#
```

- Now set a password for the current user (the user name is usually the name of the current user on the machine):

```bash
postgres=# ALTER USER <user_name> WITH PASSWORD 'new_password';
```

- In order to correctly create the database, create an **.env** file in the root server folder with this structure:

```dotenv
DB_USER=<user-name>
DB_PASS=<password>
DB_HOST=localhost
DB_PORT=5432
DB_NAME=<db-name>
```

You also can change the port or database name on Postgres configuration database.

- Create the database based on your .env configuration (remember, you should before install npm packages in your server to correctly use sequelize-cli):

```bash
node_modules/.bin/sequelize db:create
```

- Connect to the new created database:

```bash
postgres=# \c <db_name>
```

Is recommended to call the database "eventing".

- Finally, create the extension for PostGIS:

```bash
eventing=# CREATE EXTENSION postgis;
```

**Always remember the semicolon or the syntax will not work.**

- Now your database setup is finished and you are ready to connect it with the server.

Finally, migrate the database on your local machine:

```bash
cd eventing
node_modules/.bin/sequelize db:migrate
```

## Usage

Start the server:

```bash
cd eventing
npm start
```

## Facebook Configurations

- Follow Facebook's [Setting Up Your Facebook App](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup/)
- The bot needs to open up a webview. You'll have to whitelist the url the webview lives on. More about [Webviews](https://developers.facebook.com/docs/messenger-platform/webview)

## Tech Stack

- [Koa](https://koajs.com/)
- [GraphQL](https://graphql.org/)
- [PostgreSQL](https://www.postgresql.org/) & [PostGIS](https://postgis.net/)
- [Sequelize](http://docs.sequelizejs.com/)
- [Facebook Messenger Bot](https://messenger.fb.com/)

## Developers team

- Isabella Chen - [GitHub](https://github.com/isabellachen) - [LinkedIn](https://www.linkedin.com/in/isabella-chen-3196504/)

- Leonardo Di Vittorio - [GitHub](https://github.com/Leon31) - [LinkedIn](https://www.linkedin.com/in/leonardo-di-vittorio/)

- Marlon Becker - [GitHub](https://github.com/marlonbs) - [LinkedIn](https://www.linkedin.com/in/marlon-becker-santos-07ab52a)

- Marco Antonio Ghiani - [GitHub](https://github.com/marcoantonioghiani01) - [LinkedIn](https://www.linkedin.com/in/marcoantonioghiani/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/marcoantonioghiani01/eventing/blob/master/LICENSE) file for details
