// src/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  userID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  assignees: [{ type: String }],
  project: { type: String, required: true },
});

module.exports = mongoose.models.Task || mongoose.model('Task', TaskSchema);
