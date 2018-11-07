const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: String, required: true, default: Date().toLocaleString() }
    // workspaces: [{ type: Schema.Types.ObjectId, ref: 'Workspace' }],
});

// create new User document
 UserSchema.statics.create = function(username, email, password, createdAt) {
 	const user = new this({
 		username,
 		email,
 		password,
 		createdAt
 	})

 	// return the Promise
 	return user.save()
        .then(function(callback) {
        // res.json(callback);
        console.log(callback);
    })
    .catch(function(error){
        console.log('Error saving the user : '+error);
    });
 }

 // find one user by using username
 UserSchema.statics.findOneByUserName = function(username) {
 	return this.findOne({
 		username
 	}).exec()
 }

 // verify the hash of the User


UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    })

});


UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);