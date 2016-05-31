import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { browserHistory } from 'react-router'

import { Tooltip } from '../general/Tooltip.react.jsx'
import { ModalButton } from '../general/Modal.react.jsx'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { withRouter } from 'react-router'

const default_viz = {
    name: "",
    description: "",
}   

//import html2canvas from 'html2canvas'
//import rasterizeHTML from 'rasterizehtml'

export const ChartTopControls = withRouter(
    React.createClass({

        propTypes: {
            visualization: PropTypes.object.isRequired,
            createVisualization: PropTypes.func.isRequired,
            updateVisualization: PropTypes.func.isRequired,
            forkVisualization: PropTypes.func.isRequired,
            saveChart: PropTypes.func.isRequired,
            clientError: PropTypes.func.isRequired,
        },

        archiveChart: function(){
            let { visualization } = this.props

            this.props.updateVisualization(visualization, { 
                archived: true,
                archivedData: Date.now(),
                public: false
            }, 'archive')
            .then(action => action.response.result)
            .then( () => this.props.router.push('/collection') )
        },

        publishChartToggle: function(){
            let { visualization } = this.props

            let publishAction = visualization.public ? 'unpublish': 'publish'

            if (!visualization.public) {
                if (!visualization.name) {
                    return this.props.clientError("Add a title to your visualization before publishing")
                }

                if (!visualization.items.length) {
                    return this.props.clientError("Add items to your visualization before publishing")
                }
            }

            this.props.updateVisualization(
                visualization,
                { public: !visualization.public },
                publishAction,
            )
        },

        openPublicPage: function(id) {
            // TODO: change url - 2016-03-22
            // use Link by react-router (a href)

            window.open(`/app/public/charts/${id}`, "_blank").focus()
        },

        openPreviewPage: function(id) {
            // TODO: change url - 2016-03-22
            // use Link by react-router (a href)
            this.props.router.push(`/chartbuilder/${id}/preview`)
        },

        forkVisualization: function(id) {
            this.props.forkVisualization(id)
                .then(action => action.response.result)
                .then(viz_id => this.props.router.push(`/chartbuilder/${viz_id}`))
        },

        render: function() {
            let { visualization } = this.props
            return (                
                <div className="row">
                    <div className="columns small-12">
                        <div className="action-wrap">
                            <div className="button-group">
                                <TopNavItem title="Save" className="save"  materialIcon="save" onClick={this.props.saveChart}/>
                                <TopNavItem title="Preview" materialIcon="visibility" onClick={this.openPreviewPage.bind(this, visualization._id)} />
                                <TopNavItem disabled={!visualization.public} title="Public page" materialIcon="public" onClick={this.openPublicPage.bind(this, visualization._id)} />
                                <TopNavItem title={visualization.public ? "Published" : "Publish"} materialIcon={visualization.public ? "check" : "publish"} onClick={this.publishChartToggle} published={visualization.public} className="publish"/>
                                <TopNavItem title="Duplicate" materialIcon="content_copy" onClick={this.forkVisualization.bind(this, visualization._id)}/>
                            </div>
                            <TopNavItem title="Move to trash" onClick={this.archiveChart} className="delete" materialIcon="delete"/>
                        </div>
                    </div>
                </div>
            )
        }
    })
)

const TopNavItem = props => {
    let { onClick, disabled, published, title, materialIcon, className } = props
    let itemClass = classNames('item',className,{
        'disabled' : disabled,
        'published' : published
    })

    return (
        <div className={itemClass}>
            <a onClick={onClick}>
                <i className="material-icons">{materialIcon}</i>
                {title}
            </a>
        </div>
    )
}

import { isLoggedIn } from '../../utils/login.js'

