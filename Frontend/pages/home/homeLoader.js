document.addEventListener('DOMContentLoaded', function () {
  function loadComponent(component) {
    console.log('run component:', component);
    // C:\Hanzdev\Spa-Center\Frontend\components\header\header.html 
    fetch(`../components/${component}/${component}.html`)
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

  [
    // add component to load in layout.html
    'header',
    'footer'
  ].forEach((component) => {
    loadComponent(component);
  });
});
