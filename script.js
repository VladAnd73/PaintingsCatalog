(function () {
  'use strict';

  let catalogData = null;

  function fetchData() {
    return fetch('paintings.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        catalogData = data;
        return data;
      })
      .catch(function (err) {
        console.error('Failed to load paintings.json:', err);
        return null;
      });
  }

  function renderContact(container) {
    if (!catalogData || !catalogData.contact) return;
    var c = catalogData.contact;
    var html = '<div class="contact-details">';
    if (c.email) html += '<p><a href="mailto:' + c.email + '">' + escapeHtml(c.email) + '</a></p>';
    if (c.phone) html += '<p><a href="tel:' + c.phone.replace(/\s/g, '') + '">' + escapeHtml(c.phone) + '</a></p>';
    if (c.address) html += '<p>' + escapeHtml(c.address) + '</p>';
    if (c.social && c.social.length) {
      html += '<div class="social-links">';
      c.social.forEach(function (s) {
        html += '<a href="' + escapeAttr(s.url) + '" target="_blank" rel="noopener">' + escapeHtml(s.name) + '</a>';
      });
      html += '</div>';
    }
    html += '</div>';
    container.innerHTML = html;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderPaintingCard(painting, showPrice) {
    var priceBlock = showPrice && painting.price
      ? '<p class="card-price">' + escapeHtml(painting.price) + '</p>'
      : '';
    var materialBlock = painting.material
      ? '<p class="card-material">' + escapeHtml(painting.material) + '</p>'
      : '';
    var yearBlock = painting.year
      ? '<p class="card-year">' + escapeHtml(painting.year) + '</p>'
      : '';
    return (
      '<article class="painting-card">' +
        '<div class="card-image-wrap" data-src="' + escapeAttr(painting.image) + '" data-alt="' + escapeAttr(painting.name) + '">' +
          '<img src="' + escapeAttr(painting.image) + '" alt="' + escapeAttr(painting.name) + '" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'block\';" />' +
          '<div class="card-placeholder" style="display:none;">Image</div>' +
        '</div>' +
        '<div class="card-body">' +
          '<h3>' + escapeHtml(painting.name) + '</h3>' +
          '<p class="card-size">' + escapeHtml(painting.size) + '</p>' +
          '<p class="card-technique">' + escapeHtml(painting.technique) + '</p>' +
          materialBlock +
          yearBlock +
          priceBlock +
        '</div>' +
      '</article>'
    );
  }

  function initImageModal() {
    var modal = document.getElementById('image-modal');
    if (!modal) return;

    var overlay = modal.querySelector('.modal-overlay');
    var closeBtn = modal.querySelector('.modal-close');
    var modalImg = modal.querySelector('.modal-image');

    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = '';
    }

    function openModal(src, alt) {
      modalImg.src = src;
      modalImg.alt = alt || '';
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });

    document.addEventListener('click', function (e) {
      var wrap = e.target.closest('.card-image-wrap');
      if (wrap) {
        e.preventDefault();
        openModal(wrap.dataset.src || '', wrap.dataset.alt || '');
      }
    });
  }

  function initPage(mode) {
    initImageModal();

    fetchData().then(function (data) {
      if (!data) return;

      if (mode === 'available') {
        var contactEl = document.getElementById('contact-content');
        if (contactEl) renderContact(contactEl);

        var grid = document.getElementById('catalog-grid');
        if (grid) {
          var available = data.paintings.filter(function (p) { return p.status === 'available'; });
          grid.innerHTML = available.map(function (p) { return renderPaintingCard(p, true); }).join('');
        }

        var contactLinks = document.querySelectorAll('a[href="#contact"]');
        contactLinks.forEach(function (a) {
          a.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        });
      } else if (mode === 'sold') {
        var soldGrid = document.getElementById('sold-grid');
        if (soldGrid) {
          var sold = data.paintings.filter(function (p) { return p.status === 'sold'; });
          soldGrid.innerHTML = sold.map(function (p) { return renderPaintingCard(p, false); }).join('');
        }
      }
    });
  }

  window.initPage = initPage;
})();
