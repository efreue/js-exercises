const puppeteer = require('puppeteer');
let scrape = async() => { //Prep for scrape

    const browser = await puppeteer.launch({args: ['--no-sandbox', 'disabled-setuid-sandbox']}); //Prevent non-needed issues
    const page = await browser.newPage(); //create request for the new page to obtain

    await page.goto('https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0862462,17z/data=!3m1!4b1!4m7!3m6!1s0x808fba02425dad8f:0x6c296c66619367e0!8m2!3d37.4219999!4d-122.0840575!9m1!1b1');
    await page.waitFor(1000);

    const result = await page.evaluate(
        () => {
            let fullName = document.querySelector('.section-review-title').innerText; 
            let postDate = document.querySelector('.section-review-publish-date').innerText;
            let startRating = document.querySelector('.section-review-stars').getAttribute("aria-label");
            let postReview = document.querySelector('.section-review-review-content').innerText;

            return {
                fullName,
                postDate,
                startRating,
                postReview
            };
        }    
    );

    browser.close();
    return result; //return de result with the review
};

scrape().then(
    (value) => {
        console.log(value);
    }
)