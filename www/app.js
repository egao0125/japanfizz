const STORAGE_KEY = "naka.local.v1";
const CURRENT_USER_ID = "local-beta-user";

const allowedUniversities = [
  { id: "waseda", name: "早稲田大学", domains: ["waseda.jp", "akane.waseda.jp", "ruri.waseda.jp"] },
  { id: "keio", name: "慶應義塾大学", domains: ["keio.jp", "keio.ac.jp"] },
  { id: "utokyo", name: "東京大学", domains: ["u-tokyo.ac.jp", "g.ecc.u-tokyo.ac.jp"] },
  { id: "meiji", name: "明治大学", domains: ["meiji.ac.jp"] },
  { id: "aoyama", name: "青山学院大学", domains: ["aoyama.ac.jp"] },
  { id: "rikkyo", name: "立教大学", domains: ["rikkyo.ac.jp"] },
  { id: "hosei", name: "法政大学", domains: ["hosei.ac.jp"] },
  { id: "chuo", name: "中央大学", domains: ["g.chuo-u.ac.jp", "chuo-u.ac.jp"] },
];

const categoryLabels = {
  class: "授業",
  circle: "サークル",
  meme: "ミーム",
  question: "質問",
  after: "放課後",
  event: "イベント",
};

const defaultData = {
  users: [
    { id: "seed-author-1", universityId: "waseda", status: "active" },
    { id: "seed-author-2", universityId: "waseda", status: "active" },
    { id: "seed-author-3", universityId: "waseda", status: "active" },
  ],
  currentUser: null,
  blockedAuthors: [],
  votes: {},
  posts: [
    {
      id: "p1",
      universityId: "waseda",
      authorId: "seed-author-1",
      category: "class",
      status: "visible",
      body: "マーケティング論A、来週の小テストってスライド範囲だけで大丈夫そう？過去履修の人いたら教えてほしい。",
      votes: 42,
      commentCount: 2,
      reportCount: 0,
      createdAt: Date.now() - 8 * 60 * 1000,
      area: "near",
    },
    {
      id: "p2",
      universityId: "waseda",
      authorId: "seed-author-2",
      category: "question",
      status: "visible",
      body: "大隈講堂前、人多すぎるけど今日なんかある？",
      votes: 31,
      commentCount: 1,
      reportCount: 0,
      createdAt: Date.now() - 19 * 60 * 1000,
      area: "near",
    },
    {
      id: "p3",
      universityId: "waseda",
      authorId: "seed-author-3",
      category: "after",
      status: "visible",
      body: "授業終わりに1時間だけ作業するなら、図書館とラウンジどっちが集中できる？",
      votes: 26,
      commentCount: 1,
      reportCount: 0,
      createdAt: Date.now() - 33 * 60 * 1000,
      area: "",
    },
    {
      id: "p4",
      universityId: "waseda",
      authorId: "seed-author-2",
      category: "meme",
      status: "visible",
      body: "履修登録期間の時間割スクショ、毎回パズルゲームみたいになってるの自分だけ？",
      votes: 38,
      commentCount: 3,
      reportCount: 0,
      createdAt: Date.now() - 51 * 60 * 1000,
      area: "near",
    },
    {
      id: "p5",
      universityId: "waseda",
      authorId: "seed-author-1",
      category: "after",
      status: "visible",
      body: "昼休みの食堂、席取りゲーム始まるの早すぎる。",
      votes: 29,
      commentCount: 4,
      reportCount: 0,
      createdAt: Date.now() - 64 * 60 * 1000,
      area: "near",
    },
    {
      id: "p6",
      universityId: "waseda",
      authorId: "seed-author-3",
      category: "class",
      status: "pending",
      body: "本名を出さずに、授業レビューとして教授の進め方だけ共有したいです。",
      votes: 0,
      commentCount: 0,
      reportCount: 0,
      createdAt: Date.now() - 75 * 60 * 1000,
      area: "",
    },
  ],
  comments: [
    { id: "c1", postId: "p1", authorId: "seed-author-2", status: "visible", body: "去年はスライドと小テスト範囲がほぼ同じでした。", createdAt: Date.now() - 6 * 60 * 1000 },
    { id: "c2", postId: "p1", authorId: "seed-author-3", status: "visible", body: "出席も一応見ておくと安心です。", createdAt: Date.now() - 4 * 60 * 1000 },
    { id: "c3", postId: "p2", authorId: "seed-author-1", status: "visible", body: "学生会館の近くが一番動線よかったです。", createdAt: Date.now() - 12 * 60 * 1000 },
    { id: "c4", postId: "p3", authorId: "seed-author-2", status: "visible", body: "ゼミの先輩に見てもらうのが早いかも。", createdAt: Date.now() - 28 * 60 * 1000 },
  ],
  reports: [],
  moderationEvents: [
    {
      id: "m1",
      targetType: "post",
      targetId: "p6",
      action: "needs_review",
      reason: "possible_personal_reference",
      riskScore: 0.63,
      createdAt: Date.now() - 75 * 60 * 1000,
    },
  ],
  betaInvites: [
    { id: "b1", email: "ambassador@waseda.jp", universityId: "waseda", status: "invited", source: "ambassador", createdAt: Date.now() - 2 * 86400000 },
    { id: "b2", email: "review@waseda.jp", universityId: "waseda", status: "invited", source: "app_review", createdAt: Date.now() - 86400000 },
  ],
  classReviews: [
    { id: "r1", universityId: "waseda", name: "マーケティング論 A", professor: "佐藤教授", meta: "出席: たまに / 課題: 少なめ / テスト: 持ち込み可", score: "4.3" },
    { id: "r2", universityId: "waseda", name: "統計学入門", professor: "山本教授", meta: "出席: 毎回 / 課題: 普通 / テスト: 計算多め", score: "2.8" },
    { id: "r3", universityId: "waseda", name: "現代社会とメディア", professor: "中村教授", meta: "出席: なし / レポート: 1回 / 人気急上昇", score: "4.7" },
    { id: "r4", universityId: "waseda", name: "キャリアデザイン基礎", professor: "高橋教授", meta: "出席: 毎回 / 課題: 少なめ / グループ発表あり", score: "3.9" },
  ],
  localCards: [
    { id: "lc1", universityId: "waseda", kind: "meme", title: "今日のミーム", body: "抽選落ちした瞬間の顔、全員同じ説。", tag: "ミーム", status: "visible" },
    { id: "lc2", universityId: "waseda", kind: "question", title: "近くの質問", body: "今キャンパスで一番空いてる自習場所どこ？", tag: "質問", status: "visible" },
    { id: "lc3", universityId: "waseda", kind: "after", title: "放課後", body: "5限後に軽く寄れる場所、学生街っぽいところでおすすめある？", tag: "放課後", status: "visible" },
  ],
};

