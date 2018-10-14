/**
 * DwController
 *
 * @description :: Server-side logic for managing dws
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
let request = require('request');
let cheerio = require('cheerio');
let axios = require('axios');

const BASE_URL = 'https://www.dw.com'

module.exports = {
    index: async function (req, res) {
        let url = BASE_URL + '/en/learn-german/deutsch-warum-nicht-series-1/s-2549';
        const r = {};
        let body;
        body = await axios.get(url)
        $ = cheerio.load(body.data);
        links = Array.from($('.linkList a')); //jquery get all hyperlinks
        // $(links).each(function (i, link) {
        //     console.log($(link).text() + ':\n  ' + $(link).attr('href'));
        // });
        // links = $('a');
        const podcastPages = [];
        for (let link of links) {
            console.log((await axios.get(BASE_URL + link.attribs.href)).data)
            // podcastPages.push(await axios.get(BASE_URL + link.attribs.href))
            // podcastPages.pus(await axios.get(link.attr('href')))
        }
        // $(links).each(function (i, link) {
        //     r[i] = link;
        // });
        return res.json([])
    },
    downloadLink: async function (req, res) {
        const pdf = (await axios.get(req.param('link'))).data
        return res.attachment('eng1-01.pdf').send(pdf)
        // return res.send(pdf)
    }
}
