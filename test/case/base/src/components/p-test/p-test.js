'use strict';
require(['artTemplate', 'wHello', 'yyloader'], function(artTemplate, wHello, yyloader) {
    var cntEl = document.getElementById('tmplCnt');

    cntEl.innerHTML = artTemplate('tmpl', {
        url: '//yyweb.yystatic.com/pc/images/components/w-head/images/icons-head.png',
        url2: __url('../../images/logo.png'),
        url3: '../../images/test/logo.png/123'.replace('/123', '')
    });
    wHello.init();

    yyloader('#tLoaderEl');
});