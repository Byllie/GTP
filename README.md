# 🎮 Guess the protocol

Bienvenue sur le projet **TC Wordle Games** !  
Ce site web regroupe **deux jeux en ligne** inspirés du célèbre Wordle, mais adaptés aux thématiques **Télécom** de l’INSA Lyon.  
Les étudiants et passionnés y retrouveront des jeux à la fois ludiques et pédagogiques, conçus pour réviser en s’amusant.

## 🕹️ Les jeux proposés

1. **Protocole réseau** :  
   Devinez le nom d’un **protocole réseau** en un nombre limité de tentatives.  
   Chaque proposition vous donne le caractéristiques communes de votre proposition et de la bonne réponse.

2. **Articles scientifiques** :  
   Tentez d’identifier **l’auteur** (enseignant de TC) d’un **article scientifique** proposé.  
   Au fil de la partie, vous obtenez de nouveaux indices.

---

## 🚀 Démarrage du projet

### Installation après clonage

```bash
npm install
```

### Build pour production

```bash
npm run build
```

### Lancement en développement

```bash
npm run start
```

## 🧱 Architecture

Le projet suit une architecture **MERN** :

- **MongoDB** : base de données pour le contenu des jeux
- **Express.js** : API REST entre le frontend et la base de données
- **React** : interface utilisateur
- **Node.js** : serveur backend

---

*Ce fichier README a été partiellement généré avec l’aide d’une intelligence artificielle pour en faciliter la rédaction.*