export const PublicChartActions = connect(
    (state, props) => ({
        isLoggedIn: isLoggedIn(state)
    })
)(withRouter(React.createClass({

    PropTypes: {
        forkVisualization: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.func.isRequired,
        vizId: PropTypes.string.isRequired
    },

    // mixins: [
    //     require('react-onclickoutside')
    // ],

    getInitialState: function() {
        return {
            dropdown: '',
            download: '',
        };
    },
    handleClickOutside: function(e) {
        this.setState({dropdown: ''})
    },

    toggleNavItem: function(item, e){
        if (this.state.dropdown === item) {
            return this.handleClickOutside()
        }

        this.setState({dropdown: item})
    },
    // downloadChart: function(type) {
    //     this.setState({create: type})
    //     let canvas = document.getElementById("canvas")

    //     let content = document.getElementById("chart-canvas")
    //     let headContent = document.getElementsByTagName('head')[0].innerHTML

    //     canvas.setAttribute('width',content.clientWidth)
    //     canvas.setAttribute('height',content.clientHeight)

    //     content = content.outerHTML + headContent

    //     //clear de canvas
    //     var ctx = canvas.getContext('2d');
    //     ctx.clearRect(0, 0, canvas.width, canvas.height)

    //     //draw de canvas
    //     rasterizeHTML.drawHTML(content, canvas, {} ).then( function success(renderResult) {
    //         let a
    //         if ( document.getElementById("downloadLink") == null ) {
    //             a = document.createElement('a')
    //             a.setAttribute('id','downloadLink')
    //             document.body.appendChild(a)
    //         }
    //         else {
    //             a = document.getElementById("downloadLink")
    //         }

    //         if (type == 'png') {
    //             a.download = "chart.png"
    //             a.href = canvas.toDataURL("image/png") 
    //         }
    //         else if (type == 'jpg') {
    //             a.download = "chart.jpg"
    //             a.href = canvas.toDataURL("image/jpg", 1.0) 
    //         }
    //         else if (type == 'svg') {
    //             //a.download = "chart.svg"
    //             //a.href = base64dataURLencode( (new XMLSerializer()).serializeToString(renderResult.svg) )
    //             //console.log( canvas.toDataURL() )
    //         }
    //         a.click()

    //     }, function error(e) {
    //         console.log(e)
    //     })
    //     .then ( () => {
    //         this.setState({dropdown: ''})
    //         this.setState({create: ''})
    //     })
    //     });

    // },

    render: function() {
        return (
            <div className="actions">
                {
                    this.props.isLoggedIn && !this.props.isPreview ? 
                    <ForkChart onClick={this.props.forkVisualization}/>
                    :
                    <div className="action button"> 
                        <a href="/auth/signup">Duplicate</a>
                    </div>
                }
                {
                    this.props.isPreview ?
                    null 
                    : <EmbedChart name="Embed" embedHeight={this.props.embedHeight} embedUrl={this.props.embedUrl} />
                    
                }

                <PublicChartItem name="Download" onClick={this.toggleNavItem.bind(this, 'download')} itemClass={this.state.dropdown == 'download' ? 'active' : null}>
                    <PublicChartSubItem name="PNG" url={`/api/visualizations/${this.props.vizId}/export/png`}/>
                    <PublicChartSubItem name="JPG" url={`/api/visualizations/${this.props.vizId}/export/jpg`}/>
                </PublicChartItem>

                {
                    this.props.isPreview ? 
                    null
                    : <PublicChartItem name="Share" onClick={this.toggleNavItem.bind(this, 'share')} itemClass={this.state.dropdown == 'share' ? 'active' : null}>
                    <PublicChartSubItem name="Facebook" url={"https://www.facebook.com/sharer/sharer.php?u="+this.props.shareUrl} newWindow={true} />
                    <PublicChartSubItem name="Twitter" url={"https://twitter.com/home?status=Check%20out%20"+this.props.shareUrl} newWindow={true} />
                    <PublicChartSubItem name="LinkedIn" url={"https://www.linkedin.com/shareArticle?mini=true&url="+this.props.shareUrl+"&title=IATI%20Studio%20chart&summary=&source="} newWindow={true} />

                    <ModalButton name="Hyperlink" closeButton="Close">
                        <div>
                            <h4>Link to chart</h4>
                            <p>Copy the link below to share your chart.</p>
                            <input className="embed-code" value={this.props.embedUrl} />
                        </div>
                    </ModalButton>

                    </PublicChartItem>
                    
                }
                <canvas id="canvas" width="0" height="0" style={{display: 'none'}}></canvas>
                
                {
                    this.props.isPreview ? 
                    <EditChart onClick={this.props.editVisualization}/>
                    : null
                }
            </div>
        )
    }
})))

const PublicChartItem = React.createClass({
    render: function() {
        let { onClick, materialIcon, tooltip, itemClass, children, name } = this.props
        let currentClass = classNames('action', itemClass, {'children' : children})
        return (
            <div className={currentClass}>
                <a className="button blue" onClick={onClick}>{name}</a>
                <ReactCSSTransitionGroup transitionName="drop" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                {children && itemClass == 'active' ? 
                    <div className="sub-actions">{children}</div>
                : null }
                </ReactCSSTransitionGroup>
            </div>
        )
    }
})

const PublicChartSubItem = props => {
    let { onClick, name, className } = props
    return (
        <a className={className} onClick={onClick} href={props.url} download={props.downloadName} target={props.newWindow ? "_blank" : null}>
            {name}
        </a>
    )
}

const EditChart = props => {
    let { onClick } = props

    return (
        <div className="action" style={{zIndex:3}} >
            <a className="button blue" onClick={onClick}>Edit</a>
        </div>
    )
}

const ForkChart = props => {
    let { onClick } = props

    return (
        <div className="action" style={{zIndex:3}} >
            <a className="button blue" onClick={onClick}>Duplicate</a>
        </div>
    )
}
const EmbedChart = props => {
    let { onClick, tooltip, embedUrl } = props

    let height = document.getElementById('chart-embed') ? document.getElementById('chart-embed').scrollHeight : 0
    //add some height for paragraph 'powered by...'
    let newHeight = Math.ceil(height) + 100
    let embedHTML = '<iframe src="'+embedUrl+'/embed" width="800" height="'+newHeight+'" frameborder="0"></iframe>'
    return (
        <div className="action button blue" style={{zIndex:3}}>
            <ModalButton name={props.name} closeButton="Close">
                <div>
                    <h4>Embed chart</h4>
                    <p>Copy the embed code below and paste it in your website to embed this chart.</p>
                    <input className="embed-code" value={embedHTML} />
                </div>
            </ModalButton>
        </div>
    )
}

