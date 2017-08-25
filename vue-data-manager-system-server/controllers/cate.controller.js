const mongoose = require('mongoose');
const Cate = require('../models/cate.model')
exports.create = function(req, res, next) {
    const cate = new Cate(req.body);

    cate.save()
        .then(data => {
            res.json(data)
        })
};
function reverseTree(data,pid){
    var result=[],
        temp;
    var data = JSON.parse(JSON.stringify(data));
    for (var i in data) {
        if (data[i].parentId == pid) { // null
            result.push(data[i]);

            temp = reverseTree(data, data[i]._id);
            if (temp.length > 0) {
                data[i].children = temp;
            }
        }
    }
    return result;
}
exports.update = function(req, res, next) {
    const cate = new Cate(req.body);
    const id = req.params.id;

    Cate.findByIdAndUpdate(id, { $set: req.body }, { new: false })
        .then((data) => {
            res.send({ data });
        })
};
exports.getall= function (req,res,next) {
    var type=req.params.type;
    Cate.find({type:type}, function (err,data) {
        var rpTree=reverseTree(data,null);
        res.json(rpTree)
    })
}
exports.remove = function(req, res, next) {
    var id = req.params.id;
    var ids = [];
    Cate.findOne({ _id: id }, function(err, doc) {
        if (doc) {
            ids = [doc._id];
            doc.getChildren().then(function(docs) {
                for (var i = 0; i < docs.length; i++) {
                    ids.push(docs[i]._id);
                }

                Cate.remove({ _id: { $in: ids } })
                    .then(deleted => {
                        res.json({ "message": "delete ok" });
                    })
            });

        }

    })
};