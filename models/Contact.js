const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  birthday: { type: Date, required: true }
});

// Transform serialized output: expose `id` (string), hide `_id` and `__v`.
// See https://mongoosejs.com/docs/guide.html#toJSON
contactSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Contact', contactSchema);