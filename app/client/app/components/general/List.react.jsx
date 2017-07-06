"use strict"

import _ from 'lodash'
import React, { PropTypes } from 'react'
import classNames from 'classnames'
import store from '../../app'
import { Link } from 'react-router'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { changeOrder } from '../../actions/sync'

import GeminiScrollbar from 'react-gemini-scrollbar'

import onClickOutside from 'react-onclickoutside'

import { Tooltip } from './Tooltip.react.jsx'

export class ButtonList extends React.Component {
    /*
     * A list of accordions, acting as containers
     */

    static propTypes = {
        // containers: PropTypes.arrayOf(PropTypes.elements).isRequired, // what is rendered in accordion
        onClick: PropTypes.func, // when clicking on the list item

        active: PropTypes.number, // index of active item

        ulClass: PropTypes.string,
        liClass: PropTypes.string,
        activeClass: PropTypes.string,
    };

    render() {

        // required
        let { children } = this.props
        // optional
        let { active, ulClass, liClass, activeClass } = this.props

        return (
            <ul className={ulClass}>
                {children}
            </ul>
        )
    }
}

export class NestedButtonList extends React.Component {
    /*
     * A list of accordions, acting as containers
     */

    static propTypes = {
        // containers: PropTypes.arrayOf(PropTypes.elements).isRequired, // what is rendered in accordion
        onClick: PropTypes.func, // when clicking on the list item

        active: PropTypes.number, // index of active item

        ulClass: PropTypes.string,
        liClass: PropTypes.string,
        activeClass: PropTypes.string,
    };

    render() {

        // required
        let { children } = this.props
        // optional
        let { active, ulClass, liClass, activeClass } = this.props

        return (
            <ul className={ulClass}>
                {children}
            </ul>
        )
    }
}

export class NestedButtonListItem extends React.Component {
    /*
     * A button list with an extra nested levels in the form of a div with an additional back button
    */

    static propTypes = {
        title: PropTypes.string.isRequired,
        initialActive: PropTypes.bool,
        tooltip: PropTypes.string,

        liClass: PropTypes.string,
        hrefClass: PropTypes.string, // title
        divClass: PropTypes.string, // div

        onClick: PropTypes.func,
    };

    state = {
        active: this.props.initialActive || false
    };

    onClickFwd = (e) => {
        e.preventDefault()
        this.setState({ active: !this.state.active })
    };

    resetSearchString = () => {
        console.log('TO DO: resetSearchString');
    };

    onClickBkwd = (e) => {
        this.setState({ active: !this.state.active })
        this.resetSearchString()
    };

    handleClickOutside = (e) => {
        var target = typeof e.target.className === 'string' ? e.target.className : ''
        if(target.indexOf('datepicker') == -1) {
            this.setState({ active: false })
        }
    };

    render() {
        let active = this.state.active
        let { title, length } = this.props
        let {liClass, hrefClass, divClass } = this.props
        let divWrapClass = classNames(divClass, 'nav-wrap secondary')
        let linkClass = classNames(hrefClass, {'active ignore-react-onclickoutside': this.state.active})
        //let slideDirection = this.props.from == "items" ? "slide" : "slide-right"
        return (
            <li className={liClass}>
                <Link to="/" onClick={this.onClickFwd} className={linkClass}>{length} {title}</Link>
                {this.props.tooltip ? <Tooltip tooltip={this.props.tooltip} className="small-list absolute" click={true}><i className="material-icons">info</i></Tooltip> : null}
                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    { active ?
                        <SubMenu
                            disableOnClickOutside={!active}
                            handleClickOutside={this.handleClickOutside}
                            className={divWrapClass}
                            onClickClose={this.onClickFwd}
                            children={this.props.children}
                             />
                    : null
                    }
                </ReactCSSTransitionGroup>
            </li>
        )
    }
}

const SubMenu = onClickOutside(class extends React.Component {
    handleClickOutside = (e) => {
        this.props.handleClickOutside(e)
    };

    render() {
        return (
            <GeminiScrollbar autoshow={true} forceGemini={false} className={this.props.className}>
                <a className="close" onClick={this.props.onClickClose}><i className="material-icons">close</i></a>
                { this.props.children }
            </GeminiScrollbar>
        )
    }
})

export const Checkbox = (props) => (
    <div>
        <div className={props.tooltip ? 'float-left' : null}>
            <input type="checkbox" id={props.id} {...props} />
            <label htmlFor={props.id}>{props.name} {props.length}</label>
        </div>
        {props.tooltip ? <Tooltip tooltip={props.tooltip} className="small-list" click={true}><i className="material-icons">info</i></Tooltip> : null}
    </div>
)

export const Radiobutton = (props) => {
 
    let inputProps = {...props}
    delete inputProps['labelName']

    return (
        <div>
            <input type="radio" id={props.id} {...inputProps} />
            <label htmlFor={props.id}>{props.labelName}</label>
        </div>
    )
}

export class CheckboxList extends React.Component {
    /*
     * a list of checkboxes, with a submit and cancel button
     * list of objects with checked: true/false for initial value
     */

    onSubmit = () => {
        // this.props.onSubmit(
        //     _.map(this.state.selected, (i) => this.props.items[i])
        // )
    };

    render() {

        return (
            <div className='selectfield checkboxes'>
                { this.props.children }
            </div>
        )
    }
}

export const SearchInput = (props) => (
    <label className='selectfield filter-list'>
        <input className="box" type="text" {...props} value={props.defaultValue} placeholder="Filter your results" />
        {/*<span className="fake-line"></span>*/}
    </label>
)

SearchInput.propTypes = {
    defaultValue: PropTypes.string,
}

// TODO: Make this a stand-alone component like Orderable - 2016-03-15
export class SearchableCheckboxList extends React.Component {
    /*
     * a list of checkboxes, with a search input
     * list of objects with checked: true/false for initial value
     */

    static propTypes = {
        onSearch: PropTypes.func
    };

    onInputChange = (event) => {
        this.props.onSearch(event.target.value)
    };

    render() {

        return (
            <div>
                <SearchInput onChange={this.onInputChange}/>
                <CheckboxList>
                    {this.props.children}
                </CheckboxList>
            </div>
        )
    }
}


export class OrderButton extends React.Component {
    static propTypes = {
        active: PropTypes.bool.isRequired,
        reverse: PropTypes.bool.isRequired,
    };

    render() {


        let classes = classNames({
            active : this.props.active,
            reverse : this.props.reverse
        })

        return (
            <button className={classes} onClick={this.props.onClick}>{this.props.children}</button>
        )
    }
}

export class Orderable extends React.Component {
    static propTypes = {
        orderables: PropTypes.arrayOf(PropTypes.string).isRequired,
        active: PropTypes.string.isRequired, // which orderable is active?
        reverse: PropTypes.bool, // reversed or not
    };

    dispatchAction = (value) => {
        store.dispatch(changeOrder(value))
    };

    onOrderChange = (newOrder, event) => {
        // this.setState({ filter: value })
        store.dispatch(changeOrder(newOrder, !this.props.reverse))
    };

    render() {
        const { active, orderables } = this.props

        return (
            <div {...this.props}>
                Order by
                { orderables.map((orderable, i) => (
                    <OrderButton
                        key={i}
                        active={orderable === active}
                        reverse={this.props.reverse}
                        onClick={this.onOrderChange.bind(null, orderable)}>
                        {orderable}
                    </OrderButton>
                ))}
            </div>
        )
    }
}

