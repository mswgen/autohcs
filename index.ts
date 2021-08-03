import puppeteer from 'puppeteer';
import config from './config.json';
if (!config.region || !['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18'].includes(config.region) || !config.grade || !['1', '2', '3', '4', '5'].includes(config.grade) || !config.schoolName || !config.name || !config.birth || config.birth.length != 6 || !config.passwd || config.passwd.length != 4) {
    console.log("please fill the required information. read config.txt for details.");
    process.exit(1);
}
function newline() {
    if (process.platform == 'win32') {
        return '\r\n';
    } else {
        return '\n';
    }
}
function sleep(time: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}
process.stdout.write(`\x1b[0m[1/6] launching browser ...`);
puppeteer.launch({
    headless: true,
    defaultViewport: {
        width: 1600,
        height: 900,
        isLandscape: true
    }
}).then(async browser => {
    process.stdout.write(`\r\x1b[32m[1/6] successfully launched browser!\x1b[0m${newline()}`);
    process.stdout.write(`\x1b[0m[2/6] navigating to https://hcs.eduro.go.kr ...`);
    const page = await browser.newPage();
    await page.goto('https://hcs.eduro.go.kr');
    process.stdout.write(`\r\x1b[32m[2/6] successfully navigated to the site!\x1b[0m      ${newline()}`);
    process.stdout.write(`\x1b[0m[3/6] typing your information ...`);
    await page.click('#btnConfirm2');
    await page.waitForTimeout(1500);
    await page.click('.searchBtn');
    await page.waitForTimeout(1000);
    await page.select('#sidolabel', config.region);
    await page.select('#crseScCode', config.grade);
    await page.type('#orgname', config.schoolName);
    await page.click('.searchBtn');
    await page.waitForTimeout(1500);
    await page.click('.layerSchoolArea > li > a');
    await page.click('.layerFullBtn');
    await page.waitForTimeout(500);
    await page.type('#user_name_input', config.name);
    await page.type('#birthday_input', config.birth);
    await page.click('#btnConfirm');
    await page.waitForTimeout(1500);
    process.stdout.write(`\r\x1b[32m[3/6] successfully typed your information!\x1b[0m${newline()}`);
    process.stdout.write(`\x1b[0m[4/6] typing password ...`);
    await page.click('#password');
    const keys = [
        '#password_mainDiv a[aria-label="0"]',
        '#password_mainDiv a[aria-label="1"]',
        '#password_mainDiv a[aria-label="2"]',
        '#password_mainDiv a[aria-label="3"]',
        '#password_mainDiv a[aria-label="4"]',
        '#password_mainDiv a[aria-label="5"]',
        '#password_mainDiv a[aria-label="6"]',
        '#password_mainDiv a[aria-label="7"]',
        '#password_mainDiv a[aria-label="8"]',
        '#password_mainDiv a[aria-label="9"]'
    ]
    const passwd = config.passwd.split('').map((x:string) => parseInt(x))
    for (let passwdLetter of passwd) {
        await sleep(500)
        await page.click(keys[passwdLetter])
    }
    await sleep(500)
    await page.click('#btnConfirm');
    await page.waitForTimeout(2000);
    process.stdout.write(`\r\x1b[32m[4/6] successfully typed your password!\x1b[0m${newline()}`);
    process.stdout.write(`\x1b[0m[5/6] completing diagnosics ...`);
    await page.click('a[href="#"]');
    await page.waitForTimeout(2000);
    await page.click('#survey_q1a1');
    await page.click('#survey_q2a1');
    await page.click('#survey_q3a1');
    await page.click('#btnConfirm');
    await page.waitForTimeout(1000);
    process.stdout.write(`\r\x1b[32m[5/6] successfully completed diagnosics!\x1b[0m${newline()}`);
    process.stdout.write(`\x1b[0m[6/6] taking screenshot ...`);
    const doneTime = new Date()
    await page.screenshot({
        path: `./diagnosics-${doneTime.getFullYear()}-${doneTime.getMonth()}-${doneTime.getDate()}_${doneTime.getHours()}-${doneTime.getMinutes()}-${doneTime.getSeconds()}.png`,
        fullPage: true
    });
    process.stdout.write(`\r\x1b[32m[6/6] successfully took screenshot!\x1b[0m${newline()}`);
    process.stdout.write(`\x1b[32mScreenshot saved at ./diagnosics-${doneTime.getFullYear()}-${doneTime.getMonth()}-${doneTime.getDate()}_${doneTime.getHours()}-${doneTime.getMinutes()}-${doneTime.getSeconds()}.png\x1b[0m${newline()}`);
    process.exit();
});