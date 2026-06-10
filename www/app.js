const allowedUniversities = [
  { name: "早稲田大学", domains: ["waseda.jp", "akane.waseda.jp", "ruri.waseda.jp"] },
  { name: "慶應義塾大学", domains: ["keio.jp", "keio.ac.jp"] },
  { name: "東京大学", domains: ["u-tokyo.ac.jp", "g.ecc.u-tokyo.ac.jp"] },
  { name: "明治大学", domains: ["meiji.ac.jp"] },
  { name: "青山学院大学", domains: ["aoyama.ac.jp"] },
  { name: "立教大学", domains: ["rikkyo.ac.jp"] },
  { name: "法政大学", domains: ["hosei.ac.jp"] },
  { name: "中央大学", domains: ["g.chuo-u.ac.jp", "chuo-u.ac.jp"] },
];

const categoryLabels = {
  class: "授業",
  circle: "サークル",
  career: "就活",
  market: "売買",
  event: "イベント",
};

const initialPosts = [
  {
    id: "p1",
    category: "class",
    feed: ["hot", "question"],
    area: "near",
    body: "マーケティング論A、来週の小テストってスライド範囲だけで大丈夫そう？過去履修の人いたら教えてほしい。",
    minutes: 8,
    votes: 42,
    comments: 12,
  },
  {
    id: "p2",
    category: "circle",
    feed: ["hot", "new"],
    area: "near",
    body: "新歓の会場探してます。高田馬場周辺で40人くらい入れて、学生でも使いやすい場所ありますか？",
    minutes: 19,
    votes: 31,
    comments: 8,
  },
  {
    id: "p3",
    category: "career",
    feed: ["hot"],
    area: "",
    body: "夏インターンのES添削、キャリアセンター以外で見てもらえる場所あったら知りたいです。",
    minutes: 33,
    votes: 26,
    comments: 5,
  },
  {
    id: "p4",
    category: "market",
    feed: ["new"],
    area: "near",
    body: "統計学入門の教科書を譲れます。書き込み少なめ、明日キャンパス受け渡し可能です。",
    minutes: 51,
    votes: 18,
    comments: 3,
  },
  {
    id: "p5",
    category: "event",
    feed: ["new", "near"],
    area: "near",
    body: "今日18時から学生起業のミートアップあります。初参加でも入りやすい雰囲気です。",
    minutes: 64,
    votes: 22,
    comments: 4,
  },
];

const classes = [
  {
    name: "マーケティング論 A",
    professor: "佐藤教授",
    meta: "出席: たまに / 課題: 少なめ / テスト: 持ち込み可",
    score: "4.3",
  },
  {
    name: "統計学入門",
    professor: "山本教授",
    meta: "出席: 毎回 / 課題: 普通 / テスト: 計算多め",
    score: "2.8",
  },
  {
    name: "現代社会とメディア",
    professor: "中村教授",
    meta: "出席: なし / レポート: 1回 / 人気急上昇",
    score: "4.7",
  },
];

const marketItems = [
  {
    kind: "sell",
    title: "経済学入門の教科書、半額で売ります",
    body: "状態きれい。明日キャンパス受け渡し可。",
    value: "¥1,200",
  },
  {
    kind: "recruit",
    title: "新歓イベント運営メンバー募集",
    body: "企画、SNS、デザインできる人歓迎。",
    value: "3人",
  },
  {
    kind: "recruit",
    title: "学生エンジニア募集",
    body: "週10h、Webアプリ開発。リモート可。",
    value: "DM",
  },
];

const state = {
  posts: [...initialPosts],
  feed: "hot",
  category: "all",
  market: "all",
  voted: new Map(),
  lastFocus: null,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const elements = {
  loginForm: $("#loginForm"),
  loginScreen: $("#loginScreen"),
  appScreen: $("#appScreen"),
  emailInput: $("#emailInput"),
  emailError: $("#emailError"),
  rulesAgree: $("#rulesAgree"),
  rulesError: $("#rulesError"),
  campusName: $("#campusName"),
  postList: $("#postList"),
  feedCount: $("#feedCount"),
  classSearch: $("#classSearch"),
  classList: $("#classList"),
  marketList: $("#marketList"),
  composeModal: $("#composeModal"),
  composeForm: $("#composeForm"),
  postText: $("#postText"),
  postError: $("#postError"),
  charCount: $("#charCount"),
  safetyHint: $("#safetyHint"),
  infoModal: $("#infoModal"),
  infoTitle: $("#infoTitle"),
  infoBody: $("#infoBody"),
  toast: $("#toast"),
};

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => (
    {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char]
  ));
}

function findUniversity(email) {
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return null;
  return allowedUniversities.find((university) => university.domains.includes(domain));
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 2600);
}

function switchScreen(screenName) {
  elements.loginScreen.classList.toggle("active", screenName === "login");
  elements.appScreen.classList.toggle("active", screenName === "app");
}

