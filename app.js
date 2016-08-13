var express= require('express');


var app=express();

var mongojs=require('mongojs');

var db=mongojs('mydb',['myCollection']);

var bodyParser=require('body-parser');

app.use(express.static(__dirname+"/client"));

app.use(bodyParser.json());

app.get('/employeeList',function (req,res) {
	
console.log("I got an GET request");

db.myCollection.find(function (err,doc) {

	//console.log(doc);
	res.json(doc);
});
});

app.post('/employeeList',function (req,res) {
	
	//console.log(req.body);
	db.myCollection.insert(req.body,function (err,doc) {
		res.json(doc);
	})

});

app.get('/employeeList/:id',function (req,res) {
	var id=req.params.id;
	//console.log(id);
	db.myCollection.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		//console.log(doc);
		res.json(doc);
	});

});
app.delete('/employeeList/:id',function (req,res) {
	
	var id=req.params.id;
	console.log(id);
	db.myCollection.remove({_id:mongojs.ObjectId(id)},function (err,doc) {
		
		res.json(doc);

	});

});
app.put('/employeeList/:id',function (req,res) {
	
	var id=req.params.id;
	console.log(id);
	db.myCollection.findAndModify({
		query: {_id:mongojs.ObjectId(id)},
		update :{$set:{name: req.body.name, address: req.body.address, phone: req.body.phone, email: req.body.email}},
		new: true}
		,function (err,doc) {
			
			res.json(doc);

		});
});


app.listen(3000);