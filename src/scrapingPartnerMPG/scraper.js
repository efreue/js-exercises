const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url =
    "https://marketingplatform.google.com/about/partners/find-a-partner?utm_source=marketingplatform.google.com&utm_medium=et&utm_campaign=marketingplatform.google.com%2Fintl%2Fes%2Fabout%2F";
  await page.goto(url);
  //await page.screenshot({ path: "example.png" });

  const titles = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div.compact h3.title"))
        .map(partner => partner.innerText.trim())
    );
  console.log(titles);
  await browser.close();
})();
