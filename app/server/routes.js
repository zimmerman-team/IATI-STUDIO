import visualizations from './api/public/visualizations'

import admin from './api/admin'
import auth from './api/auth'

import send from './utils/send'

import { ensureAuthenticated, ensureAccount } from './middleware/authentication'

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

    //sending emails
    app.post('/send', send);

}
