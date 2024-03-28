const mongoose = require('mongoose');
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
const Role = new Schema({
	rolename: {
		type: String,
		require: true,
	},
	addusers: {
		type: Boolean,
		require: true,
		default: false
	},
	updateusers: {
		type: Boolean,
		require: true,
		default: false
	},
	deleteusers: {
		type: Boolean,
		require: true,
		default: false
	},
	viewusers: {
		type: Boolean,
		require: true,
		default: true
	},
	addrole: {
		type: Boolean,
		require: true,
		default: false
	},
	updaterole: {
		type: Boolean,
		require: true,
		default: false
	},
	deleterole: {
		type: Boolean,
		require: true,
		default: false
	},
	viewrole: {
		type: Boolean,
		require: true,
		default: true
	},
	addrecord: {
		type: Boolean,
		require: true,
		default: false
	},
	updaterecord: {
		type: Boolean,
		require: true,
		default: false
	},
	deleterecord: {
		type: Boolean,
		require: true,
		default: false
	},
	viewrecord: {
		type: Boolean,
		require: true,
		default: true
	}
});
Role.plugin(passportLocalMongoose);

module.exports = mongoose.model('Role', Role);
