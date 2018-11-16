const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
SALT_WORK_FACTOR = 10;

var usernameRegex = /^.{4,12}$/;
var usernameRegexErrorMessage = 'Username should be 4-12 characters!';
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
var emailRegexErrorMessage = 'Email is not valid!'
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
var passwordRegexErrorMessage = 'Password should be minimum 8 characters of alphabet and number combination!';

const toLower =  (str) => {
    return str.toLowerCase();
}

const UserSchema = new Schema({
    username: {
        type: String,
        unique: [true, 'Username already exists!'],
        required: [true,'Username is required!'],
        match: [usernameRegex,usernameRegexErrorMessage],
        trim: true
    },
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true,'Email is required!'],
        match: [emailRegex, emailRegexErrorMessage],
        trim: true,
        set: toLower
    },
    password: { 
        type: String,
        required: [true,'Password is required!'],
        select:false
    },
    createdAt: { type: String, required: true, default: Date().toLocaleString() },
    workspaces: [{ type: Schema.Types.ObjectId, ref: 'Workspace' }],
    },{
        toObject:{virtuals:true}
});

// virtuals
UserSchema.virtual("passwordConfirmation")
.get(function(){ return this._passwordConfirmation; })
.set(function(value){ this._passwordConfirmation=value; });

UserSchema.virtual("originalPassword")
.get(function(){ return this._originalPassword; })
.set(function(value){ this._originalPassword=value; });

UserSchema.virtual("currentPassword")
.get(function(){ return this._currentPassword; })
.set(function(value){ this._currentPassword=value; });

UserSchema.virtual("newPassword")
.get(function(){ return this._newPassword; })
.set(function(value){ this._newPassword=value; });



// password validation
UserSchema.path("password").validate(function(v) {
    var user = this;

    // create user
    if(user.isNew){
        if(!user.passwordConfirmation){
            user.invalidate("passwordConfirmation", "Password Confirmation is required!");
        }
        if(user.password !== user.passwordConfirmation) {
            user.invalidate("passwordConfirmation", "Password Confirmation does not matched!");
        }
        if(!passwordRegex.test(user.password)){
          user.invalidate('password', passwordRegexErrorMessage);
        } else if(user.password !== user.passwordConfirmation) {
          user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
        }        
    }

    // update user
    if(!user.isNew){
        if(!user.currentPassword){
            user.invalidate("currentPassword", "Current Password is required!");
        }
        if(user.currentPassword && user.currentPassword != user.originalPassword){
            user.invalidate("currentPassword", "Current Password is invalid!");
        }
        if(user.newPassword !== user.passwordConfirmation) {
            user.invalidate("passwordConfirmation", "Password Confirmation does not matched!");
        }
    }
});

 // find one user by using username
 UserSchema.statics.findOneByUsername = function(username) {
 	return this.findOne({
 		username
 	}).exec()
 }

 //find one user by using username or email
 UserSchema.statics.findOneByUsernameOrEmail = function(username, email) {
    return this.find({$or : [{username: username}, {email: email}]}).exec()
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

// // model methods
UserSchema.methods.comparePassword = function (password) {
  var user = this;
  console.log(password+" : "+user.password);
  console.log( bcrypt.compareSync(password, user.password));

  return bcrypt.compareSync(password, user.password);
};

UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);