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

This script provides a starting point for anyone looking to collect data from Google's search results using Node JS over Python. It can be modified or expanded upon to suit a variety of needs related to web scraping and data collection.

## Installation
Install Node.js - https://nodejs.org/en

**Libraries required**
npm install puppeteer csv-writer


## How to Use Guide for Windows PowerShell:​

    Open PowerShell: Use the search bar to find PowerShell. Right-click on the PowerShell icon and select 'Run as administrator'.
    Install the Dependencies: Run the command npm install puppeteer csv-writer. This will install the Puppeteer and csv-writer packages that are dependencies for the script.
    Navigate to the Folder: Use the cd command to navigate to the directory containing your script
    Example: cd C:\Users\YourUserName\Google-Scraper
    Run the Script: Now, you can execute the script using Node.js by typing node index.js and then pressing Enter.

## How to Use Guide for macOS:​

    Open Terminal: You can open Terminal by pressing Cmd + Space, typing 'Terminal', and then hit Enter.
    Navigate to the Folder: Use the cd command to navigate to the directory containing your script.
    Example: cd /Users/YourUserName/Google-Scraper
    Install the Dependencies: Run the command npm install puppeteer csv-writer to install the Puppeteer and csv-writer packages.
    Run the Script: Finally, to execute the script, type node index.js and then hit Enter.

## Output
This will generate a CSV file named `outputgoogle-YYYY-MM-DD-HH-MM.csv` (where `YYYY-MM-DD` is the current date and `HH-MM` is the current time) in the project directory. The CSV file contains the titles, URLs, and search snippet.

## License

This project is licensed under the terms of the MIT license.




## Script by Chris Lever SEO
Script created by Technical SEO Consultant Chris Lever (some usage of AI was used). Website: https://chrisleverseo.com/
