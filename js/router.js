// 目次描画・ページ遷移ロジック

function flattenPages() {
  const flat = [];
  CONTENT.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      chapter.pages.forEach((page) => {
        flat.push({
          hash: `${unit.id}-${chapter.id}-${page.id}`,
          unit,
          chapter,
          page
        });
      });
    });
  });
  return flat;
}

const FLAT_PAGES = flattenPages();

function findPageByHash(hash) {
  return FLAT_PAGES.find((entry) => entry.hash === hash);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderTOC() {
  const tocEl = document.getElementById("toc-view");
  let html = "";

  CONTENT.units.forEach((unit) => {
    html += `<section class="toc-unit"><h2>${escapeHtml(unit.title)}</h2>`;
    unit.chapters.forEach((chapter) => {
      html += `<div class="toc-chapter"><h3>${escapeHtml(chapter.title)}</h3><ul class="toc-page-list">`;
      chapter.pages.forEach((page) => {
        const hash = `${unit.id}-${chapter.id}-${page.id}`;
        html += `<li><a href="#${hash}">${escapeHtml(page.title)}</a></li>`;
      });
      html += `</ul></div>`;
    });
    html += `</section>`;
  });

  tocEl.innerHTML = html;
}

function renderPage(entry) {
  const pageEl = document.getElementById("page-view");
  const index = FLAT_PAGES.indexOf(entry);
  const prevEntry = FLAT_PAGES[index - 1];
  const nextEntry = FLAT_PAGES[index + 1];

  const prevLink = prevEntry
    ? `<a href="#${prevEntry.hash}">← 前へ：${escapeHtml(prevEntry.page.title)}</a>`
    : `<span class="spacer"></span>`;
  const nextLink = nextEntry
    ? `<a href="#${nextEntry.hash}">次へ：${escapeHtml(nextEntry.page.title)} →</a>`
    : `<span class="spacer"></span>`;

  pageEl.innerHTML = `
    <div class="breadcrumb">${escapeHtml(entry.unit.title)} ／ ${escapeHtml(entry.chapter.title)}</div>
    <h2>${escapeHtml(entry.page.title)}</h2>
    <div class="page-body">${escapeHtml(entry.page.body)}</div>
    <div class="prompt-box">
      <div class="prompt-label">Claudeへのプロンプト例</div>
      <pre>${escapeHtml(entry.page.prompt)}</pre>
    </div>
    <div class="page-nav">
      ${prevLink}
      <a class="toc-back" href="#">目次に戻る</a>
      ${nextLink}
    </div>
  `;
}

function route() {
  const hash = window.location.hash.replace(/^#/, "");
  const tocEl = document.getElementById("toc-view");
  const pageEl = document.getElementById("page-view");

  if (!hash) {
    tocEl.classList.remove("hidden");
    pageEl.classList.add("hidden");
    return;
  }

  const entry = findPageByHash(hash);
  if (!entry) {
    tocEl.classList.remove("hidden");
    pageEl.classList.add("hidden");
    return;
  }

  tocEl.classList.add("hidden");
  pageEl.classList.remove("hidden");
  renderPage(entry);
}
