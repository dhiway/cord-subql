import {
  SubstrateDatasourceKind,
  SubstrateHandlerKind,
  SubstrateProject,
} from "@subql/types";

// Can expand the Datasource processor types via the genreic param
const project: SubstrateProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "karura-starter",
  description:
    "This project can be used as a starting point for developing your SubQuery project. It indexes all transfers on Karura network",
  runner: {
    node: {
      name: "@subql/node",
      version: ">=3.0.1",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /* The genesis hash of the network (hash of block 0) */
    chainId:
      "0xc72c4affd4c44980fd37f61d81cb24e85927bc48dd9271f6dcfd40bb13c08733",
    /**
     * This endpoint must be a public non-pruned archive node
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * You can get them from OnFinality for free https://app.onfinality.io
     * https://documentation.onfinality.io/support/the-enhanced-api-service
     */
    endpoint: ["ws://host.docker.internal:9944"],
    // Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
    //dictionary: "https://api.subquery.network/sq/subquery/karura-dictionary",
    // chaintypes: {
    //   file: "./dist/chaintypes.js",
    // },
  },
  dataSources: [
    {
      kind: SubstrateDatasourceKind.Runtime,
      startBlock: 1,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          /*{
            kind: SubstrateHandlerKind.Block,
            handler: "handleBlock",
          },*/
          {
            kind: SubstrateHandlerKind.Call,
            handler: "handleCall",
          },
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleEvent",
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
