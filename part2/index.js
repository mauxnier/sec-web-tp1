const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { createReadStream } = require('fs');

const app = express();

// Middleware pour parser les cookies
app.use(cookieParser());

// Configuration de la session
app.use(
    session({
        secret: 'votre_secret_key',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 60000, // Durée d'expiration du cookie en millisecondes (ici, 1 minute)
        },
    })
);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// Page d'accueil
app.get('/', function (req, res) {
    // Vérifier si l'utilisateur est connecté en vérifiant la présence d'une variable de session
    if (req.session.username) {
        res.send(`Bienvenue, ${req.session.username} !`);
    } else {
        createReadStream('index.html').pipe(res);
    }
});

// Page de connexion
app.post('/login', (req, res) => {
    // Simuler le processus d'authentification
    const username = 'user';
    const password = 'mdp';

    // Vérifier les identifiants
    if (req.body.username === username && req.body.password === password) {
        // Définir la variable de session avec le nom d'utilisateur
        req.session.username = req.body.username;
        res.send('Vous êtes connecté');
    } else {
        res.send('Identifiants incorrects');
    }
});

// Page de déconnexion
app.get('/logout', (req, res) => {
    // Détruire la session en supprimant la variable de session
    req.session.destroy();
    res.redirect('/');
    res.send('Vous êtes déconnecté');
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