const state = {
  data: loadData(),
  feed: "hot",
  category: "all",
  local: "all",
  adminFilter: "reports",
  activePostId: "",
  reportTarget: null,
  lastFocus: null,
  confirmAction: null,
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
  profileTitle: $("#profileTitle"),
  profileMeta: $("#profileMeta"),
  postList: $("#postList"),
  feedCount: $("#feedCount"),
  classSearch: $("#classSearch"),
  classList: $("#classList"),
  classCount: $("#classCount"),
  localList: $("#localList"),
  adminList: $("#adminList"),
  adminCount: $("#adminCount"),
  adminBadge: $("#adminBadge"),
  composeModal: $("#composeModal"),
  composeForm: $("#composeForm"),
  postText: $("#postText"),
  postError: $("#postError"),
  charCount: $("#charCount"),
  safetyHint: $("#safetyHint"),
  commentModal: $("#commentModal"),
  commentForm: $("#commentForm"),
  commentPostPreview: $("#commentPostPreview"),
  commentList: $("#commentList"),
  commentText: $("#commentText"),
  commentError: $("#commentError"),
  reportModal: $("#reportModal"),
  reportForm: $("#reportForm"),
  reportPreview: $("#reportPreview"),
  reportDetails: $("#reportDetails"),
  reportError: $("#reportError"),
  betaModal: $("#betaModal"),
  betaForm: $("#betaForm"),
  betaEmail: $("#betaEmail"),
  betaError: $("#betaError"),
  infoModal: $("#infoModal"),
  infoTitle: $("#infoTitle"),
  infoBody: $("#infoBody"),
  confirmDialog: $("#confirmDialog"),
  confirmTitle: $("#confirmTitle"),
  confirmBody: $("#confirmBody"),
  toast: $("#toast"),
};

