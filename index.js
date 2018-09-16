const express = require('express');

const server = express();

var users = [{id: '10', name: "bob", "age": 59}, {id: '11', name: "Molly", "age": 25}];

// GET get all entities
server.get('/users', (request, response) => {
    response.status(200).send({
        response: users
    });
});

// POST create entity
server.post('/users', (request, response) => {
    users.push({id: "12", name: "Aviva", age: "35"});

    response.status(200).send({})
});

// GET one entity by id
server.get('/users/:id', (request, response) => {
    let userIdx = users.findIndex((user) => {
        return user.id === request.params.id
    });

    response.status(200).send({
        response: users[userIdx]
    });
});

// DELETE one entity by id
server.delete('/users/:id', (request, response) => {
    // DAL LAYER LOGIC HIDDEN BY A DRAGON
    let result = null;

    if (!result) {
        response.status(404).send({error: "Sorry, resource not found"});

        return;
    }

    if (request.params.id === '10') {
        result = {name: "Molly", "age": 25}
    } else if(request.params.id === '11') {
        result = {name: "bob", "age": 59}
    }

    response.status(200).send({
        response: result.name + " Deleted"
    });
});

server.listen(3000);