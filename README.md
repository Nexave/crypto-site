Для установки
<pre>npm install
</pre>

Для запуска gulp локально 
<pre>gulp
</pre>

Для  сборки проекта
<pre>gulp build
</pre>

исходники лежат в папке app
после сборки файлы попадают в папку dist

header / footer лежит в папке app/blocks, 
остальные страницы лежат в app/pages и в них уже подключается header / footer

scss разбит по страницам в папке app/components, в каждой папке идет _index.scss в нем подключаются уже блоки c этой страницы и этот _index.scss подключается в _index.scss который лежит в папке components
css для новых бибилиотек подключается в scss/libs
js для новых библиотек подключается в gulpfile.js в функции scripts



