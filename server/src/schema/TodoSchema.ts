import mongoose from 'mongoose';

//------------------------------------------------------------------------------------------------//

export default new mongoose.Schema
({
  task: { type: String, required: true, },
  isFinished: { type: Boolean, default: false },
  timestamp: { type: Date, default: new Date().getTime() },
});
