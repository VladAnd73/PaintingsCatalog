(function () {
  'use strict';

  var placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;

  fetch('header.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      placeholder.insertAdjacentHTML('afterend', html);
      placeholder.remove();

      var contactLink = document.getElementById('contact-link');
      if (contactLink) {
        var path = window.location.pathname;
        var isIndex = !path || path === '/' || /\/$/.test(path) || /index\.html$/.test(path);
        contactLink.href = isIndex ? '#contact' : 'index.html#contact';
        if (isIndex) {
          contactLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }
      }

      document.dispatchEvent(new CustomEvent('headerLoaded'));
    })
    .catch(function (err) {
      console.error('Failed to load header:', err);
      placeholder.remove();
      document.dispatchEvent(new CustomEvent('headerLoaded'));
    });
})();
