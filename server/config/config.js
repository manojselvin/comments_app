const env = process.env.NODE_ENV || 'development';
if (env === 'production') {
	process.env.PORT = 80;
	process.env.MONGODB_URI = "mongodb://localhost:27017/instacar";
} else if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/instacar_dev';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/instacar_test';
}

const port = process.env.PORT;

module.exports = {
    port
};