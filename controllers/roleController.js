const Role = require('../model/role');
const User = require('../model/User');
const mongoose = require('mongoose');


async function addRole(request, response){
	let session;
    try{
		session = await mongoose.startSession();
		session.startTransaction();
		const newRole = new Role();
		const role = await Role.findOne({ rolename: request.body.rolename });
		if(role){
			throw new Error("Role already exists");
		}
		newRole.rolename = request.body.rolename;
		if(!request.body.addusers){
			newRole.addusers = false;
		}
		if(!request.body.deleteusers){
			newRole.deleteusers = false;
		}
		if(!request.body.updateusers){
			newRole.updateusers = false;
		}
		if(!request.body.viewusers){
			newRole.viewusers = false;
		}
		if(!request.body.addrole){
			newRole.addrole = false;
		}
		if(!request.body.deleterole){
			newRole.deleterole = false;
		}
		if(!request.body.updaterole){
			newRole.updaterole = false;
		}
		if(!request.body.viewrole){
			newRole.viewerole = false;
		}
		if(!request.body.addrecord){
			newRole.addrecord = false;
		}
		if(!request.body.deleterecord){
			newRole.deleterecord = false;
		}
		if(!request.body.updaterecord){
			newRole.updaterecord = false;
		}
		if(!request.body.viewrecord){
			newRole.viewrecord = false;
		}
		newRole.addusers = request.body.addusers;
		newRole.updateusers = request.body.updateusers;
		newRole.deleteusers = request.body.deleteusers;
		newRole.viewusers = request.body.viewusers;
		newRole.addrole = request.body.addrole;
		newRole.updaterole = request.body.updaterole;
		newRole.deleterole = request.body.deleterole;
		newRole.viewrole = request.body.viewrole;
		newRole.add = request.body.addrecord;
		newRole.update = request.body.updaterecord;
		newRole.delete = request.body.deleterecord;
		newRole.view = request.body.viewrecord;
		await newRole.save();
		await session.commitTransaction();
		response.redirect("/roles/rolelist");
	}
	catch (error) {
		console.log(error);
    	response.render("Role/addrole", { Title: error });
    }
};

async function viewRoles(request, response){
	const user = await User.findOne({ username: request.session.user.username });	
	const role = await Role.findOne({ rolename: user.userrole });
    const roles = await Role.find({}, 'rolename addusers updateusers deleteusers viewusers addrole updaterole deleterole viewrole addrecord updaterecord deleterecord viewrecord');
	response.render("Role/rolelist", {roles, role}); 
};


async function deleteRole(request, response){
    const RoleToDelete = request.body.rolename;
	await Role.findOneAndDelete({ rolename: RoleToDelete });
	response.redirect('/roles/rolelist');
};


async function updateRole(request, response){
	const editrole = await Role.find({rolename: request.body.rolename});
	let session;
	try {
		session = mongoose.startSession();
		await session.startTransaction();
		if(!request.body.add){
			var add = false;
		}
		if(!request.body.delete){
			var dodelete = false;
		}
		if(!request.body.update){
			var doupdate = false;
		}
		if(!request.body.view){
			var view = false;
		}
		var add = Boolean(request.body.add);
		var doupdate = Boolean(request.body.update);
		var dodelete = Boolean(request.body.delete);
		var view = Boolean(request.body.view);
		const filter = { rolename: request.body.rolename };
		const update = { $set: {} };
		update.$set.add = add;
		update.$set.update = doupdate;
		update.$set.delete = dodelete;
		update.$set.view = view;
		const result = await Role.updateOne(filter, update, session);
		if (!result) {
		  response.render("Role/editrole", { Title: "Role does not exist" });
		} else {
			await session.commitTransaction();
		  response.redirect('/roles/rolelist');
		}
	  } catch (error) {
		console.error('Error updating role:', error);
		return response.render("Role/editrole", { role: editrole });
	  }
}


module.exports = {
	addRole,
	updateRole,
	deleteRole,
	viewRoles,
  };