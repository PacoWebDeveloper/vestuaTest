/**
 * On this module you should write your answer to question #2.
 * This file would be executed with the following command:
 * $ node script.js BrowsingEvents.csv
 */
const args = process.argv.slice(-1);
console.log(`Running question #2 with args ${args}`);

const csv = require('csv-parser');
const fs = require('fs');

//-------> Reading <-------
/* let uniqueVisits = {}; */
class productClass {
  constructor(id, clicks, impressions, ctr) {
    this.id = id;
    this.clicks = clicks;
    this.impressions = impressions;
    this.ctr = ctr;
  }
}
let productsArray = [];
let id = '', event = '';
let visitsDic = {}, clicksDic = {}, impressionsDic = {}, ctrDic = {};
let visits = 0, clicks = 0, impressions = 0, counter = 0;

fs.createReadStream(`./${args}`)
  .pipe(csv())
  .on('data', (row) => {
    id = row.entityId;
    event = row.eventType;
    //unique visits per products log
    if (id in visitsDic)
      ++visitsDic[id];
    else visitsDic[id] = 1;
    //unique clicks per products
    if (event == 'click')
      if (id in clicksDic)
        ++clicksDic[id];
      else clicksDic[id] = 1;
    // Impressions
    else if (id in impressionsDic)
      ++impressionsDic[id];
    else impressionsDic[id] = 1;
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    for (const id in visitsDic)
        if (visitsDic[id] == 1)             
            visits++;    

    for (const id in clicksDic)
        if (clicksDic[id] == 1)
            clicks++;

    for (const id in visitsDic) {
        let ctr = clicksDic[id] / impressionsDic[id];
        if (isNaN(ctr))
            ctr = 0;
        ctrDic[id] = ctr;
    }

    //products list with all its features
    for (const key in visitsDic) {
      let product = new productClass(key, clicksDic[key], impressionsDic[key], ctrDic[key]);
      productsArray.push({
        productId: product.id,
        clicks: product.clicks == undefined ? 0 : product.clicks,
        impressions: product.impressions,
        ctr: product.ctr
      })
    }
    createNewStructure(productsArray);
  });
// -------------> Generacion de archivo output.cvs <-----------------
function createNewStructure(productsArray) {
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: 'output.csv',
    header: [
      { id: 'productId', title: 'Product ID' },
      { id: 'clicks', title: 'Clicks' },
      { id: 'impressions', title: 'Impressions' },
      { id: 'ctr', title: 'CTR' },
    ]
  });
  
  csvWriter
    .writeRecords(productsArray)
    .then(() => console.log('The CSV file was written successfully'));  
}
