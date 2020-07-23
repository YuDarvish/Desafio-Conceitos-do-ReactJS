const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  var {title, url, techs} = request.body;
  var repository = { 
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  }

  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  var {id} = request.params;
  var {title, url, techs} = request.body;
  const repositoryIndex = repositories.findIndex(p => p.id === id);
  
  if(repositoryIndex < 0){
    return response.status(400).json({error: "Repository not found."})
  }

  var repository = repositories[repositoryIndex];
  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  var {id} = request.params;

  const repositoryIndex = repositories.findIndex(p => p.id === id);
  
  if(repositoryIndex < 0){
    console.log(repositoryIndex);
    return response.status(400).json({error: "Repository not found."})

  }
  console.log(repositoryIndex);
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  var {id} = request.params;
  const repositoryIndex = repositories.findIndex(p => p.id === id);
  
  if(repositoryIndex < 0){
    return response.status(400).json({error: "Repository not found."})
  }

  var repository = repositories[repositoryIndex];
  repository.likes++;

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

module.exports = app;
