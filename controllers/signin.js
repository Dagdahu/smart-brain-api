handleSignin = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form');
    }
    db.select('email','hash').from('logins')
        .where({'email': email})
        .then(login => {
            if (login.length && bcrypt.compareSync(password, login[0].hash)) {
                db.select('*')
                    .from('users')
                    .where('email', '=', email )
                    .then(user => {
                        if (user.length) {
                            res.json(user[0]);
                        }
                        else {
                            res.status(400).json('Not found');
                        };
                    })
                    .catch(err => {
                        res.status(400).json('Error getting profile');
                    });
            }
            else {
                res.status(400).json('Wrong email or password');
            };
        })
        .catch(err => {
            res.status(400).json('Error signing in');
        });
}

module.exports = {
    handleSignin: handleSignin
}