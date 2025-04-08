const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
require('dotenv').config()


const app = express();
const PORT = process.env.PORT || 3000;
let POTD = null;// protocol of the day
let AOTD = null;// article of the day
let protocolsCollection = null;
let articlesCollection = null;

const DBusername = process.env.DB_USERNAME;
const DBpassword = process.env.DB_PASSWORD;




app.use(express.static(path.join(__dirname, "build")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get(/^\/(?!api(?:\/|$)).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
})

app.get("/api/protocols", (req, res) => {
  let listProtocols = protocolsCollection.find();
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
app.get("/api/guessauthor/*", (req, res) => {
  let reqName = req.params[0];

  if (!AOTD){
    res.json({ message: "Problème de géneration de l'article du jour" });
    return;
  }
  if (AOTD.author.includes(reqName)){
    res.json({message : "equal"})
    
  }else{
    res.json({message : "different"})
  }
  return;
});

app.get("/api/authors", (req, res) => {
  let listAuthors = getAuthors();
  listAuthors.then((listAuthors) => {
    res.json({listAuthors: listAuthors });
  });
});
app.get("/api/title", (req, res) => {
  if (!AOTD){
    res.json({ message: "Problème de géneration de l'article du jour" });
    return;
  }
  res.json({title : AOTD.name})
});

app.get("/api/abstract", (req, res) => {
  if (!AOTD){
    res.json({ message: "Problème de géneration de l'article du jour" });
    return;
  }
  res.json({abstract : AOTD.abstract})
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
    const list_req_prot = protocol["cours"];
    let count = 0;
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
      if (listNames){
        const POTDname = listNames[Math.floor(Math.random() * listNames.length)];
        POTD = getProtocolByName(POTDname);
      }
      POTD.then((POTD) => {console.log(POTD);});
      
    });
    let listArticles = articlesCollection.find().toArray();
    listArticles.then((listArticles) => {
      if (listArticles){
        AOTD = listArticles[Math.floor(Math.random() * listArticles.length)];
      }
      console.log(AOTD.name)
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
    articlesCollection = mongoose.connection.db.collection('articles')
    return protocolsCollection;
  } catch (err) {
    console.error('DB error:', err);
    throw err;
  }
}

async function getArticleByName(articleName){
  try {
    if (!articlesCollection) {
      console.log('Protocols collection is not initialized');
      return null;
    }
    articles = await articlesCollection.findOne({ "name": articleName });

    return articles
  } catch (err) {
    console.log('Error fetching articles :', err);
    return null;
  }

}



async function getAuthors(){
  let articles = null;
  try {
    if (!articlesCollection) {
      console.log('Protocols collection is not initialized');
      return null;
    }
    articles = await articlesCollection.find().toArray();
    let listArticlesName = [];
    for (let i = 0; i < articles.length; i++) {
      for (let j = 0; j < articles[i].author.length; j++) {
        if (!listArticlesName.includes(articles[i].author[j])){
          listArticlesName.push(articles[i].author[j])
        }       
      }
      
    }
    return listArticlesName
  } catch (err) {
    console.log('Error fetching articles :', err);
    return [];
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



