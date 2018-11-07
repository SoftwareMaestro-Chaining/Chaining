const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkspaceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, unique: true, required: true },
    scope: { type: String, required: true },
    type: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    // user_id: { type: String, unique: true, required: true }
});

WorkspaceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Workspace', WorkspaceSchema);