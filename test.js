const { MongoClient } = require("mongodb");

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
async function main() {
  const filter = {};
  const client = await MongoClient.connect(
    'mongodb+srv://GTPuser:WEBpassword@gpt.cceot9t.mongodb.net/'
  );
  const coll = client.db('GTP').collection('protocols');
  const cursor = coll.find(filter);
  const result = await cursor.toArray();
  console.log(result);
  await client.close();
  return result;

}

main()