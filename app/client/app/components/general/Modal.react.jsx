import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const RenderInBody = React.createClass({

  componentDidMount: function() {
    this.popup = document.createElement("div")
    document.body.appendChild(this.popup)
    this._renderLayer()
  },


  componentDidUpdate: function() {
    this._renderLayer()
  },


  componentWillUnmount: function() {
    ReactDOM.unmountComponentAtNode(this.popup)
    document.body.removeChild(this.popup)
  },


  _renderLayer: function() {
    ReactDOM.render(this.props.children, this.popup)
  },

  render: function() {
    // Render a placeholder
    //return React.DOM.div(this.props);
    return null
  }

});

export const ModalButton = React.createClass({
    /*
     * A button with its own Modal container
     * Has state w.r.t the Modal being open or closed
    */

    getInitialState: function() {
        return {
            opened: false
        }
    },

    propTypes: {
        children: React.PropTypes.element.isRequired,
        name: React.PropTypes.string.isRequired,

        buttonProps: React.PropTypes.element, // TODO: Allow spread on button - 2016-01-28
    },

    mixins: [
        require('react-onclickoutside')
    ],

    toggleModal: function() {
        this.setState({ opened: !this.state.opened })
    },

    performAction: function(){
        this.props.action()
        this.setState({opened: false})
    },

    handleClickOutside: function(e) {
        if (e.target.parentNode.className == 'modal-container') {
            this.setState({opened: false})
        }
    },

    render: function() {
        return (
            <div style={{float: this.props.float}}>
                <a className={this.props.className} onClick={this.toggleModal}>{this.props.name}</a>
                <RenderInBody>
                    <div>
                        <ReactCSSTransitionGroup transitionName="fade-slow" transitionEnterTimeout={400} transitionLeaveTimeout={400}> 
                            {this.state.opened ? <ModalOverlay /> : null }
                        </ReactCSSTransitionGroup>
                        <ReactCSSTransitionGroup transitionName="zoom" transitionEnterTimeout={600} transitionLeaveTimeout={600}> 
                            {this.state.opened ? 
                                <ModalContainer>
                                    <div className="modal">
                                        {this.props.children}
                                        <div className="actions">
                                            {this.props.actionButton ? <a className="button secondary" onClick={this.performAction}>{this.props.actionButton}</a> : null }
                                            {this.props.closeButton ? <a className="button" onClick={this.toggleModal}>{this.props.closeButton}</a> : null }
                                        </div>
                                    </div>
                                </ModalContainer>
                            : null}
                        </ReactCSSTransitionGroup>
                    </div>
                </RenderInBody>
            </div>
        )
    }
})

const ModalContainer = React.createClass({
    /*
     * Overlay container
     */

    propTypes: {
        children: React.PropTypes.element.isRequired,
        opened: React.PropTypes.bool,
    },

    render: function() {
        return (
            <div className="modal-container">
                <div className="row">
                    <div className="columns small-centered small-12 medium-8 large-6 xlarge-4">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
})

const ModalOverlay = props => {
    return (
       <div className="modal-overlay"></div>
    )
}
