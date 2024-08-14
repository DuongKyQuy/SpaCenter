function loadComponent(component) {
  fetch(`./components/${component}/${component}.html`)
    .then((response) => response.text())
    .then((html) => {
      const container = document.querySelector(`#${component}`);
      const temp = document.createElement('template');
      temp.innerHTML = html;
      container.replaceWith(temp.content);
    })
    .catch((error) => {
      content.innerHTML =
        '<p>Sorry, an error occurred while loading the content.</p>';
    });
}

function loadPage(page) {
  fetch(`./pages/${page}/${page}.html`)
    .then((response) => response.text())
    .then((html) => {
      const container = document.querySelector(`#${page}`);
      const temp = document.createElement('template');
      temp.innerHTML = html;
      container.replaceWith(temp.content);
    })
    .catch((error) => {
      content.innerHTML =
        '<p>Sorry, an error occurred while loading the content.</p>';
    });
}

function loadScript(page) {
  console.log('log page:',page);
  
  fetch(`pages/${page}/${page}.js`)
    .then((response) => {
      if (!response.ok) {
        return 404
      }
      return response.text();
    })
    .then((js) => {
      if (!js || js === 404) {
        return
      }
      const script = document.createElement("script");
      script.text = js;
      document.body?.appendChild(script);
    })
    .catch((error) => {
    });
} 

document.addEventListener('DOMContentLoaded', function () {
  [
    // add component to load in index.html
    'header',
    'footer',
    'banner',
    'gallery',
  ].forEach((component) => {
    loadComponent(component);
  });

  // [
  //   // add page to load in index.html
  //   'home'
  // ].forEach((page) => {
  //   loadPage(page);
  //   try {
  //     loadScript(page);
  //   } catch (e) {

  //   }
  // });
});
