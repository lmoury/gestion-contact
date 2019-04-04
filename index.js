const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/index');
var cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.status(200).json({ok: 'init application'});
});

app.use(express.static(__dirname + '/frontend'));

app.get('/api/contacts', function (req, res) {
    db.contact.findAll({
        include: [{
            model: db.numero
        }]
    }).then(function (data) {
        res.status(200).json(data);
    });
});

app.get('/api/contacts/:id', function (req, res) {
    const id = req.params.id;
    db.contact.findById(id,
        {
            include: [{
                model: db.numero
            }]
        }).then(function (contact) {
        if (!contact) {
            return res.status(404).json({error: 'contact not found.'});
        }
        res.status(200).json(contact);
    });
});

app.post('/api/contacts', async function (req, res) {
    const data = {
        nom: req.body.nom || null,
        prenom: req.body.prenom || null
    };

    const _numeros = req.body['numero[]'] || [];
    const contact = db.contact.build(data);
    const _contact = await contact.save();
    var tableau = null;
    if(_numeros[0][1] != null) {
        tableau = Promise.all(_numeros.map(_num => db.numero.build({ contactId: _contact.id, numero: _num }).save()));
    }
    else {
        tableau = db.numero.build({ contactId: _contact.id, numero: _numeros }).save();
    }
    tableau.then(function(){
        const newContact =  db.contact.findOne({
            where: {
                id: _contact.id
            },
            include: [{
                model: db.numero
            }]
        });
        res.status(201).json(newContact);
    });
});

app.post('/api/contacts/:id', function (req, res) {
    const id = req.params.id;
    const _numeros = req.body['numero[]'];
    db.contact.findById(id).then(function (contact) {
        if (!contact) {
            return res.status(404).json({error: 'contact not found.'});
        }
        contact.nom = req.body.nom;
        contact.prenom = req.body.prenom;
        contact.save().then(function (contact) {
            db.numero.destroy({ where: { contactId: id }}).then(function(){
                var tableau = null;
                if(_numeros[0][1] != null) {
                    tableau = Promise.all(_numeros.map(_num => db.numero.build({ contactId: id, numero: _num }).save()));
                }
                else {
                    tableau = db.numero.build({ contactId: id, numero: _numeros }).save();
                }
                tableau.then(function(){
                    db.contact.findById(id,
                        {
                            include: [{
                                model: db.numero
                            }]
                        }).then(function(data){
                            return res.status(200).json(data);
                        });
                });
            });
        });
    });
});

app.delete('/api/contacts/:id', function (req, res) {
    const id = req.params.id;
    db.contact.destroy({ where: { id: id }}).then(function(){
        return res.status(204).json();
    });
});

app.listen(4505, function () {
    console.log('application ready port : 4505');
});