function renderPosts() {
  const filtered = state.posts.filter((post) => {
    const matchesFeed = post.feed.includes(state.feed) || post.area === state.feed;
    const matchesCategory = state.category === "all" || post.category === state.category;
    return matchesFeed && matchesCategory;
  });

  elements.feedCount.textContent = `${filtered.length}件`;

  if (!filtered.length) {
    elements.postList.innerHTML = `
      <div class="empty-state">
        <p>この条件の投稿はまだありません。</p>
        <button class="secondary-button" type="button" data-open-compose="${state.category}">最初に投稿</button>
      </div>
    `;
    return;
  }

  elements.postList.innerHTML = filtered.map((post) => {
    const vote = state.voted.get(post.id);
    return `
      <article class="post-card">
        <div class="post-meta">
          <span class="category-dot">${categoryLabels[post.category]}</span>
          <span>${post.minutes}分前</span>
          <span>匿名の学生</span>
        </div>
        <p class="post-body">${escapeHtml(post.body)}</p>
        <div class="post-actions">
          <div class="vote-group" aria-label="投票">
            <button class="action-button" type="button" data-vote="up" data-post-id="${post.id}" aria-pressed="${vote === "up"}">↑ ${post.votes + (vote === "up" ? 1 : 0)}</button>
            <button class="action-button" type="button" data-vote="comment" data-post-id="${post.id}">コメント ${post.comments}</button>
          </div>
          <button class="report-button" type="button" data-report="${post.id}">通報</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderClasses(query = "") {
  const normalized = query.trim().toLowerCase();
  const filtered = classes.filter((item) => {
    const text = `${item.name} ${item.professor} ${item.meta}`.toLowerCase();
    return text.includes(normalized);
  });

  elements.classList.innerHTML = filtered.length
    ? filtered.map((item) => `
      <article class="list-card">
        <div>
          <div class="card-meta">${escapeHtml(item.professor)}</div>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.meta)}</p>
        </div>
        <strong class="score">楽単 ${item.score}</strong>
      </article>
    `).join("")
    : `<div class="empty-state"><p>一致する授業がありません。</p></div>`;
}

function renderMarket() {
  const filtered = marketItems.filter((item) => state.market === "all" || item.kind === state.market);
  elements.marketList.innerHTML = filtered.map((item) => `
    <article class="list-card">
      <div>
        <div class="card-meta">${item.kind === "sell" ? "売買" : "募集"}</div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.body)}</p>
      </div>
      <strong class="price">${escapeHtml(item.value)}</strong>
    </article>
  `).join("");
}

function openCompose(category = "") {
  state.lastFocus = document.activeElement;
  if (category && category !== "all") {
    const radio = document.querySelector(`input[name="composeCategory"][value="${category}"]`);
    if (radio) radio.checked = true;
  }
  elements.composeModal.classList.remove("hidden");
  elements.postText.focus();
}

function closeCompose() {
  elements.composeModal.classList.add("hidden");
  elements.composeForm.reset();
  elements.postText.value = "";
  updateModerationHint("");
  elements.postError.textContent = "";
  if (state.lastFocus) state.lastFocus.focus();
}

function openInfo(type = "rules") {
  state.lastFocus = document.activeElement;
  const isPrivacy = type === "privacy";
  elements.infoTitle.textContent = isPrivacy ? "プライバシー" : "投稿ルール";
  elements.infoBody.innerHTML = isPrivacy
    ? `
      <p>Nakaは大学メールのドメイン確認を前提にした匿名コミュニティです。氏名、学籍番号、連絡先を投稿本文に表示する設計にはしていません。</p>
      <h3>扱うデータ</h3>
      <ul>
        <li>大学メールアドレスと大学ドメイン</li>
        <li>投稿、コメント、投票、通報</li>
        <li>安全運用に必要な最低限のログ</li>
      </ul>
    `
    : `
      <p>匿名でも、特定個人を傷つける投稿や晒しは扱いません。</p>
      <h3>禁止</h3>
      <ul>
        <li>個人名、顔写真、住所、電話番号、LINE ID、SNS IDの晒し</li>
        <li>性的な噂、犯罪の断定、人格攻撃、差別表現</li>
        <li>本人確認できない売買、危険な勧誘、スパム</li>
      </ul>
      <h3>歓迎</h3>
      <ul>
        <li>授業の質問、履修相談、就活相談、サークル募集、売買、キャンパス情報</li>
      </ul>
    `;
  elements.infoModal.classList.remove("hidden");
  $("#closeInfo").focus();
}

function closeInfo() {
  elements.infoModal.classList.add("hidden");
  if (state.lastFocus) state.lastFocus.focus();
}

function moderationIssues(text) {
  const checks = [
    { pattern: /\b\d{2,4}-\d{2,4}-\d{3,4}\b/, message: "電話番号は投稿できません。" },
    { pattern: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, message: "メールアドレスは投稿できません。" },
    { pattern: /(line\s*id|ライン\s*id|instagram|インスタ|住所|顔写真|晒し)/i, message: "個人を特定できる情報は削除してください。" },
    { pattern: /(死ね|消えろ|殺す|犯罪者|詐欺師|ブス|きもい)/i, message: "人格攻撃や脅しに見える表現は投稿できません。" },
  ];
  return checks.find((check) => check.pattern.test(text))?.message || "";
}

function updateModerationHint(text) {
  elements.charCount.textContent = `${text.length}/280`;
  const issue = moderationIssues(text);
  elements.safetyHint.classList.toggle("safe", Boolean(text.trim()) && !issue);
  elements.safetyHint.textContent = issue || (text.trim() ? "投稿前チェックを通過できます。" : "個人名、連絡先、住所、顔写真の晒し、誹謗中傷は投稿できません。");
  return issue;
}

function selectView(viewId) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  $$(".nav-item[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
}

elements.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = elements.emailInput.value.trim();
  const university = findUniversity(email);
  elements.emailError.textContent = "";
  elements.rulesError.textContent = "";

  if (!email || !university) {
    elements.emailError.textContent = "対応大学のメールアドレスを入力してください。";
    elements.emailInput.focus();
    return;
  }

  if (!elements.rulesAgree.checked) {
    elements.rulesError.textContent = "投稿ルールとプライバシー方針への同意が必要です。";
    elements.rulesAgree.focus();
    return;
  }

  elements.campusName.textContent = university.name;
  switchScreen("app");
  showToast(`${university.name}のフィードに入りました`);
});

$$(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".tab").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.feed = button.dataset.feed;
    renderPosts();
  });
});

$$(".chip").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".chip").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.category = button.dataset.category;
    renderPosts();
  });
});

$$(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".segment").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.market = button.dataset.market;
    renderMarket();
  });
});

$$(".nav-item[data-view]").forEach((button) => {
  button.addEventListener("click", () => selectView(button.dataset.view));
});

$("#composeButton").addEventListener("click", () => openCompose(state.category));
$("#bottomCompose").addEventListener("click", () => openCompose(state.category));
$("#closeModal").addEventListener("click", closeCompose);
$("#safetyButton").addEventListener("click", () => openInfo("rules"));
$("#openRules").addEventListener("click", () => openInfo("rules"));
$("#openPrivacy").addEventListener("click", () => openInfo("privacy"));
$("#closeInfo").addEventListener("click", closeInfo);
$("#logoutButton").addEventListener("click", () => {
  switchScreen("login");
  showToast("ログアウトしました");
});

document.addEventListener("click", (event) => {
  const composeTrigger = event.target.closest("[data-open-compose]");
  if (composeTrigger) {
    openCompose(composeTrigger.dataset.openCompose);
    return;
  }

  const voteButton = event.target.closest("[data-vote='up']");
  if (voteButton) {
    const postId = voteButton.dataset.postId;
    state.voted.set(postId, state.voted.get(postId) === "up" ? "" : "up");
    renderPosts();
    return;
  }

  const commentButton = event.target.closest("[data-vote='comment']");
  if (commentButton) {
    showToast("コメント機能はバックエンド接続後に有効化します");
    return;
  }

  const reportButton = event.target.closest("[data-report]");
  if (reportButton) {
    showToast("通報を受け付けました。運営レビューに送ります");
  }
});

elements.classSearch.addEventListener("input", () => {
  renderClasses(elements.classSearch.value);
});

elements.postText.addEventListener("input", () => {
  updateModerationHint(elements.postText.value);
  elements.postError.textContent = "";
});

elements.composeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = elements.postText.value.trim();
  const issue = updateModerationHint(text);
  elements.postError.textContent = "";

  if (text.length < 8) {
    elements.postError.textContent = "8文字以上で入力してください。";
    elements.postText.focus();
    return;
  }

  if (issue) {
    elements.postError.textContent = issue;
    elements.postText.focus();
    return;
  }

  const category = new FormData(elements.composeForm).get("composeCategory");
  state.posts.unshift({
    id: `p${Date.now()}`,
    category,
    feed: ["new", "hot"],
    area: "near",
    body: text,
    minutes: 0,
    votes: 1,
    comments: 0,
  });
  state.feed = "new";
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.feed === "new"));
  renderPosts();
  closeCompose();
  selectView("homeView");
  showToast("匿名投稿を公開しました");
});

[elements.composeModal, elements.infoModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      if (modal === elements.composeModal) closeCompose();
      if (modal === elements.infoModal) closeInfo();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!elements.composeModal.classList.contains("hidden")) closeCompose();
  if (!elements.infoModal.classList.contains("hidden")) closeInfo();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

renderPosts();
renderClasses();
renderMarket();