function loadData() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return structuredClone(defaultData);
    return { ...structuredClone(defaultData), ...JSON.parse(stored) };
  } catch {
    return structuredClone(defaultData);
  }
}

function saveData() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function uid(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => (
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

function currentUniversity() {
  return allowedUniversities.find((university) => university.id === state.data.currentUser?.universityId) || allowedUniversities[0];
}

function currentUser() {
  return state.data.currentUser || {
    id: CURRENT_USER_ID,
    email: "student@waseda.jp",
    universityId: "waseda",
    role: "moderator",
    status: "active",
  };
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

function timeAgo(createdAt) {
  const minutes = Math.max(0, Math.round((Date.now() - createdAt) / 60000));
  if (minutes < 1) return "今";
  if (minutes < 60) return `${minutes}分前`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}時間前`;
  return `${Math.round(hours / 24)}日前`;
}

function moderationIssues(text) {
  const checks = [
    { pattern: /\b\d{2,4}-\d{2,4}-\d{3,4}\b/, action: "block", message: "電話番号は投稿できません。" },
    { pattern: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, action: "block", message: "メールアドレスは投稿できません。" },
    { pattern: /(line\s*id|ライン\s*id|instagram|インスタ|住所|顔写真|晒し)/i, action: "block", message: "個人を特定できる情報は削除してください。" },
    { pattern: /(死ね|消えろ|殺す|犯罪者|詐欺師|ブス|きもい)/i, action: "block", message: "人格攻撃や脅しに見える表現は投稿できません。" },
    { pattern: /(本名|学籍番号|電話番号|家どこ|住所教えて)/i, action: "review", message: "個人を特定する可能性があるため、運営確認に回します。" },
  ];
  return checks.find((check) => check.pattern.test(text)) || null;
}

function updateModerationHint(text) {
  elements.charCount.textContent = `${text.length}/280`;
  const issue = moderationIssues(text);
  elements.safetyHint.classList.toggle("safe", Boolean(text.trim()) && !issue);
  elements.safetyHint.textContent = issue?.message || (text.trim() ? "投稿前チェックを通過できます。" : "個人名、連絡先、住所、顔写真の晒し、誹謗中傷は投稿できません。");
  return issue;
}

function postsForCurrentUniversity({ includePending = false } = {}) {
  const user = currentUser();
  return state.data.posts
    .filter((post) => post.universityId === user.universityId)
    .filter((post) => includePending ? post.status !== "deleted" : post.status === "visible")
    .filter((post) => !state.data.blockedAuthors.includes(post.authorId));
}

function matchesFeed(post) {
  if (state.feed === "new") return true;
  if (state.feed === "question") return post.category === "question" || post.body.includes("？") || post.body.includes("?");
  if (state.feed === "near") return post.area === "near";
  return post.votes + post.commentCount * 2 - post.reportCount * 3 >= 20;
}

function visiblePostById(postId) {
  return state.data.posts.find((post) => post.id === postId && post.status !== "deleted");
}

function renderPosts() {
  const filtered = postsForCurrentUniversity()
    .filter((post) => state.category === "all" || post.category === state.category)
    .filter(matchesFeed)
    .sort((a, b) => state.feed === "new" ? b.createdAt - a.createdAt : (b.votes + b.commentCount * 2) - (a.votes + a.commentCount * 2));

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
    const voteKey = `${currentUser().id}:${post.id}`;
    const voteValue = state.data.votes[voteKey] || 0;
    return `
      <article class="post-card">
        <div class="post-meta">
          <span class="category-dot">${categoryLabels[post.category]}</span>
          <span>${timeAgo(post.createdAt)}</span>
          <span>匿名の学生</span>
        </div>
        <p class="post-body">${escapeHtml(post.body)}</p>
        <div class="post-actions">
          <div class="vote-group" aria-label="投票とコメント">
            <button class="action-button" type="button" data-vote="up" data-post-id="${post.id}" aria-pressed="${voteValue === 1}">↑</button>
            <button class="action-button" type="button" data-vote="down" data-post-id="${post.id}" aria-pressed="${voteValue === -1}">↓</button>
            <button class="action-button" type="button" aria-label="スコア ${post.votes}">${post.votes}</button>
            <button class="action-button" type="button" data-open-comments="${post.id}">コメント ${post.commentCount}</button>
          </div>
          <div class="vote-group">
            <button class="report-button" type="button" data-report-post="${post.id}">通報</button>
            <button class="report-button" type="button" data-block-author="${post.authorId}">ブロック</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderClasses(query = "") {
  const normalized = query.trim().toLowerCase();
  const user = currentUser();
  const filtered = state.data.classReviews
    .filter((item) => item.universityId === user.universityId)
    .filter((item) => `${item.name} ${item.professor} ${item.meta}`.toLowerCase().includes(normalized));

  elements.classCount.textContent = `${filtered.length}件`;
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

function renderLocal() {
  const user = currentUser();
  const filtered = state.data.localCards
    .filter((item) => item.universityId === user.universityId && item.status === "visible")
    .filter((item) => state.local === "all" || item.kind === state.local);

  elements.localList.innerHTML = filtered.length
    ? filtered.map((item) => `
      <article class="list-card">
        <div>
          <div class="card-meta">${escapeHtml(item.tag)}</div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.body)}</p>
        </div>
        <strong class="price">${escapeHtml(categoryLabels[item.kind] || "近く")}</strong>
      </article>
    `).join("")
    : `<div class="empty-state"><p>近くの投稿はまだありません。</p><button class="secondary-button" type="button" data-open-compose="question">最初に投稿</button></div>`;
}

function renderAdmin() {
  const user = currentUser();
  const pendingReports = state.data.reports.filter((report) => report.universityId === user.universityId && report.status === "pending");
  const pendingPosts = state.data.posts.filter((post) => post.universityId === user.universityId && post.status === "pending");
  const betaInvites = state.data.betaInvites.filter((invite) => invite.universityId === user.universityId);
  const total = pendingReports.length + pendingPosts.length;
  elements.adminBadge.textContent = total ? `${total}件` : "確認";

  if (state.adminFilter === "reports") {
    elements.adminCount.textContent = `${pendingReports.length}件`;
    elements.adminList.innerHTML = pendingReports.length
      ? pendingReports.map((report) => {
        const target = visiblePostById(report.targetId);
        return `
          <article class="admin-card pending">
            <span class="status-pill warning">通報待ち</span>
            <p><strong>${escapeHtml(report.reason)}</strong></p>
            <p>${escapeHtml(target?.body || "対象が見つかりません")}</p>
            <p>${escapeHtml(report.details || "補足なし")}</p>
            <div class="admin-actions">
              <button class="secondary-button" type="button" data-admin-action="dismiss-report" data-id="${report.id}">却下</button>
              <button class="danger-button" type="button" data-admin-action="hide-post" data-id="${report.id}">非表示</button>
            </div>
          </article>
        `;
      }).join("")
      : `<div class="empty-state"><p>未対応の通報はありません。</p></div>`;
    return;
  }

  if (state.adminFilter === "pending") {
    elements.adminCount.textContent = `${pendingPosts.length}件`;
    elements.adminList.innerHTML = pendingPosts.length
      ? pendingPosts.map((post) => `
        <article class="admin-card pending">
          <span class="status-pill warning">確認待ち</span>
          <p>${escapeHtml(post.body)}</p>
          <div class="admin-actions">
            <button class="secondary-button" type="button" data-admin-action="approve-post" data-id="${post.id}">公開</button>
            <button class="danger-button" type="button" data-admin-action="block-post" data-id="${post.id}">ブロック</button>
          </div>
        </article>
      `).join("")
      : `<div class="empty-state"><p>確認待ちの投稿はありません。</p></div>`;
    return;
  }

  elements.adminCount.textContent = `${betaInvites.length}件`;
  elements.adminList.innerHTML = betaInvites.length
    ? betaInvites.map((invite) => `
      <article class="admin-card">
        <span class="status-pill">${escapeHtml(invite.status)}</span>
        <p>${escapeHtml(invite.email)}</p>
        <p>source: ${escapeHtml(invite.source)}</p>
      </article>
    `).join("")
    : `<div class="empty-state"><p>ベータ招待はまだありません。</p></div>`;
}

function renderMetrics() {
  const user = currentUser();
  const posts = state.data.posts.filter((post) => post.universityId === user.universityId);
  const reports = state.data.reports.filter((report) => report.universityId === user.universityId);
  const invites = state.data.betaInvites.filter((invite) => invite.universityId === user.universityId);
  $("#metricPosts").textContent = String(posts.length);
  $("#metricReports").textContent = String(reports.length);
  $("#metricInvites").textContent = String(invites.length);
}

function renderAll() {
  const university = currentUniversity();
  elements.campusName.textContent = university.name;
  elements.profileTitle.textContent = `匿名の${university.name}生`;
  elements.profileMeta.textContent = `${currentUser().email} / ${currentUser().role === "moderator" ? "運営テスト権限" : "学生"}`;
  renderPosts();
  renderClasses(elements.classSearch.value);
  renderLocal();
  renderAdmin();
  renderMetrics();
}

function openModal(modal) {
  state.lastFocus = document.activeElement;
  modal.classList.remove("hidden");
}

function closeModal(modal) {
  modal.classList.add("hidden");
  if (state.lastFocus) state.lastFocus.focus();
}

function openCompose(category = "") {
  openModal(elements.composeModal);
  if (category && category !== "all") {
    const radio = document.querySelector(`input[name="composeCategory"][value="${category}"]`);
    if (radio) radio.checked = true;
  }
  elements.postText.focus();
}

function closeCompose() {
  elements.composeForm.reset();
  elements.postText.value = "";
  elements.postError.textContent = "";
  updateModerationHint("");
  closeModal(elements.composeModal);
}

function openComments(postId) {
  state.activePostId = postId;
  const post = visiblePostById(postId);
  if (!post) return;
  elements.commentPostPreview.innerHTML = `<p>${escapeHtml(post.body)}</p>`;
  renderComments();
  openModal(elements.commentModal);
  elements.commentText.focus();
}

function renderComments() {
  const comments = state.data.comments
    .filter((comment) => comment.postId === state.activePostId && comment.status === "visible")
    .filter((comment) => !state.data.blockedAuthors.includes(comment.authorId))
    .sort((a, b) => a.createdAt - b.createdAt);

  elements.commentList.innerHTML = comments.length
    ? comments.map((comment) => `
      <div class="comment-item">
        <div class="post-meta"><span>匿名の学生</span><span>${timeAgo(comment.createdAt)}</span></div>
        <p>${escapeHtml(comment.body)}</p>
      </div>
    `).join("")
    : `<div class="empty-state"><p>まだコメントはありません。</p></div>`;
}

function closeComments() {
  elements.commentForm.reset();
  elements.commentError.textContent = "";
  state.activePostId = "";
  closeModal(elements.commentModal);
}

function openReport(postId) {
  const post = visiblePostById(postId);
  if (!post) return;
  state.reportTarget = { type: "post", id: postId };
  elements.reportPreview.innerHTML = `<p>${escapeHtml(post.body)}</p>`;
  elements.reportError.textContent = "";
  openModal(elements.reportModal);
  elements.reportDetails.focus();
}

function closeReport() {
  elements.reportForm.reset();
  state.reportTarget = null;
  closeModal(elements.reportModal);
}

function openBeta(email = "") {
  openModal(elements.betaModal);
  elements.betaEmail.value = email;
  elements.betaEmail.focus();
}

function closeBeta() {
  elements.betaForm.reset();
  elements.betaError.textContent = "";
  closeModal(elements.betaModal);
}

function openInfo(type) {
  const content = {
    rules: {
      title: "投稿ルール",
      html: `
        <p>匿名でも、特定個人を傷つける投稿や晒しは扱いません。</p>
        <h3>禁止</h3>
        <ul>
          <li>個人名、顔写真、住所、電話番号、LINE ID、SNS IDの晒し</li>
          <li>性的な噂、犯罪の断定、人格攻撃、差別表現</li>
          <li>危険な勧誘、スパム、個人を特定する誘導</li>
        </ul>
        <h3>歓迎</h3>
        <ul>
          <li>授業の質問、履修相談、キャンパスミーム、放課後の相談、サークル情報</li>
        </ul>
      `,
    },
    privacy: {
      title: "プライバシー",
      html: `
        <p>Nakaは大学メールのドメイン確認を前提にした匿名キャンパスアプリです。</p>
        <h3>扱うデータ</h3>
        <ul>
          <li>大学メールアドレス、大学ドメイン、投稿、コメント、投票、通報</li>
          <li>安全運用に必要な最低限のログとモデレーション履歴</li>
        </ul>
        <p>App Store提出時は、この内容に一致する公開プライバシーポリシーURLが必要です。</p>
      `,
    },
    terms: {
      title: "利用規約",
      html: `
        <p>ベータ中のNakaは、大学内の実用情報共有を目的にしています。運営は安全性のため投稿の非表示、確認待ち、利用停止を行えます。</p>
        <ul>
          <li>大学メールを第三者に貸さない</li>
          <li>近くにいる人を特定できる書き方をしない</li>
          <li>通報・ブロック機能を乱用しない</li>
        </ul>
      `,
    },
    support: {
      title: "サポート",
      html: `
        <p>App Reviewとベータ運用のため、公開サポート窓口を用意してください。</p>
        <ul>
          <li>support@naka.app</li>
          <li>通報はアプリ内の通報ボタンから送信</li>
          <li>緊急の個人情報晒しは24時間以内に確認</li>
        </ul>
      `,
    },
    delete: {
      title: "アカウント削除",
      html: `
        <p>本番ではアプリ内から削除申請を受け付け、本人確認後にプロフィールと個人に紐づくデータを削除または匿名化します。</p>
        <p>このベータ版では削除申請のUI確認まで実装しています。</p>
        <button class="danger-button full-width" type="button" data-request-delete>削除申請を送信</button>
      `,
    },
  }[type];

  elements.infoTitle.textContent = content.title;
  elements.infoBody.innerHTML = content.html;
  openModal(elements.infoModal);
  $("#closeInfo").focus();
}

function closeInfo() {
  closeModal(elements.infoModal);
}

function openConfirm({ title, body, actionText = "実行", onAccept }) {
  state.confirmAction = onAccept;
  elements.confirmTitle.textContent = title;
  elements.confirmBody.textContent = body;
  $("#acceptConfirm").textContent = actionText;
  openModal(elements.confirmDialog);
  $("#cancelConfirm").focus();
}

function closeConfirm() {
  state.confirmAction = null;
  closeModal(elements.confirmDialog);
}

function selectView(viewId) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  $$(".nav-item[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  renderAll();
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
    elements.rulesError.textContent = "投稿ルール、プライバシー方針、ベータ利用条件への同意が必要です。";
    elements.rulesAgree.focus();
    return;
  }

  state.data.currentUser = {
    id: CURRENT_USER_ID,
    email,
    universityId: university.id,
    role: "moderator",
    status: "active",
  };
  if (!state.data.users.find((user) => user.id === CURRENT_USER_ID)) {
    state.data.users.push({ id: CURRENT_USER_ID, universityId: university.id, status: "active" });
  }
  saveData();
  renderAll();
  switchScreen("app");
  showToast(`${university.name}のベータ環境に入りました`);
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

  if (issue?.action === "block") {
    elements.postError.textContent = issue.message;
    elements.postText.focus();
    return;
  }

  const category = new FormData(elements.composeForm).get("composeCategory");
  const post = {
    id: uid("post"),
    universityId: currentUser().universityId,
    authorId: currentUser().id,
    category,
    status: issue?.action === "review" ? "pending" : "visible",
    body: text,
    votes: 1,
    commentCount: 0,
    reportCount: 0,
    createdAt: Date.now(),
    area: "near",
  };
  state.data.posts.unshift(post);
  if (["meme", "question", "after"].includes(category)) {
    state.data.localCards.unshift({
      id: uid("local"),
      universityId: currentUser().universityId,
      kind: category,
      title: text.slice(0, 28),
      body: text,
      tag: categoryLabels[category],
      status: post.status,
    });
  }
  if (issue?.action === "review") {
    state.data.moderationEvents.unshift({
      id: uid("mod"),
      targetType: "post",
      targetId: post.id,
      action: "needs_review",
      reason: issue.message,
      riskScore: 0.65,
      createdAt: Date.now(),
    });
  }
  state.feed = "new";
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.feed === "new"));
  saveData();
  closeCompose();
  selectView("homeView");
  showToast(post.status === "pending" ? "投稿を運営確認に回しました" : "匿名投稿を公開しました");
});

