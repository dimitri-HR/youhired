# youhired

You Hired

> youHired is a personal job search Organizer where a job seeker can save and track job application status, set reminders, take notes, set search goals, document individual interview restrospectives and save contact info.


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [Team](#team)
1. [Contributing](#contributing)
1. [Style Guide](#style-guide)

## Usage

Clone the repository and install node modules
```
git clone https://github.com/teamyouhired/youhired.git

npm install
```

Compile and bundle dependencies with webpack
```
webpack -w
```

From the root directory, run node to start the server

```
nodemon server/server.js
```

Go to http://localhost:3000 in your browser


## Development

Install and run PostgreSQL locally
```
brew install postgres

pg_ctl -D /usr/local/var/postgres start && brew services start postgresql
```

Start the server

```
nodemon server/server.js
```

## Requirements

- Node.js
- Express
- PostgreSQL
- Sequelize
- React
- Redux

## Team

  - __Product Owner__: Dimitri
  - __Scrum Master__: Chris
  - __Development Team Members__: Dimitri, Chris, Ryan, Jesse 

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Style Guide
See [STYLE-GUIDE.md](STYLE-GUIDE.md) for style guidelines.
