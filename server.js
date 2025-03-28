const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const app = express();
const PORT = process.env.PORT || 3000;
let POTD = "";

const protocolsSchema = new mongoose.Schema({
  name: String,
  layer: Number,
  dateCreated: Number,
  RFC: Number,
  wiki: String,
  cours: [String]  // This ensures `cours` is an array of strings
});

const protocolsCollectionSchema = new mongoose.Schema({
  protocols: [protocolsSchema]  // This represents the array of protocols
});

const ProtocolsCollection = mongoose.model('protocols', protocolsCollectionSchema);



app.use(express.static(path.join(__dirname, "build")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/api/protocolsName", (req, res) => {
  var listNames = getProtocolsName();
  listNames.then((listNames) => {    
    res.json({listNames: listNames });
  });
});



app.get("/api/guessprotocol/*", (req, res) => {
  var reqName = req.params[0];
  var reqProtocol = getProtocolByName(reqName);
  var dic_comp = {};

  if (reqProtocol["layer"] > POTD["layer"]) {
    dic_comp["layer"] = "lower";
  }
  else if (reqProtocol["layer"] < POTD["layer"]) {
    dic_comp["layer"] = "higher";
  }
  else {
    dic_comp["layer"] = "equal";
  }
  if (reqProtocol["dateCreated"] > POTD["dateCreated"]) {
    dic_comp["dateCreated"] = "lower";
  }
  else if (reqProtocol["dateCreated"] < POTD["dateCreated"]) {
    dic_comp["dateCreated"] = "higher";
  }
  else {
    dic_comp["dateCreated"] = "equal";
  }
  if (reqProtocol["RFC"] > POTD["RFC"]) {
    dic_comp["RFC"] = "lower";
  }
  else if (reqProtocol["RFC"] < POTD["RFC"]) {
    dic_comp["RFC"] = "higher";
  }
  else {
    dic_comp["RFC"] = "equal";
  }
  const list_req_prot = reqProtocol["cours"];
  let count;
  for (let x in list_req_prot) {
    if (list_req_prot[x] === POTD["name"]) {
      count += 1;
    }
  }
  if (count === list_req_prot.length) {
    dic_comp["cours"] = "equal";
  }
  else if (count > 0) {
    dic_comp["cours"] = "partial";
  }
  else {
    dic_comp["cours"] = "different";
  }
  if (reqProtocol["wiki"] === POTD["wiki"]) {
    dic_comp["wiki"] = "equal";
  }
  else {
    dic_comp["wiki"] = "different";
  }
  if (reqProtocol["name"] === POTD["name"]) {
    dic_comp["name"] = "equal";
  }
  else {
    dic_comp["name"] = "different";
  }

  reqProtocol.then((protocol) => {
    res.json({reqName: protocol, dic_comp: dic_comp});
  });
});

app.listen(PORT, () => {
  console.log('DB started');
  startDB();
  

  var listNames = getProtocolsName();
  listNames.then((listNames) => {
    POTD = listNames[Math.floor(Math.random() * listNames.length)];
    console.log('Protocol of the day:', POTD); 
  });
  

  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

app.post("*", (req, res) => {
  res.json({ message: "Pas encore de DB" });
});

async function startDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/local');
    console.log('DB started');
    mongoose.connection.useDb('local');
    console.log(mongoose.connection.db.databaseName);
    
  } catch (err) {
    console.error('DB error:', err);
  }
}








async function getProtocolsName() {
  try {
    const protocols = await ProtocolsCollection.find();
    console.log(protocols[0].protocols.length);
    listNames = [];
    for (let i = 0; i < protocols[0].protocols.length; i++) {
      listNames.push(protocols[0].protocols[i].name);
    }
    return listNames;
  } catch (err) {
    console.error(err);
  }
}

async function getProtocolByName(protocolName) {
  try {
    const result = await ProtocolsCollection.findOne({ "protocols.name": protocolName });

    if (result) {
      const protocol = result.protocols.find(p => p.name === protocolName);
      console.log('Protocole trouvé:', protocol);
      return protocol;
    } else {
      console.log('Protocole non trouvé');
      return null;
    }
  } catch (err) {
    console.error('Erreur lors de la récupération du protocole:', err);
  }

}
