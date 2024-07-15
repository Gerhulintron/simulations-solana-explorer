const webpack = require('webpack');

module.exports = function override(config, env) {
    config.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
        zlib: require.resolve('browserify-zlib'),
        url: require.resolve('url'),
        process: require.resolve('process/browser'),
        buffer: require.resolve('buffer'),
        vm: require.resolve('vm-browserify'), // Add this line
    };

    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ]);

    // Add source-map-loader to suppress source map warnings
    config.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules/,
    });

    // Ignore specific warnings
    config.ignoreWarnings = [
        {
            message: /Failed to parse source map/,
        },
    ];

    return config;
};
