import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import onClickOutside from 'react-onclickoutside'
import classNames from 'classnames'

class RenderInBody extends React.Component {
    componentDidMount() {
      this.popup = document.createElement("div")
      document.body.appendChild(this.popup)
      this._renderLayer()
    }

    componentDidUpdate() {
      this._renderLayer()
    }

    componentWillUnmount() {
      ReactDOM.unmountComponentAtNode(this.popup)
      document.body.removeChild(this.popup)
    }

    _renderLayer = () => {
      ReactDOM.render(this.props.children, this.popup)
    };

    render() {
      // Render a placeholder
      //return React.DOM.div(this.props);
      return null
    }
}

export class ModalButton extends React.Component {
    static propTypes = {
        children: React.PropTypes.element.isRequired,
        name: React.PropTypes.string.isRequired,
        buttonProps: React.PropTypes.element, // TODO: Allow spread on button - 2016-01-28
        minWidth: React.PropTypes.string,
        extraClass: React.PropTypes.string,
        closeTop: React.PropTypes.bool,
    };

    /*
     * A button with its own Modal container
     * Has state w.r.t the Modal being open or closed
    */

    state = {
        opened: false
    };

    toggleModal = () => {
        this.setState({ opened: !this.state.opened })
    };

    closeModal = () => {
        this.setState({ opened: false })
    };

    performAction = () => {
        this.props.action()
        this.setState({opened: false})
    };

    render() {
        var modalClass = classNames('modal-container', this.props.extraClass)
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
                                <div className={modalClass}>
                                    <Modal minWidth={this.props.minWidth} handleClickOutside={this.closeModal} disableOnClickOutside={!this.state.opened} >
                                        <div>
                                            {this.props.children}
                                            <div className="actions">
                                                {this.props.actionButton ? <a className="button secondary" onClick={this.performAction}>{this.props.actionButton}</a> : null }
                                                {this.props.closeButton ? <a className="button" onClick={this.toggleModal}>{this.props.closeButton}</a> : null }
                                            </div>
                                            {this.props.closeTop ? <a className="close-icon" onClick={this.toggleModal}><i className="material-icons">close</i></a> : null}
                                        </div>
                                    </Modal>
                                </div>
                            : null}
                        </ReactCSSTransitionGroup>
                    </div>
                </RenderInBody>
            </div>
        )
    }
}

const Modal = onClickOutside(class extends React.Component {
    /*
     * Overlay container
     */

    static propTypes = {
        children: React.PropTypes.element.isRequired,
        opened: React.PropTypes.bool,
    };

    handleClickOutside = (e) => {
        this.props.handleClickOutside(e)
    };

    render() {
        return (
            <div className="modal ignore-react-onclickoutside" style={{minWidth: this.props.minWidth}}>
                {this.props.children}
            </div>
        )
    }
})

const ModalOverlay = props => {
    return (
       <div className="modal-overlay"></div>
    )
}
