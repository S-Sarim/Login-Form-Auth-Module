const User = require('../model/User');
const Record = require('../model/record');
const Role = require('../model/role');
const mongoose = require('mongoose');



async function addRecord(request, response){
    let session;
	try{
		session = mongoose.startSession();
		await session.startTransaction();
		const newRecord = new Record();
		newRecord.username = request.body.username;
		newRecord.fullname = request.body.fullname;
		await newRecord.save({session});
		await session.commitTransaction();
		response.redirect("/records/listrecord");
	}
	catch (error) {
		await session.abortTransaction();
    	response.render("Record/AddModule", { Title: "Error adding Record" });
    }
	finally{
		session.endSession();
	}
};


async function getRecords(request, response){
	const user = await User.findOne({ username: request.session.user.username });
	const role = await Role.findOne({ rolename: user.userrole });
	const newRecords = await Record.find({}, 'username fullname');
	response.render("Record/ListRecord", {newRecords, role}); 
};


async function deleteRecord(request, response){
	const RecordToDelete = request.body.username;
	await Record.findOneAndDelete({ username: RecordToDelete });
	response.redirect('/records/listrecord');
};


async function editRecord(request, response){
	try {
		const session = mongoose.startSession();
		await session.startTransaction();
		const Records = await Record.findOne({username: request.body.username});
		const filter = { username: request.body.username };
		const update = { $set: {} };
		if(request.body.fullname.trim() == ''){
			var fullname = Records.fullname;
		}else{
			var fullname = request.body.fullname;
		}
		update.$set.fullname = fullname;
		const result = await Record.updateOne(filter, update,session);
		if (!result) {
		  response.render("Record/UpdateModule", { Title: "Record does not exist" });
		} else {
		  await session.commitTransaction();
		  response.redirect('/records/listrecord');
		}
	  } catch (error) {
		await session.abortTransaction();
		console.error('Error updating role:', error);
		return response.status(500).json({ error: 'Internal server error.' });
	  }
	  finally{
		session.endSession();
	  }
};

module.exports = {
	addRecord,
	editRecord,
	deleteRecord,
	getRecords,
  };