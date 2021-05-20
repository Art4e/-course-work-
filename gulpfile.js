const { src, dest, series, watch } = require(`gulp`)
const gulp = require(`gulp`)
const gulpCli = require(`gulp-cli`)

// -------- Используем для выбора сборки
const gulpif = require('gulp-if');
const argv = require('yargs').argv;

// -------- Удаление, cоединить, переименовать файлы
const del = require(`del`)
const concat = require(`gulp-concat`)
const rigger = require(`gulp-rigger`)
const rename = require(`gulp-rename`);

// -------- Обработка css 
const autoPrefixer = require(`gulp-autoprefixer`)
const cleanCss = require(`gulp-clean-css`)
const notify = require(`gulp-notify`)
const uglify = require(`gulp-uglify-es`).default
const sourceMaps = require(`gulp-sourcemaps`)

// -------- Обработка html 
const htmlmin = require(`gulp-htmlmin`)

// -------- Создание svg спрайта
const svgSprite = require('gulp-svg-sprite')
const svgmin = require('gulp-svgmin')
const cheerio = require('gulp-cheerio')
const replace = require('gulp-replace')

// -------- Обработка изображений 
const image = require(`gulp-image`)
const webp = require(`gulp-webp`);


// -------- Babel обработка JS
const babel = require(`gulp-babel`)
const babelLoader = require(`babel-loader`)

// -------- Сервер 
const browserSync = require(`browser-sync`).create()

const path = {
  imgIn: { //Пути откуда брать исходники картинок до зжатия
    img: [
      `#source/img/**/*.+(png|jpg|jpeg|svg)`,
      `!#source/img/src/**/*.+(png|jpg|jpeg|svg)`
    ],
    webp: `#source/img/**/*.webp`,
    imgOut: `source/img/`
  },
  source: { //Пути откуда брать исходники
    html: `source/*.html`, //Синтаксис source/*.html говорит gulp что мы хотим взять все файлы с расширением .html
    scripts: `source/js/index.js`,//В стилях и скриптах нам понадобятся только main файлы 
    scriptsPhp: `source/php/**/*.*`,
    style: `source/css/index.css`,
    img: [
      `source/img/**/*.+(png|jpg|webp|jpeg|svg)`,
      `source/*.ico`,
      `!source/img/src/**`,
      `!source/img/svg/**`
    ],
    imgIco: `source/*.ico`,
    imgSrc: `/#source/img/**/*.+(png|jpg|jpeg|svg)`,
    webpSrc: `/#source/img/**/*.webp`,
    svg: `source/img/svg/*.svg`,
    fonts: `source/fonts/**/*.*`
  },
  dev: { //Kуда складывать файлы dev сборки
    html: `dev/`,
    scripts: `dev/js/`,
    scriptsPhp: `dev/php/`,
    style: `dev/css/`,
    img: `dev/img/`,
    imgIco: `dev/`,
    fonts: `dev/fonts/`
  },
  build: { //Kуда складывать файлы build сборки
    html: `build/`,
    scripts: `build/js/`,
    scriptsPhp: `build/php/`,
    style: `build/css/`,
    img: `build/img/`,
    imgIco: `build/`,
    fonts: `build/fonts/`
  },
  watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: `source/**/*.html`,
    scripts: `source/js/**/*.js`,
    style: `source/css/**/*.css`,
    img: `source/img/**/*.*`,
    svg: `src/img/svg/**/*.svg`,
    fonts: `source/fonts/**/*.*`
  },
  clean: { //Укажем папки для удаления перед каждым новым запуском gulp 
    dev: `dev`,
    build: `build`,
  }
};

// -------- Перенос шрифтов
const fontsAll = () => {
  return src(path.source.fonts)
    .pipe(gulpif(argv.build, dest(path.build.fonts), dest(path.dev.fonts)))
}
// -------- Перенос php
const scriptsPhp = () => {
  return src(path.source.scriptsPhp)
    .pipe(gulpif(argv.build, dest(path.build.scriptsPhp), dest(path.dev.scriptsPhp)))
}

