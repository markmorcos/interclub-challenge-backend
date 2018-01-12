const express = require('express');
const router = express.Router();
const moment = require('moment');

const TransactionModel = require('../../models/transaction');

router.get('/:memberId', (req, res) => {
    TransactionModel
        .find({ member: req.params.memberId })
        .sort({ date: -1 })
        .then(transactions => {
            const mappedTransactions = transactions.map(transaction => {
                return {
                    id: transaction._id,
                    amount: '€' + transaction.amount.toFixed(2),
                    date: moment(transaction.date).format('DD.MM.YYYY'),
                    type: transaction.type
                };
            });
            res.json(mappedTransactions);
        })
	    .catch(err => {
	        res.status(400).send('Error');
	    });
});

router.get('/:memberId/summary', (req, res) => {
	if (!req.query.number || !req.query.period) {
		return res.status(400).send('Error');
	}
	const date = moment().subtract(req.query.number, req.query.period);
    TransactionModel
        .find({ member: req.params.memberId, date: { $gte : date } })
        .then(transactions => {
        	let amount = transactions.reduce((amount, transaction) => {
        		if (transaction.type === 'income') return amount + transaction.amount;
        		return amount - transaction.amount;
        	}, 0);

            res.json({
                amount: '€' + Math.abs(amount).toFixed(2),
                type: amount > 0 ? 'income' : 'expense'
            });
        })
	    .catch(err => {
	        res.status(400).send('Error');
	    });
});

module.exports = router;
