/**
 * code : amir ghorbanian
 * last edit: 11.30 2172022
 * 
 */
//TODO connect grab.js to backend

const puppeteer = require('puppeteer');
// var Promise = require('promise');
var fs = require('fs');

async function get_product(url){
  const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
  ];
//run browser
  const browser = await puppeteer.launch({
     headless: true,
     userDataDir: './cache/path',
     args: minimal_args
     });
  var page = await browser.newPage();
  //go to url 
  // "https://torob.com/p/16af0f8a-4bef-4318-b377-77290cbbe1e8/%D9%81%D8%B4%D8%A7%D8%B1%D8%B3%D9%86%D8%AC-%D8%A7%D9%85%D8%B1%D9%86-%D9%85%D8%AF%D9%84-m2/
  await page.goto(url);
  //wait to load
  await page.waitForXPath("/html/body/div[1]/div/div/div/div/div/div[2]/div/div[2]/div[1]/div/div/div[2]/div[3]/a/div")
  //select  big load everythig button
  let btn= await page.$x("/html/body/div[1]/div/div/div/div/div/div[2]/div/div[2]/div[2]/div/div/div[3]/div")                       
  //click to load 
  await page.waitForTimeout(2000)
  await btn[0].click()
  await page.waitForTimeout(2000)

  //shop name 
  let ss = await page.$$eval('.shop-name', (options) =>
  options.map((option) => option.textContent)
  );
  //price
  let pp = await page.$$eval('.price', (options) =>
  options.map((option) => option.textContent)
  );
  await browser.close();
  console.log("site loaded");
  // -------end of scrape----------------
  
  // -------start of cleaning----------------

  range=pp[0]
  pp.shift()
  var price=[]
  //--------------turn text to number--------------
  function sep(item){if(item=='ناموجود'){
    price.push(-1);
  }else{
    item=item.split(" ")
    text=item[0].replace(/٫/g,'')
    text=text.replace(/۰/g, '0')
    text = text.replace(/۱/g,"1");
    text = text.replace(/۲/g,"2");
    text = text.replace(/۳/g,"3");
    text = text.replace(/۴/g,"4");
    text = text.replace(/۵/g,"5");
    text = text.replace(/۶/g,"6");
    text = text.replace(/۷/g,"7");
    text = text.replace(/۸/g,"8");
    text = text.replace(/۹/g,"9");
    price.push(parseInt(text));

  }}

  //-------------create data-----------
  Array.prototype.forEach.call(pp,sep)
  // console.log(ss[0],price[0])
  let data={}
  for(let i=0;i<=ss.length;i++){
    a={"store":ss[i],"price":price[i]}
    data[`${i}`]=a
  }
  // console.log(data)
  
  return data;
  
}

// var uu= "https://torob.com/p/16af0f8a-4bef-4318-b377-77290cbbe1e8/%D9%81%D8%B4%D8%A7%D8%B1%D8%B3%D9%86%D8%AC-%D8%A7%D9%85%D8%B1%D9%86-%D9%85%D8%AF%D9%84-m2/"
// get_product(uu).then((data) => {console.log(data);});

module.exports.get_product = get_product;