const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    text: {
        type: String,
        // trims any white space
        trim: true,
        required: [true, "please add some text"]
    },
    amount: {
        type: Number,
        required: [true, 'please add a positive or negative number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("Transaction", transactionSchema);