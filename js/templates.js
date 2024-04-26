(document.currentScript || document.getElementsByTagName('script').slice(-1)).getAttribute("data-create").split(", ").forEach((type) => {
    switch (type) {
        case "head":
            document.write(`
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width" height="device-height" initial-scale="1" , maximum-scale="1"/>
                <link rel="icon" type="image/x-icon" href="resources/favicon.ico">
                <link rel="stylesheet" type="text/css" href="css/highlightjs_default.min.css">
                <link rel="stylesheet" type="text/css" href="css/highlightjs-copy.min.css"/>
                <link rel="stylesheet" type="text/css" href="css/index.css">
                <script type="text/javascript" src="js/libs/showdown.min.js"></script>
                <script type="text/javascript" src="js/libs/highlight.min.js"></script>
                <script type="text/javascript" src="js/libs/highlight_d.min.js"></script>
                <script type="text/javascript" src="js/libs/highlight_copy_plugin.min.js"></script>
                <script type="text/javascript" src="js/app.js"></script>
                <script>
                    hljs.addPlugin(new CopyButtonPlugin());
                </script>
            `);
        break;

        case "header":
            document.write(`
                <header class="header">
                <h1 class="title"><span data-element="head"></span><span data-element="icon"></span></h1>
                </header>
            `);
        break;

        case "navbar":
            document.write(`
                <nav class="navbar">
                    <hr class="dynamic-hr">
                    <a class="navbar-item" href="" id="navbar-item-home" data-element="home"></a><span class="element-separator"></span>
                    <a class="navbar-item" href="" id="navbar-item-blog" data-element="blog"></a><span class="element-separator"></span>
                    <a class="navbar-item" href="" id="navbar-item-projects" data-element="projects"></a><span class="element-separator"></span>
                    <a class="navbar-item" href="" id="navbar-item-contact" data-element="contact"></a>
                    <hr class="dynamic-hr">
                </nav>
            `);
        break;

        case "container":
            document.write(`
                <div class="container">
                    <div id="markdown"></div>
                </div>
            `);
        break;

        case "footer":
            document.write(`
                <footer class="footer">
                    <fieldset>
                        <legend style="text-align: center; margin: 0 auto;" data-element="lang"></legend>
                        ${getAvailableLanguages()}
                    </fieldset>
                    <p data-element="foot"></p>
                </footer>
            `);
            break;
    }
});

function getAvailableLanguages() {
    return Object.keys(languages).map(key => {
        return `<a class="language-switcher" onclick="switchLanguage('${key}')">${languages[key]["name"]}</a>`;
    }).join(`<span class="element-separator"></span>`);
}