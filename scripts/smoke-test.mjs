import puppeteer from "puppeteer-core";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = process.env.NAKA_TEST_URL || "http://localhost:4173/?smoke=1";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => {
    consoleErrors.push(error.message);
  });

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    localStorage.removeItem("naka.local.v1");
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
    }
  });
  await page.reload({ waitUntil: "domcontentloaded" });

  await page.type("#emailInput", "student@waseda.jp");
  await page.click("#rulesAgree");
  await page.click("#loginForm button[type='submit']");
  await page.waitForSelector("#homeView.active");
  assert(await page.$eval("body", (body) => body.innerText.includes("フィード")), "feed did not render after login");
  assert(await page.$eval("body", (body) => body.innerText.includes("ローカル")), "local nav did not render");
  assert(!(await page.$eval("body", (body) => body.innerText.includes("売買"))), "buying/selling copy should not render");
  assert(!(await page.$eval("body", (body) => body.innerText.includes("東京で"))), "Tokyo category copy should not render");

  await page.click("#bottomCompose");
  await page.type("#postText", "LINE IDを書いてください");
  assert(await page.$eval("#safetyHint", (node) => node.innerText.includes("個人を特定")), "moderation warning did not appear");
  await page.$eval("#postText", (node) => {
    node.value = "";
    node.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await page.type("#postText", "3限のマーケティング論、今日の出席確認があったか知りたいです。");
  await page.click("#composeForm button[type='submit']");
  await page.waitForFunction(() => document.body.innerText.includes("3限のマーケティング論"));
  assert(await page.$eval("body", (body) => body.innerText.includes("3限のマーケティング論")), "created post missing");

  await page.click("[data-open-comments='p1']");
  await page.type("#commentText", "ありがとうございます。履修の参考になります。");
  await page.click("#commentForm button[type='submit']");
  await page.waitForFunction(() => document.body.innerText.includes("ありがとうございます。履修の参考になります。"));
  await page.click("#closeComment");

  await page.click("[data-report-post='p1']");
  await page.type("#reportDetails", "テスト用の通報です。");
  await page.click("#reportForm button[type='submit']");
  await page.waitForFunction(() => document.body.innerText.includes("通報を運営キューに送信しました"));

  await page.click("button.nav-item[data-view='localView']");
  await page.waitForSelector("#localView.active");
  assert(await page.$eval("body", (body) => body.innerText.includes("今日のミーム")), "local feed cards missing");

  await page.click("button.nav-item[data-view='profileView']");
  await page.waitForSelector("#profileView.active");
  assert(await page.$eval("body", (body) => body.innerText.includes("アカウント削除")), "profile legal actions missing");

  await page.click("button.settings-row[data-view='adminView']");
  await page.waitForSelector("#adminView.active");
  assert(await page.$eval("body", (body) => body.innerText.includes("通報待ち")), "admin report queue missing");

  assert(consoleErrors.length === 0, `browser console errors: ${consoleErrors.join(" | ")}`);
  console.log("smoke test passed");
} finally {
  await browser.close();
}
