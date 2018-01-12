const express = require('express');
const router = express.Router();

const MemberModel = require('../../models/member');

router.get('/', (req, res) => {
    MemberModel
        .find({})
        .sort({ number: 1 })
        .then(members => {
            const mappedMembers = members.map(member => {
                return {
                    id: member._id,
                    name: member.first_name + ' ' + member.last_name
                };
            });
            res.json(mappedMembers);
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

router.get('/:id', (req, res) => {
    MemberModel
        .findById(req.params.id)
        .then(member => {
            res.json({
                id: member._id,
                name: member.first_name + ' ' + member.last_name,
                number: member.number,
                email: member.email
            });
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

module.exports = router;
