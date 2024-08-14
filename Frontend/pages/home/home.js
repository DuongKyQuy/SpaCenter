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

document.addEventListener('DOMContentLoaded', function () {
  [
    // add component to load in index.html
    'banner',
  ].forEach((component) => {
    loadComponent(component);
  });
});
