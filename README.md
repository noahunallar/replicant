## Bacon Number API

This project creates a service exposing an HTTP API endpoint which, given an actor(name_lastName), returns their degrees of separation from Kevin Bacon (the Bacon number).

## Installation

Make sure Docker installed on your computer.

## How to run the project

Copy credits.csv file and paste under replicant/src/data/

```
cd replicant
docker build -t baconApi .
docker run -p 3000:3000 baconApi
```

## Features

- Express
- REST API
- Docker

## GET Routes

- visit http://localhost:3000/baconNumber/:actorName

## Sample requests

## Random actor

- localhost:3000/baconNumber/tom_hanks

Response:

```
{
"result": "Shortest path found for a given actor.",
"degreesOfSeparation": 1
}
```

## Kevin Bacon himself

- localhost:3000/baconNumber/Kevin_bacon

Response:

```
{
"result": "You entered Kevin Bacon himself."
}
```

## Non-actor input

- localhost:3000/baconNumber/12321442144

Response:

```
{
"result": "Please try another actor name."
}
```
