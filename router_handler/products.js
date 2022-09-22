// 
exports.productList = (req, res) => {
    res.send('respond with a resource');
}

exports.productDetails = (req, res) => {
    const params = req.params;
    const resObject = {"name":params.name, "sex":"male", "age":18}
    res.json(resObject)
}