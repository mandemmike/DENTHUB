var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Dentist = require('../models/dentist')

router.get('/api/dentists/coordinates', function(req, res, next){
    Dentist.find({}, function(err, result){
        if(err){res.status(404).json()}
        if(result === null){res.status(404).json()}
        res.status(200).json(result)
    })

})

router.get('/api/dentists/:id', function(req, res, next){
    Dentist.find({_id: req.params.id}, function(err, result){
        if(err){res.status(404).json()}
        if(result === null){res.status(404).json()}
        res.status(200).json(result)
    })

})

router.get('/api/dentists', function(req, res, next){
    try{
        var query = Dentist.find();
    for (var fieldName in req.query)
    {
        if(req.query.hasOwnProperty(fieldName))  
        {
            if(req.query[fieldName])  
            {
                query.where(fieldName).equals(req.query[fieldName]);
            }
        }
    }
    query.exec(function(err,data){
        if(err) { return next(err); }
        res.status(200).json(data)
    });  
}catch(error){
    res.status(404).json()
}

})
router.delete('/api/dentists', function(req, res, next){
    Dentist.remove({}, function(err, Dentist) {
        if (err) { return next(err); }
        res.status(204).json();
    })
});

router.post('/api/dentists', function(req, res, next ){
    try {
        var dentist = new Dentist(req.body)
    }catch(err) {
        console.log(err)
    }
        dentist.save(function(err, result){
            if(err){res.status(400).json()}
            console.log('Added dentist to db ' + err )
            res.status(200).json()
    })
})

module.exports = router; 

 