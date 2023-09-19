(document.currentScript || document.getElementsByTagName('script').slice(-1)).getAttribute("data-create").split(", ").forEach((type) => {
    switch (type) {
        case "head":
            document.write(`
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width" height="device-height" initial-scale="1" , maximum-scale="1"/>
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
                <h1 class="title" data-element="head"></h1>
                </header>
            `);
        break;

        case "navbar":
            document.write(`
                <nav class="navbar">
                    <a class="navbar-item" href="" id="navbar-item-home" data-element="home"></a>
                    <a class="navbar-item" href="" id="navbar-item-blog" data-element="blog"></a>
                    <a class="navbar-item" href="" id="navbar-item-info" data-element="info"></a>
                </nav>
            `);
        break;

        case "container":
            document.write(`
                <div class="container">
                    <hr id="hr-1">
                    <div id="markdown"></div>
                    <br>
                </div>
            `);
        break;

        case "footer":
            document.write(`
                <footer class="footer">
                    <fieldset>
                        <legend style="text-align: center;" data-element="lang"></legend>
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
        return `<button class="language-button" onclick="switchLanguage('${key}')">${languages[key]["name"]}</button>`;
    }).join("");
}