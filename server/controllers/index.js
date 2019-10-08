
const getPageData = (req, res, next) => {
	res.status(200).send({ 'status': 'success'});
};

module.exports = {
	getPageData
};