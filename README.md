# Google-Scraper
This script scrapes Google search results for a specific query across multiple pages and exports the results - including the link, page title, and search snippet of each result - to a timestamped CSV file.

## Description

This script is a Node.js-based web scraper utilizing Puppeteer and Puppeteer extra stealth plugin. It is designed to scrape Google search results for a specified query, collect key data points from each result (including the link, title, and snippet), and then export that data to a CSV file. The script is capable of paging through multiple search results pages and each CSV output file is uniquely timestamped to distinguish between different runs.

## How it Works

The script initiates a headless browser instance using Puppeteer and navigates to Google's search page with a provided search query. It waits for necessary elements to load, and accepts cookies via the "Accept All" button.

It then iteratively collects results from each page up to a specified limit. For each result, it collects the link, title, and snippet information.

To handle Google's pagination, the script detects the presence of the "Next" button. If it exists and the current page is not the final page (based on the user-set limit), it navigates to the next page and repeats the data collection process.

When the page limit is reached, or there are no more pages available, the browser instance is closed.

The data is then transformed into CSV format. This includes adding appropriate headers and ensuring that the data is properly escaped.

Finally, the script writes this CSV data to a file, appending a timestamp to the filename to ensure it is unique for each run. The timestamp is generated based on the system's current time at the point of file writing.

## Key Components

    Puppeteer: Provides high-level API to control headless Chrome or Chromium browsers.
    Puppeteer-extra-plugin-stealth: Plugin for Puppeteer to prevent detection.
    fs (File System): Node.js built-in module for interacting with the file system on your computer.

This script provides a starting point for anyone looking to collect data from Google's search results. It can be modified or expanded upon to suit a variety of needs related to web scraping and data collection.

## Script by Chris Lever SEO
Script created by Technical SEO Consultant Chris Lever (some usage of AI was used). Website: https://chrisleverseo.com/
