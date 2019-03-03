module.exports = {
    plugins: [
        require('cssnano')({
            autoprefixer: {
                add: true,
                remove: false,
                browsers: ['> 2%, last 3 versions, not ie <= 7']
            }
        })
    ]
};
