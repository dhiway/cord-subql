### CORD SubQL


Get this started with below steps:

```
yarn
yarn codegen
yarn build
docker-compose up

```


Once the docker is running, try running `yarn ts-node demo/src/ondc.ts --trace-warnings` from cord.js - ondc-hackathon repo, and we can see queries like below working in http://localhost:3001

```
query {
   listings { 
    totalCount
    nodes { id, price product { id } store { id} }
  }
  products {
    totalCount 
    nodes {id}
  }
  calls(filter: { section: { equalTo: "product"}}) {
    totalCount
    nodes { id, args }
  }
}
```
