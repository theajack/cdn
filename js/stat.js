// 友盟站点统计代码
(function () {
    if (location.host !== 'theajack.gitee.io') { // gitee page 不上报 可能会导致被禁用
        var id = '1281058979';
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute(
            'src',
            'https://v1.cnzz.com/z_stat.php?id=' + id + '&web_id=' + id
        );
        window.document.body.appendChild(script);
        window.__view_stat = function () {
            window.open('https://www.cnzz.com/stat/website.php?web_id=' + id);
        };
    }
})();
