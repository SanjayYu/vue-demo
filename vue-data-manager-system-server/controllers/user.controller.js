const mongoose = require('mongoose');
const User = require('../models/user.model')
exports.create = function(req, res, next) {
    const user = new User(req.body);
    user.save()
        .then(data => {
            res.send(data)
        })
};
exports.update = function (req, res, next) {
    console.log(1)
    const user = new User(req.body);
    const id = req.params.id;
    User.findByIdAndUpdate(id, { $set: req.body }, { new: false })
        .then((user) => {
            res.send({ user });
        })

};
exports.login = function (req, res, next) {
    console.log({ 'name': req.body.name, 'password': req.body.password })
    User.findOne({ 'name': req.body.name, 'password': req.body.password }, function (err, data) {
        res.json(data);
    })
};
exports.list= function (req,res,next) {
    var page=(req.body.page)?req.body.page:1;
    var limit=(req.body.limit)?req.body.limit:5;
    var queryCondition={};
    if(req.body.name && req.body.name.trim().length>0){
        name=req.body.name;
        queryCondition={
            name:new RegExp(name,'i')
        }
    }
    User.paginate(queryCondition,{page:page,limit:limit}, function (err,result) {
        res.json(result)
    })
}
exports.remove = function (req, res, next) {
    var id = req.params.id;
    User.findByIdAndRemove(id, function (err, doc) {
        res.json({ "message": "delete ok" });
    })

};
exports.removes= function (req,res,next) {
    var ids = req.body.ids;
    if (ids.length > 0) {
        User.remove({ _id: { $in: ids } })
            .then(deletedUsers => {
                res.json({ "message": "delete ok" });
            })
    } else {
        res.status(404)
            .send({ "message": "404" });
    }
}
