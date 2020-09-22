// we use this file to do the methods that interacts with databases

const Transaction = require('../models/Transactions');
// @desc get all transactions
// @route GET /api/v1/transactions
// @access public
exports.getTransactions = async (req, res, next) => {
    try {
        // we search for the data in the database 
        const transactions = await Transaction.find();
        // we can return whatever we want
        return res.status(200).json({
            sucsses: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        return res.status(500).json({
            sucsses: false,
            error: error.message
        });
    }
}

// @desc add a transactions
// @route POST /api/v1/transactions
// @access public
exports.addTransaction = async (req, res, next) => {
    try {
        const { text, amount } = req.body;
        const transaction = await Transaction.create(req.body);
        res.status(201).json({
            sucsses: true,
            data: transaction
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            // client error
            return res.status(400).json({
                sucsses: false,
                error: messages
            });
        }
        else {
            // server error
            return res.status(500).json({
                sucsses: false,
                error: error.message
            });
        }

    }
}

// @desc delete transaction
// @route DELETE /api/v1/transactions/:id
// @access public
exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({
                sucsses: false,
                error: "Not Found"
            });
        }
        await transaction.remove();
        return res.status(200).json({
            sucsses: true,
            data: {}
        });
    } catch (error) {
        return res.status(500).json({
            sucsses: false,
            error: error.message
        });
    }
}