elements.commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = elements.commentText.value.trim();
  const issue = moderationIssues(text);
  elements.commentError.textContent = "";

  if (text.length < 2) {
    elements.commentError.textContent = "2文字以上で入力してください。";
    elements.commentText.focus();
    return;
  }

  if (issue?.action === "block") {
    elements.commentError.textContent = issue.message;
    elements.commentText.focus();
    return;
  }

  const comment = {
    id: uid("comment"),
    postId: state.activePostId,
    authorId: currentUser().id,
    status: issue?.action === "review" ? "pending" : "visible",
    body: text,
    createdAt: Date.now(),
  };
  state.data.comments.push(comment);
  const post = visiblePostById(state.activePostId);
  if (post && comment.status === "visible") post.commentCount += 1;
  if (issue?.action === "review") {
    state.data.moderationEvents.unshift({
      id: uid("mod"),
      targetType: "comment",
      targetId: comment.id,
      action: "needs_review",
      reason: issue.message,
      riskScore: 0.65,
      createdAt: Date.now(),
    });
  }
  saveData();
  elements.commentText.value = "";
  renderComments();
  renderAll();
  showToast(comment.status === "pending" ? "コメントを運営確認に回しました" : "コメントしました");
});

elements.reportForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!state.reportTarget) return;
  const reason = new FormData(elements.reportForm).get("reportReason");
  const report = {
    id: uid("report"),
    universityId: currentUser().universityId,
    reporterUserId: currentUser().id,
    targetType: state.reportTarget.type,
    targetId: state.reportTarget.id,
    reason,
    details: elements.reportDetails.value.trim(),
    status: "pending",
    createdAt: Date.now(),
  };
  state.data.reports.unshift(report);
  const post = visiblePostById(state.reportTarget.id);
  if (post) post.reportCount += 1;
  saveData();
  closeReport();
  renderAll();
  showToast("通報を運営キューに送信しました");
});

