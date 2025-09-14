import { MongoClient } from "mongodb";

const connect = async (geo: string) => {
  const URI_MX = process.env.URI_MX;
  const URI_CO = process.env.URI_CO;
  const URI_CL = process.env.URI_CL;
  const URI_AR = process.env.URI_AR;

  if (!URI_MX || !URI_CO || !URI_CL || !URI_AR) {
    throw new Error("Missing MongoDB URI");
  }

  let uri: string;
  switch (geo) {
    case "mx":
      uri = URI_MX;
      break;
    case "co":
      uri = URI_CO;
      break;
    case "cl":
      uri = URI_CL;
      break;
    case "ar":
      uri = URI_AR;
      break;
    default:
      throw new Error("Invalid geo");
  }

  const options = {};

  let client: MongoClient;

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClient?: MongoClient;
    };

    if (!globalWithMongo._mongoClient) {
      globalWithMongo._mongoClient = new MongoClient(uri, options);
    }
    client = globalWithMongo._mongoClient;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
  }

  // Export a module-scoped MongoClient. By doing this in a
  // separate module, the client can be shared across functions.
  return client;
};

export default connect;
