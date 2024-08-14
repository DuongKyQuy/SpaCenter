function loadComponent(component) {
  console.log('run component:', component);
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

function loadScript(component) {
  console.log('js:',component);
  fetch(`components/${component}/${component}.js`)
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
    'banner',
  ].forEach((component) => {
    loadComponent(component);
  });
});
