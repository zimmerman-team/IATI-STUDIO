import visualizations from './api/public/visualizations'
import _ from 'lodash'

import admin from './api/admin'
import auth from './api/auth'

import send from './utils/send'

import { ensureAuthenticated, ensureAccount } from './middleware/authentication'
import { oipaGet, oipaPost } from './config/request'
import querystring from 'querystring'

module.exports = function(app) {

    /*
     * Main routes
     */

    app.get('/', ensureAuthenticated, (req, res) => {
        res.redirect('/app');
    })

    /*
     * Main route
     */

    app.get('/app/?*', function(req, res) {
        // TODO: also need OIPA user here - 2016-11-01
        res.render("app", {
            title: "IATI Studio",
            INITIAL_STATE: {
                user: req.user, // TODO: Secure this - 2016-01-25
            }
        })
    })

    /*
     * Authentication (based on drywall)
     */
    app.use('/auth', auth)

    /*
     * Admin section (based on drywall)
     */
    app.use('/admin', admin)

    /*
     * Public API
     */

    app.use('/api/visualizations', visualizations)

    /*
     * Link with OIPA
     */
    app.get('/api/oipa/*', ensureAuthenticated, function(req, res) {
        const oipaUrl = req.params[0]

        const req_options = {
            url: _.join([oipaUrl, querystring.stringify(req.query)], '?'),
            headers: {
                'Authorization': 'Token ' + req.user.oipaToken
            },
            json: true,
        };
        return oipaGet(req_options)
            .then(body => {
                return res.end(JSON.stringify(body))
            })
            .catch(error => {
                return res.status(500).end(JSON.stringify(error.response.body))
            })
    })
    app.post('/api/oipa/*', ensureAuthenticated, function(req, res) {
        const oipaUrl = req.params[0]

        console.log(req.body);

        const req_options = {
            url: oipaUrl,
            headers: {
                'Authorization': 'Token ' + req.user.oipaToken
            },
            body: req.body,
            json: true,
        };

        console.log(req_options);

        return oipaPost(req_options)
            .then(body => {
                console.log('in repsonse...');
                console.log(body);
                if (!body) {
                    return res.end()
                }
                return res.end(JSON.stringify(body))
            })
            .catch(error => {
                console.log('in error...');
                console.log(error.response.body);
                return res.status(500).end(JSON.stringify(error.response.body))
            })
    })

    //sending emails
    app.post('/send', send);

}