elements.betaForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = elements.betaEmail.value.trim();
  const university = findUniversity(email);
  elements.betaError.textContent = "";
  if (!email || !university) {
    elements.betaError.textContent = "対応大学のメールアドレスを入力してください。";
    elements.betaEmail.focus();
    return;
  }
  if (!state.data.betaInvites.find((invite) => invite.email.toLowerCase() === email.toLowerCase())) {
    state.data.betaInvites.unshift({
      id: uid("beta"),
      email,
      universityId: university.id,
      status: "waitlist",
      source: "app",
      createdAt: Date.now(),
    });
  }
  saveData();
  closeBeta();
  renderAll();
  showToast("ベータ招待リストに登録しました");
});

document.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    selectView(viewButton.dataset.view);
    return;
  }

  const composeTrigger = event.target.closest("[data-open-compose]");
  if (composeTrigger) {
    openCompose(composeTrigger.dataset.openCompose);
    return;
  }

  const voteButton = event.target.closest("[data-vote]");
  if (voteButton) {
    const post = visiblePostById(voteButton.dataset.postId);
    if (!post) return;
    const key = `${currentUser().id}:${post.id}`;
    const nextValue = voteButton.dataset.vote === "down" ? -1 : 1;
    const previousValue = state.data.votes[key] || 0;
    if (previousValue === nextValue) {
      delete state.data.votes[key];
      post.votes -= nextValue;
    } else {
      state.data.votes[key] = nextValue;
      post.votes += nextValue - previousValue;
    }
    saveData();
    renderAll();
    return;
  }

  const commentsButton = event.target.closest("[data-open-comments]");
  if (commentsButton) {
    openComments(commentsButton.dataset.openComments);
    return;
  }

  const reportButton = event.target.closest("[data-report-post]");
  if (reportButton) {
    openReport(reportButton.dataset.reportPost);
    return;
  }

  const blockButton = event.target.closest("[data-block-author]");
  if (blockButton) {
    const authorId = blockButton.dataset.blockAuthor;
    openConfirm({
      title: "匿名ユーザーをブロック",
      body: "この匿名ユーザーの投稿とコメントをあなたの画面から非表示にします。",
      actionText: "ブロック",
      onAccept: () => {
        if (!state.data.blockedAuthors.includes(authorId)) state.data.blockedAuthors.push(authorId);
        saveData();
        renderAll();
        showToast("匿名ユーザーをブロックしました");
      },
    });
    return;
  }

  const adminAction = event.target.closest("[data-admin-action]");
  if (adminAction) {
    handleAdminAction(adminAction.dataset.adminAction, adminAction.dataset.id);
    return;
  }

  if (event.target.closest("[data-request-delete]")) {
    showToast("削除申請を受け付けました。運営確認待ちです");
    closeInfo();
  }
});