// -------- Обработка HTML файлов
const htmlMinify = () => {
  return src(path.source.html)
    .pipe(rigger())
    .pipe(gulpif(argv.build, htmlmin({
      collapseWhitespace: true
    })))
    // .pipe(htmlValidator())
    .pipe(gulpif(argv.build, dest(path.build.html), dest(path.dev.html)))
    .pipe(browserSync.stream())
}

// -------- Обработка стилей
const styles = () => {
  return src(path.source.style)
    .pipe(gulpif(!argv.build, sourceMaps.init()))
    .pipe(rigger())
    .pipe(autoPrefixer({
      cascade: false
    }))
    .pipe(gulpif(argv.build, cleanCss({
      level: 2
    })))
    .pipe(gulpif(!argv.build, sourceMaps.write()))
    // .pipe(gulpif(argv.build, rename({ suffix: '.min' })))// Сборка build - добавляем суффикс .min
    .pipe(gulpif(argv.build, dest(path.build.style), dest(path.dev.style)))
    .pipe(browserSync.stream())
}

// -------- Обработка JS
const scripts = () => {
  return src(path.source.scripts)
    .pipe(gulpif(!argv.build, sourceMaps.init()))
    .pipe(rigger())
    .pipe(babel({
      presets: [`@babel/env`]
    }))
    .pipe(gulpif(argv.build, uglify().on(`error`, notify.onError())))
    .pipe(gulpif(!argv.build, sourceMaps.write()))
    .pipe(gulpif(argv.build, dest(path.build.scripts), dest(path.dev.scripts)))
    .pipe(browserSync.stream())
}

// -------- Иницилизация browserSyn, папка сервера - 'dev' или 'build'
const watchFailes = () => {
  browserSync.init({
    server: {
      baseDir: gulpif(!argv.build, 'dev', 'build')
    }
  })
}

// -------- Создаем svg sprite
const svgSpriteBuild = () => {
  return gulp.src(path.source.svg)
    // -------- minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // -------- Удаление аттрибутов из svg файлов для обращения к ним из css
    .pipe(cheerio({
      run: function ($) {
        // $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    // -------- Плагин cheerio plugin вставлет '&gt;' вместо >, заменяем обратно
    .pipe(replace('&gt;', '>'))
    // -------- Создание svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg",
          render: {
            css: false
          },
        }
      }
    }))
    .pipe(gulpif(argv.build, dest(path.build.img), dest(path.dev.img)))
    .pipe(browserSync.stream())
}

// -------- Зжатие изображений 
const imagesCompress = () => {
  return src(path.imgIn.img)
    .pipe(image())
    .pipe(dest(path.imgIn.imgOut))
}
const webpsCompress = () => {
  return src(path.imgIn.webp)
    .pipe(webp())
    .pipe(dest(path.imgIn.imgOut))
}
// -------- Перенос изображений
const images = () => {
  return src(path.source.img)
    .pipe(gulpif(argv.build, dest(path.build.img), dest(path.dev.img)))
}
const icons = () => {
  return src(path.source.imgIco)
    .pipe(gulpif(argv.build, dest(path.build.imgIco), dest(path.dev.imgIco)))
}

// -------- Удаляем папки dev и build прежде чесм собрать обновлённую сборку
const delAll = () => {
  return del([path.clean.dev, path.clean.build])
}

// -------- Следим за изменениями в файлах
watch(path.watch.html, htmlMinify)
watch(path.watch.style, styles)
watch(path.watch.scripts, scripts)
watch(path.watch.svg, svgSpriteBuild)
watch(path.watch.fonts, fontsAll)

// --------  Сборка по умолчанию dev, запуск - gulp 
// --------  Сборка по build, запуск - gulp --build
exports.default = series(delAll, fontsAll, icons, htmlMinify, styles, svgSpriteBuild, images, scripts, scriptsPhp, watchFailes)