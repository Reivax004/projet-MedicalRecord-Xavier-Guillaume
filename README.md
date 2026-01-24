# Bienvenue sur Medical Record !

Ce projet a été crée dans le but d'apporter à tous les utilisateurs un suivi médical détaillé dans lequel on y retrouve les informations de santé du patient telles que le groupe sanguin, le poids, la taille, les maladies, les vaccins, les rendez-vous médicaux, etc...

## Comment accéder au projet ?

Pour lancer l'application en local plusieurs étapes sont à effectuer.
### Pour lancer le backend MongoDB, ouvrir un terminal dans le répertoire "backend" du projet et exécuter la commande suivante: 
```bash
node index.js
```

### Pour lancer le frontend Angular, ouvrir un deuxième terminal dans le répertoire "medicalrecord" du projet et exécuter la commande suivante:
```bash
ng serve
```
Remarque: Si la commande ne marche pas, faite l'installation des packages avec la commande `npm install` puis refaire `ng serve`.

### Une fois les trois commandes lancées, ouvrir le navigateur et tapper le lien suivant `http://localhost:4200`.

## Comment ajouter les jeux de données par défaut ?

### Version Mac et Linux: Dans le terminale du répertoire "backend", réaliser l'importations des données avec la commande suivante:
```bash
mongoimport --db MedicalRecord --collection establishments --jsonArray --file ./../dataset/establishments.json
mongoimport --db MedicalRecord --collection practitioners --jsonArray --file ./../dataset/practitioners.json
mongoimport --db MedicalRecord --collection patients --jsonArray --file ./../dataset/patients.json
mongoimport --db MedicalRecord --collection follow_up_files --jsonArray --file ./../dataset/follow_up_files.json
mongoimport --db MedicalRecord --collection medical_documents --jsonArray --file ./../dataset/medical_documents.json
mongoimport --db MedicalRecord --collection appointments --jsonArray --file ./../dataset/appointments.json
```

### Version Windows: Ouvrir un nouveau terminal PowerShell (pas ceux des IDE) et exécuter la commande suivante dans le répertoire "backend" pour accéder à MongoSH:
```bash
mongosh mongodb://localhost:27017/MedicalRecord
```
### Ensuite, lancer les commandes suivantes:
```bash
db.establishments.insertMany(contenu du fichier establishments.json dans le dossier dataset)
db.practitioners.insertMany(contenu du fichier practitioners.json dans le dossier dataset)
db.patients.insertMany(contenu du fichier patients.json dans le dossier dataset)
db.follow_up_files.insertMany(contenu du fichier follow_up_files.json dans le dossier dataset)
db.medical_documents.insertMany(contenu du fichier medical_documents.json dans le dossier dataset)
db.appointments.insertMany(contenu du fichier appointments.json dans le dossier dataset)
```
