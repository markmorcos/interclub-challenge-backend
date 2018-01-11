const express = require('express')
const router = express.Router()

const MemberModel = require('../../models/member');
const TransactionModel = require('../../models/transaction');

router.get('/aye', (req, res) => {
    res.send('aye aye');
});

router.get('/list-members', (req, res) => {
    MemberModel
        .find({})
        .sort({number: 1})
        .then(members => {
            const mappedMembers = members.map(member => {
                return {
                    id: member._id,
                    first_name: member.first_name,
                    last_name: member.last_name,
                    number: member.number
                };
            });
            res.json(mappedMembers);
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

router.get('/members/:memberId', (req, res) => {
    MemberModel
        .findById(req.params.memberId)
        .then(member => {
            TransactionModel
                .find({ member: req.params.memberId })
                .sort({ date: -1 })
                .then(transactions => {
                    const mappedTransactions = transactions.map(transaction => {
                        return {
                            id: transaction._id,
                            amount: transaction.amount,
                            date: transaction.date,
                            type: transaction.type
                        };
                    });
                    res.json({
                        id: member._id,
                        first_name: member.first_name,
                        last_name: member.last_name,
                        number: member.number,
                        transactions: mappedTransactions
                    });
                });
            })
            .catch(err => {
                res.status(400).send('Error');
            });
});

module.exports = router;
