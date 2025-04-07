const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config()


const app = express();
const PORT = process.env.PORT || 3000;
let POTD = {};
var protocolsCollection = null;

const DBusername = process.env.DB_USERNAME;
const DBpassword = process.env.DB_PASSWORD;

const protocolsSchema = new mongoose.Schema({
  name: String,
  layer: Number,
  dateCreated: Number,
  RFC: Number,
  wiki: String,
  cours: [String]  
});

const protocolsCollectionSchema = new mongoose.Schema({
  protocols: [protocolsSchema]  
});

const ProtocolsCollection = mongoose.model('protocols', protocolsCollectionSchema);



app.use(express.static(path.join(__dirname, "build")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get(/^\/(?!api(?:\/|$)).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
})

app.get("/api/protocols", (req, res) => {
  let listProtocols = ProtocolsCollection.find();
  listProtocols.then((listProtocols) => {
    res.json({listProtocols: listProtocols });
  });
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
    
  let dic_comp = {};
  reqProtocol.then((protocol) => {
    if (protocol === null) {
      res.json({ message: "Protocole non trouvé" });
      return;
    }
  if (POTD === "") {
    res.json({ message: "Pas encore de POTD" });
    return;
  } else if (POTD["name"] === reqName) {
    res.json({ message: "C'est le bon protocole !" });
    return;
  }
  
    if (protocol === null) {
      res.json({ message: "Protocole non trouvé" });
      return;
    }
    POTD.then((POTD) => {
    if (protocol["layer"] > POTD["layer"]) {
      dic_comp["layer"] = "lower";
    }
    else if (protocol["layer"] < POTD["layer"]) {
      dic_comp["layer"] = "higher";
    }
    else {
      dic_comp["layer"] = "equal";
    }
    if (protocol["dateCreated"] > POTD["dateCreated"]) {
      dic_comp["dateCreated"] = "lower";
    }
    else if (protocol["dateCreated"] < POTD["dateCreated"]) {
      dic_comp["dateCreated"] = "higher";
    }
    else {
      dic_comp["dateCreated"] = "equal";
    }
    if (protocol["RFC"] > POTD["RFC"]) {
      dic_comp["RFC"] = "lower";
    }
    else if (protocol["RFC"] < POTD["RFC"]) {
      dic_comp["RFC"] = "higher";
    }
    else {
      dic_comp["RFC"] = "equal";
      console.log("2",protocol["RFC"]);
      console.log("3",POTD);
    }
    console.log(POTD["name"]);
    const list_req_prot = protocol["cours"];
    let count = 0;
    for (let x in list_req_prot) {
      for(let y in POTD["cours"]){
        if (x === y) {
          count += 1;
        }
      }
    }
    console.log(count);
    if ((count === list_req_prot.length)&&(count === POTD["cours"].length)) {
      dic_comp["cours"] = "equal";
    }
    else if (count > 0) {
      dic_comp["cours"] = "partial";
    }
    else {
      dic_comp["cours"] = "different";
    }
    if (protocol["wiki"] === POTD["wiki"]) {
      dic_comp["wiki"] = "equal";
    }
    else {
      dic_comp["wiki"] = "different";
    }
    if (protocol["name"] === POTD["name"]) {
      dic_comp["name"] = "equal";
    }
    else {
      dic_comp["name"] = "different";
    }
    console.log({reqName: protocol, dic_comp: dic_comp})
    res.json({reqName: protocol, dic_comp: dic_comp});
});});
});

app.listen(PORT, () => {
  // console.log(DBpassword);
  // console.log(DBusername);
  startDB().then((a) => {
    let listNames = getProtocolsName();
    listNames.then((listNames) => {
      if (listNames !== null) {
        console.log('listNames:', listNames);
      } else {
        console.log('listNames is null');
        return;
      }
      const POTDname = listNames[Math.floor(Math.random() * listNames.length)];
      POTD = getProtocolByName(POTDname);
      console.log('Protocol of the day:', POTD); 
    });
  }
  ).catch((err) => {
    console.error('Error starting DB:', err);
  });
  

  
  

  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});


async function startDB() {
  try {
    console.log('Connecting DB...');
    await mongoose.connect(`mongodb+srv://${DBusername}:${DBpassword}@gpt.cceot9t.mongodb.net/GTP?retryWrites=true&w=majority&appName=GPT`);
    console.log('DB connected');
    console.log('Using database : ', mongoose.connection.db.databaseName);
    mongoose.connection.db.collections().then((collections) => {
      console.log('Collections in the database:');
      collections.forEach((collection) => {
        console.log(`- ${collection.collectionName}`);
      });
    });

    protocolsCollection = mongoose.connection.db.collection('protocols')
    
    return protocolsCollection;
  } catch (err) {
    console.error('DB error:', err);
    throw err;
  }
}








async function getProtocolsName() {
  try {
    let protocols = null;
    try {
      if (!protocolsCollection) {
        console.log('Protocols collection is not initialized');
        return null;
      }
      protocols = await protocolsCollection.find().toArray();

    } catch (err) {
      console.log('Error fetching protocols:', err);
      return [];
    }
    if (!protocols || protocols.length === 0) {
      console.log('No protocols found');
      return [];
    }
    console.log(protocols.length);
    let listNames = [];
    console.log('Protocols:', protocols[0]);

    for (let i = 0; i < protocols.length; i++) {
      listNames.push(protocols[i].name);
    }
    return listNames;
  } catch (err) {
    console.error(err);
    
  }
}

async function getProtocolByName(protocolName) {
  try {
    let result = null;
    try {
      if (!protocolsCollection) {
        console.log('Protocols collection is not initialized');
        return null;
      }
      result = await protocolsCollection.findOne({ "name": protocolName });
    } catch (err) {
      console.log('Error fetching protocols:', err);
      return [];
    }
    if (!result) {
      console.log('No protocol found');
      return null;
    }
      console.log('Protocole trouvé:', result.name);
    if (result) {
      return result;
    } else {
      console.log('Protocole non trouvé');
      return null;
    }
  } catch (err) {
    console.error('Erreur lors de la récupération du protocole:', err);
  }

}
