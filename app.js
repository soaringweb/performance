const express = require('express');
const request = require('request');
const app = express();

const port = process.env.PORT || 3000;

app.get('/macys/api/discover/v1/search', (req, res) => {
    const url = 'https://api.macys.com/discover/v1/search?keyword=' + req.query.keyword + '&size=small&requestFacets=true&requestProducts=true&pathname=/shop/search&_application=MEW&_deviceType=PHONE&_navigationType=SEARCH&assortment=SITE&_regionCode=US&_customerState=GUEST';

    request({
        url: url,
        headers: {
            'Accept': 'application/json',
            'x-macys-webservice-client-id': 'psp_1.0_5825a8b937'
        }
    },
    function (error, response, body) {
        if(!error && response.statusCode === 200) {
            console.log(response.request.headers);
            res.json(JSON.parse(body));
        } else {
            console.log(error);
            res.json(error);
        }
    });
});

app.use(express.static('public'));

app.listen(port, () => console.log('App listening on port!' + port));