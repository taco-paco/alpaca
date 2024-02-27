const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
    {
        mode: 'development',
        entry: {
            renderer: './app/front/index.tsx',
        },
        target: 'electron-renderer',
        output: {
            path: __dirname + '/dist',
            filename: '[name].js',
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                configFile: 'tsconfig.json',
                            },
                        },
                    ],
                },
                {
                    test: /\.(s[ac]ss|css)$/, // Match .scss, .sass, and .css files
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                            },
                        },
                        'sass-loader',
                    ],
                    include: /\.module\.(scss|css)$/, // Match .module.scss or .module.css files
                },
                {
                    test: /\.(s[ac]ss|css)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                    exclude: /\.module\.(scss|css)$/,
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({ filename: 'index.css' }),
            new HtmlWebpackPlugin({
                title: 'Webpack App',
                filename: 'main.html',
                template: 'app/front/main.html',
            }),
        ],

        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            modules: ['./app', 'node_modules'],
            alias: {
                'alpaca-addon': [
                    '@taco-paco/alpaca-addon-mac-arm64',
                    '@taco-paco/alpaca-addon-mac-x64',
                    '@taco-paco/alpaca-addon-win-x64',
                    '@taco-paco/alpaca-addon-linux-x64',
                ],
            },
        },
    },
];
