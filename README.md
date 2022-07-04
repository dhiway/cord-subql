### CORD SubQL


Get this started with below steps:

```
yarn
yarn codegen
yarn build

```


## Development

Make changes to mappings, handlers, etc and compile again, and run the project.


Run the below command once build is complete

`docker-compose -f ./docker-compose-development.yaml up`


Once its running, you can run the `yarn demo` from [cord-demo-scripts](dhiway/cord-demo-scripts) and run below query

```
query {
   spaces {
      totalCount
      nodes {
        id, creator, hash, timestamp
      }
   }
}
```

With this, improve upon other events and extrinsics
