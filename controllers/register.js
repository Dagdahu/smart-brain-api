const handleRegister = (db, bcrypt) => (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json('incorrect form');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hash
        })
        .into('logins')
        .returning('email')
        .then(loginEmail => {
            return trx('users').insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .returning('*')
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        res.status(400).json('Unable to register');
    });
}

module.exports = {
    handleRegister: handleRegister
}