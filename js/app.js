const settings = {
    slowLoading: true,
    slowLoadingTimeout: 1000
}

const paths = {
    home: "index.html",
    blog: "blog.html",
    projects: "projects.html",
    contact: "contact.html",
    reader: "reader.html",
    404: "404.html"
};

const languages = {
    "en": {
        "name": "English",
        "head": "Roman's Blog",
        "icon": " •ᴗ• ",
        "home": "Home 🏡",
        "blog": "Blog 📚",
        "projects": "Projects 🛠️",
        "contact": "Contact 🕵️",
        "post": "Post",
        "foot": "🌱",
        "lang": "Available Languages",
        "load": "LOADING",
    },

    "es": {
        "name": "Español",
        "head": "Roman's Blog",
        "icon": " •ᴗ• ",
        "home": "Inicio 🏡",
        "blog": "Blog 📚",
        "projects": "Proyectos 🛠️",
        "contact": "Contacto 🕵️",
        "post": "Post",
        "foot": "🌱",
        "lang": "Idiomas Disponibles",
        "load": "CARGANDO",
    }
}

const language = (() => {
    let lang = getParameter("lang");
    if (languages[lang]) {
        return lang;
    } else {
        if (lang = localStorage.getItem("language")) {
            return languages[lang = localStorage.getItem("language")] ? lang : "en";
        } else {
            localStorage.setItem("language", "en");
            return localStorage.getItem("language");
        }
    }
})();

document.querySelector("html").setAttribute("lang", language);

window.addEventListener("DOMContentLoaded", (_) => {
    for (let element of document.querySelectorAll("[data-element]")) {
        if (languages[language][element.getAttribute("data-element")]) {
            setElementText(element, languages[language][element.getAttribute("data-element")]);
        }
    }
    document.getElementById("navbar-item-home").setAttribute("href", paths.home);
    document.getElementById("navbar-item-blog").setAttribute("href", paths.blog);
    document.getElementById("navbar-item-projects").setAttribute("href", paths.projects);
    document.getElementById("navbar-item-contact").setAttribute("href", paths.contact);
});

function switchLanguage(lang) {
    if (languages[lang]) {
        if (localStorage.getItem("language") !== lang) {
            localStorage.setItem("language", lang);
            window.location.reload();
        }
    }
}

function renderMarkdown(view, backup, whenDone) {
    fetch(view)
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("", { cause: response });
            }
        })
        .then((result) => {
            if (result) {
                const showdown = getShowdown();
                document.getElementById("markdown").innerHTML = showdown.makeHtml(result);
                if (whenDone) {
                    whenDone(showdown);
                }
            }
        })
        .catch((reason) => {
            console.error("Could not render '" + view + "', details: " + reason.message);
            if (backup) {
                redirect(backup)
            }
        });
}

function redirect(document) {
    window.location.href = document;
}

function setElementText(element, text) {
    element.innerText = typeof text === "function" ? text(element) : text;
}

function initSlowLoading() {
    if (settings.slowLoading) {
        document.write(`
            <div class="loading" id="loading"><pre><b>${languages[language].load}</b></pre></div>
        `);
    } else {
        document.getElementById("body").hidden = false;
    }
}

function stopSlowLoading() {
    if (settings.slowLoading) {
        setTimeout(() => {
            document.querySelector("body").removeChild(document.getElementById("loading"));
            document.getElementById("body").hidden = false;
        }, settings.slowLoadingTimeout);
    }
}

function getShowdown() {
    showdown.extension('targetlink', () => {
        return [{
            type: 'lang',
            regex: /\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\4[ \t]*)?\)\{\:target=(["'])(.*)\6}/g,
            replace: (wholematch, linkText, url, a, b, title, c, target) => {
                var result = '<a href="' + url + '"';

                if (typeof title != 'undefined' && title !== '' && title !== null) {
                    title = title.replace(/"/g, '&quot;');
                    title = showdown.helper.escapeCharacters(title, '*_', false);
                    result += ' title="' + title + '"';
                }

                if (typeof target != 'undefined' && target !== '' && target !== null) {
                    result += ' target="' + target + '"';
                }

                result += '>' + linkText + '</a>';
                return result;
            }
        }];
    });

    return new showdown.Converter({
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        excludeTrailingPunctuationFromURLs: true,
        tables: true,
        ghCompatibleHeaderId: true,
        ghMentions: true,
        encodeEmails: true,
        omitExtraWLInCodeBlocks: true,
        ellipsis: true,
        metadata: true,
        extensions: ["targetlink"]
    });
}

function getParameter(name) {
    return ((new URLSearchParams(window.location.search)).get(name) ?? null)
}
