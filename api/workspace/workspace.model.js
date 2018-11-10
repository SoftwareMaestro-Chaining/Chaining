const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkspaceSchema = new Schema({
    name: { type: String, unique: [true, 'Workspace name already exists!'], required: true },
    description: { type: String },
    scope: { type: String, required: true },
    type: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

WorkspaceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Workspace', WorkspaceSchema);