function handleAdminAction(action, id) {
  if (action === "dismiss-report") {
    const report = state.data.reports.find((item) => item.id === id);
    if (report) report.status = "dismissed";
    showToast("通報を却下しました");
  }

  if (action === "hide-post") {
    const report = state.data.reports.find((item) => item.id === id);
    const post = report ? visiblePostById(report.targetId) : null;
    if (post) post.status = "hidden";
    if (report) report.status = "resolved";
    showToast("投稿を非表示にしました");
  }

  if (action === "approve-post") {
    const post = visiblePostById(id);
    if (post) post.status = "visible";
    showToast("投稿を公開しました");
  }

  if (action === "block-post") {
    const post = visiblePostById(id);
    if (post) post.status = "blocked";
    showToast("投稿をブロックしました");
  }

  saveData();
  renderAll();
}

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

$$(".segment[data-local]").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".segment[data-local]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.local = button.dataset.local;
    renderLocal();
  });
});

$$(".segment[data-admin-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".segment[data-admin-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.adminFilter = button.dataset.adminFilter;
    renderAdmin();
  });
});

elements.classSearch.addEventListener("input", () => {
  renderClasses(elements.classSearch.value);
});

elements.postText.addEventListener("input", () => {
  updateModerationHint(elements.postText.value);
  elements.postError.textContent = "";
});

