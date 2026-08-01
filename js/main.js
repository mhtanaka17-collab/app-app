// 初期化処理
document.addEventListener("DOMContentLoaded", () => {
  renderTOC();
  route();
  window.addEventListener("hashchange", route);
});
