const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");

puppeteer.use(StealthPlugin());

const searchString = "clearance sofas"; // Search term goes here
const pagesLimit = 10; // limit of SERP pages
let currentPage = 1; // current page of the SERPs

const URL = "https://www.google.com/search?q=" + encodeURIComponent(searchString);

async function getPageResults(page) {
  const pageResults = await page.evaluate(function () {
    return Array.from(document.querySelectorAll("div.g")).map((el) => {
      const linkElement = el.querySelector(".yuRUbf > a");
      const titleElement = el.querySelector(".yuRUbf > a > h3");
      const snippetElement = el.querySelector(".lyLwlc");

      let link = linkElement ? linkElement.getAttribute("href") : null;
      let title = titleElement ? titleElement.textContent.trim() : null;
      let snippet = snippetElement ? snippetElement.textContent.trim() : null;

      return {
        link: link,
        title: title,
        snippet: snippet,
      }
    });
  });
  return pageResults;
}

async function getOrganicResults() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(60000);
  await page.goto(URL);

  // Wait for the "Accept All" button to appear and then click it:
  await page.waitForSelector('button#L2AGLb');
  await page.click('button#L2AGLb');

  const organicResults = [];

  while (currentPage <= pagesLimit) {
    organicResults.push(...(await getPageResults(page)));

    // Scroll down to pagination
    await page.evaluate(async () => {
      const scrollStep = window.innerHeight / 10;
      const scrollInterval = 300;  // scroll step every 300ms, so it takes about 3 seconds to scroll down
      for (let i = 0; i < 10; i++) {
        window.scrollBy(0, scrollStep);
        await new Promise(resolve => setTimeout(resolve, scrollInterval));
      }
    });

    const isNextPage = await page.$("a#pnnext");
    if (isNextPage && currentPage < pagesLimit) {
      await Promise.all([
        page.click("a#pnnext"),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
      ]);
      await page.waitForTimeout(3000);   // 2 second delay added here
      currentPage++;
    } else {
      break;
    }
  }

  await browser.close();

  return organicResults;
}

function objectToCSVRow(dataObject) {
  const dataArray = new Array;
  for (let o in dataObject) {
      let innerValue = dataObject[o]===null?'':dataObject[o].toString();
      let result = innerValue.replace(/"/g, '""');
      result = '"' + result + '"';
      dataArray.push(result);
  }
  return dataArray.join(',') + '\r\n';
}

getOrganicResults().then(results => {
  let csvContent = "link,title,snippet\r\n";
  results.forEach(item => {
      csvContent += objectToCSVRow(item);
  });

  // Get the current date and time
  const now = new Date();
  // Format the date and time
  const timestamp = now.toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/:/g, '-');

  // Create filename with date and timestamp
  const filename = `outputgoogle_${timestamp}.csv`;

  fs.writeFile(filename, csvContent, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
  });
});