$("#composeButton").addEventListener("click", () => openCompose(state.category));
$("#bottomCompose").addEventListener("click", () => openCompose(state.category));
$("#closeModal").addEventListener("click", closeCompose);
$("#closeComment").addEventListener("click", closeComments);
$("#closeReport").addEventListener("click", closeReport);
$("#joinBetaButton").addEventListener("click", () => openBeta(elements.emailInput.value.trim()));
$("#closeBeta").addEventListener("click", closeBeta);
$("#safetyButton").addEventListener("click", () => openInfo("rules"));
$("#openRules").addEventListener("click", () => openInfo("rules"));
$("#openPrivacy").addEventListener("click", () => openInfo("privacy"));
$("#openTerms").addEventListener("click", () => openInfo("terms"));
$("#openSupport").addEventListener("click", () => openInfo("support"));
$("#openDelete").addEventListener("click", () => openInfo("delete"));
$("#closeInfo").addEventListener("click", closeInfo);
$("#logoutButton").addEventListener("click", () => {
  state.data.currentUser = null;
  saveData();
  switchScreen("login");
  showToast("ログアウトしました");
});
$("#cancelConfirm").addEventListener("click", closeConfirm);
$("#acceptConfirm").addEventListener("click", () => {
  const action = state.confirmAction;
  closeConfirm();
  if (action) action();
});

[elements.composeModal, elements.commentModal, elements.reportModal, elements.betaModal, elements.infoModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target !== modal) return;
    if (modal === elements.composeModal) closeCompose();
    if (modal === elements.commentModal) closeComments();
    if (modal === elements.reportModal) closeReport();
    if (modal === elements.betaModal) closeBeta();
    if (modal === elements.infoModal) closeInfo();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!elements.composeModal.classList.contains("hidden")) closeCompose();
  if (!elements.commentModal.classList.contains("hidden")) closeComments();
  if (!elements.reportModal.classList.contains("hidden")) closeReport();
  if (!elements.betaModal.classList.contains("hidden")) closeBeta();
  if (!elements.infoModal.classList.contains("hidden")) closeInfo();
  if (!elements.confirmDialog.classList.contains("hidden")) closeConfirm();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

if (state.data.currentUser) {
  switchScreen("app");
}

renderAll();
