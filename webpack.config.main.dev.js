// webpack.config.main.dev.js
module.exports = [
    {
        mode: 'development',
        entry: {
            main: './app/main',
        },
        target: 'electron-main',
        output: {
            path: __dirname + '/dist',
            filename: '[name].js',
        },
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
            modules: ['./app/main', 'node_modules'],
            alias: {
                'app/*': 'app/*',
            },
        },
    },
];
