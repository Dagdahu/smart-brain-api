const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'dc29aa370212410097b3130513927763'
})

const handleImageUrl = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input
    )
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).json('unable to work with api');
    });
}

const handleImage = (req, res, db) => {
    db('users').where({'id': req.params.id})
        .increment('entries',1)
        .returning('entries')
        .then(entries => {
            if (entries.length) {
                res.json(entries[0]);
            }
            else {
                res.status(400).json('Not found');
            };
        })
        .catch(err => {
            res.status(400).json('Error updating profile');
        });
}

module.exports = {
    handleImage: handleImage,
    handleImageUrl:handleImageUrl
}