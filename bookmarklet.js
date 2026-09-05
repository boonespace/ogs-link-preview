(function(){
  var STYLE_ID = 'ogs-link-preview-v3-style';
  var CARD_CLASS = 'ogs-link-preview-v3';

  if (window.__ogsLinkPreviewV3) {
    document.querySelectorAll('.' + CARD_CLASS).forEach(function(el){
      el.remove();
    });
    window.__ogsLinkPreviewV3 = false;
    console.log('OGS Preview V3: 已关闭');
    return;
  }

  window.__ogsLinkPreviewV3 = true;

  if (!document.getElementById(STYLE_ID)) {
    var style = document.createElement('style');

    style.id = STYLE_ID;

    style.textContent =
      '.' + CARD_CLASS + '{' +
        'display:flex;' +
        'width:100%;' +
        'max-width:620px;' +
        'min-height:118px;' +
        'margin:9px 0 5px 0;' +
        'box-sizing:border-box;' +
        'border:1px solid #d8d8d8;' +
        'border-radius:10px;' +
        'overflow:hidden;' +
        'background:#fff;' +
        'box-shadow:0 1px 3px rgba(0,0,0,.10);' +
        'cursor:pointer;' +
        'transition:all .15s ease;' +
        'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;' +
      '}' +

      '.' + CARD_CLASS + ':hover{' +
        'box-shadow:0 4px 12px rgba(0,0,0,.16);' +
        'transform:translateY(-1px);' +
      '}' +

      '.' + CARD_CLASS + ' .preview-content{' +
        'flex:1;' +
        'padding:14px 15px;' +
        'min-width:0;' +
      '}' +

      '.' + CARD_CLASS + ' .preview-title{' +
        'font-size:16px;' +
        'font-weight:600;' +
        'line-height:1.45;' +
        'color:#222;' +
        'margin-bottom:7px;' +
      '}' +

      '.' + CARD_CLASS + ' .preview-desc{' +
        'font-size:13px;' +
        'line-height:1.5;' +
        'color:#666;' +
        'display:-webkit-box;' +
        '-webkit-line-clamp:2;' +
        '-webkit-box-orient:vertical;' +
        'overflow:hidden;' +
        'margin-bottom:9px;' +
      '}' +

      '.' + CARD_CLASS + ' .preview-domain{' +
        'font-size:12px;' +
        'color:#999;' +
        'white-space:nowrap;' +
        'overflow:hidden;' +
        'text-overflow:ellipsis;' +
      '}' +

      '.' + CARD_CLASS + ' .preview-image{' +
        'width:145px;' +
        'min-width:145px;' +
        'height:118px;' +
        'object-fit:cover;' +
        'background:#f0f0f0;' +
      '}' +

      '.' + CARD_CLASS + ' .preview-placeholder{' +
        'width:145px;' +
        'min-width:145px;' +
        'height:118px;' +
        'display:flex;' +
        'align-items:center;' +
        'justify-content:center;' +
        'background:#f3f3f3;' +
        'font-size:34px;' +
        'color:#aaa;' +
      '}' +

      '.' + CARD_CLASS + ' .preview-loading-line{' +
        'height:13px;' +
        'width:70%;' +
        'border-radius:5px;' +
        'background:linear-gradient(90deg,#eee,#ddd,#eee);' +
        'background-size:200% 100%;' +
        'animation:ogsPreviewLoading 1.1s linear infinite;' +
        'margin-bottom:11px;' +
      '}' +

      '.' + CARD_CLASS + ' .preview-loading-line.small{' +
        'width:42%;' +
      '}' +

      '@keyframes ogsPreviewLoading{' +
        '0%{background-position:200% 0}' +
        '100%{background-position:-200% 0}' +
      '}';

    document.head.appendChild(style);
  }

  var links = document.querySelectorAll('.chat-line .body a[href]');
  var seen = {};

  links.forEach(function(a){

    var url = a.href;
    var uniqueUrl = url.split('#')[0];

    if (seen[uniqueUrl]) {
      return;
    }

    seen[uniqueUrl] = true;

    if (a.parentElement.querySelector('.' + CARD_CLASS)) {
      return;
    }

    var card = document.createElement('div');
    card.className = CARD_CLASS;

    var content = document.createElement('div');
    content.className = 'preview-content';

    content.innerHTML =
      '<div class="preview-loading-line"></div>' +
      '<div class="preview-loading-line small"></div>';

    var placeholder = document.createElement('div');
    placeholder.className = 'preview-placeholder';
    placeholder.textContent = '🔗';

    card.appendChild(content);
    card.appendChild(placeholder);

    a.parentElement.appendChild(card);

    card.addEventListener('click', function(){
      window.open(url, '_blank');
    });

    fetch(
      'https://api.microlink.io/?url=' +
      encodeURIComponent(uniqueUrl)
    )
    .then(function(response){
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }

      return response.json();
    })
    .then(function(result){

      var data = result.data || {};

      var title = data.title || '';
      var description = data.description || '';
      var imageUrl = null;

      if (
        data.image &&
        typeof data.image === 'object' &&
        data.image.url
      ) {
        imageUrl = data.image.url;
      }

      if (!title) {
        title = '网页链接';
      }

      if (!description) {
        description = uniqueUrl;
      }

      var domain = new URL(uniqueUrl).hostname;

      content.innerHTML =
        '<div class="preview-title">' +
          title.replace(/</g,'&lt;').replace(/>/g,'&gt;') +
        '</div>' +

        '<div class="preview-desc">' +
          description.replace(/</g,'&lt;').replace(/>/g,'&gt;') +
        '</div>' +

        '<div class="preview-domain">' +
          domain.replace(/</g,'&lt;').replace(/>/g,'&gt;') +
        '</div>';

      if (imageUrl) {

        var img = document.createElement('img');

        img.className = 'preview-image';
        img.src = imageUrl;
        img.alt = '';

        img.onerror = function(){
          placeholder.textContent = '🔗';
          placeholder.style.display = 'flex';
          img.remove();
        };

        placeholder.replaceWith(img);

      } else {

        /* 没有 og:image 时使用 favicon */

        var img = document.createElement('img');

        img.className = 'preview-image';

        img.src =
          'https://www.google.com/s2/favicons?domain=' +
          encodeURIComponent(domain) +
          '&sz=128';

        img.alt = '';

        img.onerror = function(){
          placeholder.textContent = '🔗';
          placeholder.style.display = 'flex';
          img.remove();
        };

        placeholder.replaceWith(img);
      }

    })
    .catch(function(error){

      console.warn(
        'OGS Preview 获取失败:',
        uniqueUrl,
        error
      );

      var domain = new URL(uniqueUrl).hostname;

      content.innerHTML =
        '<div class="preview-title">网页链接</div>' +
        '<div class="preview-desc">点击打开网页</div>' +
        '<div class="preview-domain">' +
          domain.replace(/</g,'&lt;').replace(/>/g,'&gt;') +
        '</div>';

    });

  });

  console.log(
    'OGS Preview V3:',
    Object.keys(seen).length,
    '个链接已处理'
  );

})();