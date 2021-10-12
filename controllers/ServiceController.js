exports.getServices = (req, res, next) => {
    let body = req.body;
    Establishment.find()
    .then(establishments=>{
        return res.status(200).json({
            establishments : establishments
        });
    })
    .catch(error=>{
        return res.status(500).json({
            message:'Internal server error'
        });
    });
}