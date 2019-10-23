const Clarifai = require("clarifai");
const app = new Clarifai.App({
    apiKey: "fc4355133cf04f4ab5d60850dd483e91"
})

const handleApiCall = (req, res) => {
    console.log(req.body);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        console.log(data);
        res.JSON(data);
    })
    .catch(error => res.status(400).json("unable to work with api"));
};
    
const handleImage = (req, res, db) => {
    const {id} = req.body;
    db("users").where("id", "=", id )
    .increment("entries", 1)
    .returning("entries")
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json("unable to get entries"))
};

module.exports = {handleImage, handleApiCall};