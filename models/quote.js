const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    quote: { type: String, required: true, minlength: 5 },
    created_at: Date
})
const Quote = mongoose.model('Quote', QuoteSchema);

module.exports = {
    Quote: Quote,
}