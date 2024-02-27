const path = require('path');

module.exports = [
    {
        mode: 'development',
        entry: {
            engine: './app/engine/index.ts',
        },
        target: 'electron-main',
        output: {
            path: __dirname + '/dist',
            filename: '[name].js',
            pathinfo: true,
            libraryTarget: 'commonjs2',
        },
        externals: './alpaca',
        // node: {
        //     __dirname: false,
        //     __filename: false,
        // },

        module: {
            rules: [
                {
                    test: /\.[jt]s$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: 'tsconfig.json',
                                transpileOnly: true,
                            },
                        },
                    ],
                },
            ],
        },

        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            modules: ['./', 'node_modules'],
            alias: {
                'alpaca-addon': [
                    '@taco-paco/alpaca-addon-mac-arm64',
                    '@taco-paco/alpaca-addon-mac-x64',
                    '@taco-paco/alpaca-addon-win-x64',
                    '@taco-paco/alpaca-addon-linux-x64'
                ],
            },
        },
    },
];
