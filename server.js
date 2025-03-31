const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const app = express();
const PORT = process.env.PORT || 3000;

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
  let listNames = getProtocolsName();
  listNames.then((listNames) => {
    res.json({listNames: listNames });
  });
});



app.get("/api/guessprotocol/*", (req, res) => {
  let reqName = req.params[0];
  let reqProtocol = getProtocolByName(reqName);

  reqProtocol.then((protocol) => {
    res.json({reqName: protocol});
  });
});

app.listen(PORT, () => {
  console.log('DB started');
  startDB();
  

  let listNames = getProtocolsName();
  listNames.then((listNames) => {
    const POTD = listNames[Math.floor(Math.random() * listNames.length)];
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
