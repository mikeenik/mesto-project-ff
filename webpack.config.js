const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
 
module.exports = { 
  entry: './src/index.js', 
  output: { 
    path: path.resolve(__dirname, 'dist'), 
    filename: 'main.js', 
    clean: true, // Очищает папку dist перед новой сборкой 
    assetModuleFilename: 'images/[name][ext]', // Сохраняет изображения в папке images 
  }, 
  mode: 'development', 
  devServer: { 
    static: { 
      directory: path.resolve(__dirname, 'dist'), // Указывает папку для статических файлов 
    }, 
    open: true, 
    hot: true, 
    port: 8080, 
    compress: true, // Включает сжатие для оптимизации загрузки 
  }, 
  module: { 
    rules: [ 
      { 
        test: /\.css$/, 
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'], // Обработка CSS 
      }, 
      { 
        test: /\.(png|svg|jpg|jpeg|gif)$/i, 
        type: 'asset/resource', // Обработка изображений как ресурса 
      }, 
      { 
        test: /\.(woff(2)?|eot|ttf|otf)$/i, // Обработка шрифтов 
        type: 'asset/resource', 
        generator: { 
          filename: 'fonts/[name][ext]', // Сохраняет шрифты в папке fonts 
        }, 
      }, 
    ], 
  }, 
  plugins: [ 
    new HtmlWebpackPlugin({ 
      template: './src/index.html', // Шаблон HTML 
    }), 
    new MiniCssExtractPlugin({ 
      filename: 'main.css', // Имя итогового CSS файла 
    }), 
  ], 
  resolve: { 
    alias: { 
      images: path.resolve(__dirname, 'src/images'), // Создает алиас для изображений 
    }, 
  }, 
}; 
 