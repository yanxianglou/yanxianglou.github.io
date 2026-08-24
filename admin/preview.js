/*
  炎香樓 CMS 預覽客製化
  - registerPreviewStyle：讓預覽窗格套用跟正式網站一樣的字體、顏色
  - registerPreviewTemplate：針對「菜單方案」「主廚介紹」「最新消息」
    這三個最常編輯的項目，做出貼近首頁實際樣式的預覽卡片

  注意：這只影響「編輯畫面右側的預覽窗格」，不會改動 Decap CMS
  左側清單、頂部選單等後台介面本身的樣式（那部分官方不支援深度客製化，
  硬改容易讓整個後台介面跑掉，故不處理）。
*/

CMS.registerPreviewStyle(`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;500;700&family=Oswald:wght@400;500&display=swap');

  body{
    background:#14120E;
    color:#D9C7A8;
    font-family:'Noto Serif TC', serif;
    padding:32px;
    margin:0;
  }
  .yhl-card{
    background:#1F1B15;
    border:1px solid #3A3427;
    max-width:520px;
  }
  .yhl-card .head{
    background:#3B0503;
    color:#FFFFFF;
    padding:16px 20px;
    font-size:15px;
    font-weight:700;
  }
  .yhl-card .body{padding:20px;}
  .yhl-avail{
    font-family:'Oswald', sans-serif;
    font-size:11px;
    letter-spacing:.08em;
    color:#B9AC92;
    text-transform:uppercase;
    display:block;
    margin-bottom:10px;
  }
  .yhl-price{
    font-family:'Oswald', sans-serif;
    font-size:20px;
    color:#D9C7A8;
    margin-bottom:10px;
  }
  .yhl-desc{font-size:13px;line-height:1.85;color:#B9AC92;}

  .yhl-eyebrow{
    font-family:'Oswald', sans-serif;
    font-size:12px;
    letter-spacing:.28em;
    text-transform:uppercase;
    color:#B9AC92;
    margin-bottom:14px;
    display:block;
  }
  .yhl-h2{font-size:26px;font-weight:700;margin:0 0 20px;color:#D9C7A8;}
  .yhl-h3{font-size:16px;font-weight:500;color:#D9C7A8;margin:0 0 16px;}
  .yhl-p{font-size:14px;line-height:2;color:#B9AC92;max-width:520px;}

  .yhl-news{
    background:#fff;border-top:3px solid #3B0503;
    max-width:360px;padding:20px 22px;
    font-family:'Noto Serif TC', serif;color:#221F1A;
  }
  .yhl-news .date{
    font-family:'Oswald', sans-serif;font-size:11px;
    letter-spacing:.14em;color:#3B0503;display:block;margin-bottom:8px;
  }
  .yhl-news h4{font-size:16px;font-weight:500;margin:0 0 8px;}
  .yhl-news p{font-size:13px;color:#8A8370;line-height:1.8;margin:0;}

  .yhl-hint{
    font-family:'Oswald', sans-serif;font-size:11px;letter-spacing:.05em;
    color:#8A8370;margin-top:24px;padding-top:16px;border-top:1px dashed #3A3427;
  }
`, { raw: true });

// Decap CMS 的無建置環境下，全域會提供 createClass 與 h 這兩個工具
var createClass = window.createClass;
var hh = window.h;

function safeGet(entry, path, fallback) {
  try {
    var v = entry.getIn(['data'].concat(path));
    return (v === undefined || v === null || v === '') ? (fallback || '') : v;
  } catch (e) {
    return fallback || '';
  }
}

// ===== 菜單方案（4人套餐、私人訂製...）預覽 =====
var TierPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    return hh('div', { className: 'yhl-card' },
      hh('div', { className: 'head' }, safeGet(entry, ['name'], '（尚未填寫名稱）')),
      hh('div', { className: 'body' },
        hh('span', { className: 'yhl-avail' },
          safeGet(entry, ['audience'], '') + ' · ' + safeGet(entry, ['availability'], '')
        ),
        hh('div', { className: 'yhl-price' }, safeGet(entry, ['price'], 'TODO')),
        hh('p', { className: 'yhl-desc' }, safeGet(entry, ['description'], '')),
        hh('div', { className: 'yhl-hint' }, '這是「四格卡片」在首頁上大致會呈現的樣子（實際排版與此預覽略有差異）')
      )
    );
  }
});
CMS.registerPreviewTemplate('menu_tiers', TierPreview);

// ===== 主廚介紹 預覽 =====
var ChefPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    return hh('div', {},
      hh('span', { className: 'yhl-eyebrow' }, 'YANXIANGLOU'),
      hh('h2', { className: 'yhl-h2' }, '匠心工藝'),
      hh('h3', { className: 'yhl-h3' }, '由' + safeGet(entry, ['title'], '（頭銜）') + '主理的粵式饗宴'),
      hh('p', { className: 'yhl-p' }, safeGet(entry, ['bio'], '')),
      hh('div', { className: 'yhl-hint' }, '這是首頁「匠心工藝」段落大致會呈現的文字內容')
    );
  }
});
CMS.registerPreviewTemplate('chef', ChefPreview);

// ===== 最新消息 預覽 =====
var NewsPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    return hh('div', { className: 'yhl-news' },
      hh('span', { className: 'date' }, safeGet(entry, ['date'], '')),
      hh('h4', {}, safeGet(entry, ['title'], '（尚未填寫標題）')),
      hh('p', {}, safeGet(entry, ['excerpt'], ''))
    );
  }
});
CMS.registerPreviewTemplate('news', NewsPreview);
