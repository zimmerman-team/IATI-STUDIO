"use strict"

import _ from 'lodash'
import { PropTypes } from 'react'
import React from 'react'
import classNames from 'classnames'

import { SearchableAccordion, Accordion, AccordionItem } from '../general/Accordion.react.jsx'
import { ButtonList, NestedButtonList, NestedButtonListItem } from '../general/List.react.jsx'


export const FoundationButtonList = (props) => (
    <NestedButtonList
        ulClass="accordion"
        loadingChart={props.loadingChart} >
        {props.children}
    </NestedButtonList>
)

export const FoundationButtonListItem = (props) => (
    <NestedButtonListItem
        liClass="accordion-navigation clickthru"
        {...props}
        >{props.children} 
    </NestedButtonListItem>
)

export const FoundationAccordion = React.createClass({
    
    propTypes: {
        onSearch: PropTypes.func,
    },

    onSearch: function(searchValue){
        this.props.onSearch(searchValue)
    },

    render: function() {

        return (
            <SearchableAccordion
                onSearch={this.onSearch}
                ulClass="accordion">
                {this.props.children}
            </SearchableAccordion>
        )
    }
})

export const FoundationAccordionItem = (props) => (
    <AccordionItem
        {...props}
        liClass={classNames("accordion-navigation dropdown", props.liClass)}>
        {props.children} 
    </AccordionItem>
)



