import express from 'express'
import Visualization from '../../models/Visualization'
import _ from 'lodash'

var webshot = require('webshot');

let router = express.Router();

function parseSize(size, defaultSize=10) {
    let userSize = parseInt(size)
    if (_.isNaN(userSize) || userSize < 1 || userSize > 100) {
        return defaultSize
    }

    return userSize
}

function parsePage(page) {
    if (_.isNaN(page)) {
        return 1
    }
    return page ? parseInt(page) : 1
}

function parseOffset(size, page) {
    return size * (page - 1)
}

function parseOrderBy(param) {
    if (typeof param !== 'string' || param === '') {
        return {}
    }

    let keys = param.split(',')

    if (keys.length > 2) {
        keys = keys.slice(2)
    }

    return _.reduce(keys, (result, value) => {
        let order = value.split('-')

        const reversed = order.length > 1
        const actual = reversed ? order[1] : order[0]

        return Object.assign(result, {
            [actual]: reversed ? -1 : 1
        })
    }, {})
}


// TODO: error handling - http://expressjs.com/en/guide/error-handling.html - 2016-03-21
router.get('/', function(req, res) {
    /*
     * Get visualization list
    */

    // pagination
    const pageSize = parseSize(req.query.page_size)
    const page = parsePage(req.query.page)
    const offset = parseOffset(pageSize, page)

    // filters
    const filters = {
        $text : req.query.search ? { $search: req.query.search } : null,
        type: req.query.type
    }

    const orderBy = parseOrderBy(req.query.orderBy)

    let query = {
        ..._.omitBy(filters, x => !x),
        public: true,
        hiddenFromFeed: false,
        archived: false,
    }

    if (req.user && req.user.canPlayRoleOf('admin')) {
        delete query.hiddenFromFeed
    }

    Visualization.count(query)
        .then(count => {
            const lastPage = (Math.floor(count / pageSize)) + 1

            res.set('X-Total-Count', count)
            res.set('X-Last-Page', lastPage)

            if ((page + 1) <= lastPage)
                res.set('X-Next-Page', page + 1)
            if ((page - 1) > 0) {
                res.set('X-Prev-Page', page - 1)
            }
        })
        .then(() => (
            Visualization.findAndPopulate(query, null)
                .sort(orderBy)
                .skip(offset)
                .limit(pageSize)
        ))
        .then(viz => res.send(viz))
        .catch((error) => {
            // this shouldn't happen... if it does shit has gone over the fence
            console.error(error.stack);
            res(error)
        })
})

router.get('/:id', function(req, res) {
    const id = req.params.id

    Visualization.findOneAndPopulate({ public: true, _id: id })
        .then((viz) => {
          if (!viz)
              return Promise.reject(new Error(`Viz with id ${id} not found`))
          else
              return Promise.resolve(viz)
        })
        .then(viz => res.send(viz))
        .catch((error) => {
            res.status(404).send(JSON.stringify({
                message: `Visualization with id ${id} not found or is not public`
            }))
        })

})

router.get('/:id/export/:type', function(req, res) {
    const id = req.params.id
    const type = req.params.type
    const host = req.headers.host

    var mimetype 
    var filename
    var streamtype
    if (type == 'png') {
        mimetype = 'image/png'
        filename = id+'.png'
        streamtype = 'png'
    }
    else if (type == 'jpg') {
        mimetype = 'image/jpeg'
        filename = id+'.jpg'
        streamtype = 'jpg'
    }
    else {
        return false
    }

    var renderStream = webshot(`${host}/app/public/charts/${id}/embed`, {
        shotSize: {
            width: 'window',
            height: 'all'
        },
        timeout: 20000,
        renderDelay: 500,
        streamType: streamtype,
    })

    res.setHeader('Content-disposition', 'attachment; filename='+filename)
    res.setHeader('Content-type', mimetype)

    renderStream.on('data', function(data) {
        res.write(data.toString('binary'), 'binary');
    })
    renderStream.on('error', function(error) {
        console.error(error)
    })
    renderStream.on('end', function() {
        res.end()
    })

})

export default router
