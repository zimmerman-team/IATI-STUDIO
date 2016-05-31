import _ from 'lodash'
import React, { PropTypes } from 'react'
import Textarea from 'react-textarea-autosize'

import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, Entity, ContentState} from 'draft-js'

//import RichTextEditor from 'react-rte';

import numeral from 'numeral'

export const DraftEditor = React.createClass({
    getInitialState: function() {     
        return {
            editorState: EditorState.createEmpty(),
            //editorState: EditorState.createEmpty(),
            // value: RichTextEditor.createValueFromString(content,'html'),
        }
    },
    componentWillReceiveProps: function(nextProps) {
        let content = nextProps.defaultContent

        if (typeof content == 'string'){
            let emptyContentState = ContentState.createFromText('');
            content = convertToRaw(emptyContentState);
        }

        if (typeof content.entityMap == "undefined") {
            content.entityMap = {}
        }

        let ContentSt = convertFromRaw(content)
        let contentState = ContentState.createFromBlockArray(ContentSt)

        this.setState({
            editorState: EditorState.createWithContent(contentState)
        })
    },
    componentWillMount: function() {
       this.timedSave = _.debounce(this.save,5000)
    },
    onChange: function(editorState) {
        this.setState({editorState})
        this.timedSave()
    },
    handleKeyCommand: function(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
        if (newState) {
            this.onChange(newState)
            return true
        }
        return false
    },
    onStyleClick: function(style) {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style))
    },
    onStyleBlockClick: function(block) {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, block))
    },
    onStyleBlockSelect: function(event) {
        console.log(event.target.value)
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, event.target.value))
    },
    save: function() {
        const content = this.state.editorState.getCurrentContent()
        //this.props.onBlurSave(convertToRaw(content))
        // let editorState = this.state.value.getEditorState()
        // let contentState = editorState.getCurrentContent()
        let rawContentState = convertToRaw(content)
        this.props.saveDescription(rawContentState)
        //console.log(content)
    },
    render: function() {
        let blockStyles = [
            { style : 'paragraph', name : 'Paragraph' },
            // { style : 'header-one', name : 'Header 1' },
            // { style : 'header-two', name : 'Header 2' },
            { style : 'header-three', name : 'Header' },
            // { style : 'header-four', name : 'Header 4' },
            // { style : 'header-five', name : 'Header 5' },
            // { style : 'header-six', name : 'Header 6' },
            { style : 'blockquote', name : 'Block quote' },
        ]
        let codeOptions = blockStyles.map(c => (
            <option key={c.style} value={c.style}>{ c.name }</option>
        ))
        const selection = this.state.editorState.getSelection();
        const blockType = this.state.editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType()

        const currentStyle = this.state.editorState.getCurrentInlineStyle()

        return (
            <div className="wysiwyq">
                <div className="toolbar">
                    <select onChange={this.onStyleBlockSelect} value={blockType}>
                        { codeOptions }
                    </select>
                    <button className={currentStyle.has('BOLD') ? 'active' : null} onClick={this.onStyleClick.bind(null, 'BOLD')}><i className="material-icons">format_bold</i></button>
                    <button className={currentStyle.has('ITALIC') ? 'active' : null} onClick={this.onStyleClick.bind(null, 'ITALIC')}><i className="material-icons">format_italic</i></button>
                    <button className={currentStyle.has('UNDERLINE') ? 'active' : null} onClick={this.onStyleClick.bind(null, 'UNDERLINE')}><i className="material-icons">format_underlined</i></button>
                    <button className={blockType == 'unordered-list-item' ? 'active' : null} onClick={this.onStyleBlockClick.bind(null, 'unordered-list-item')}><i className="material-icons">format_list_bulleted</i></button>
                    <button className={blockType == 'ordered-list-item' ? 'active' : null} onClick={this.onStyleBlockClick.bind(null, 'ordered-list-item')}><i className="material-icons">format_list_numbered</i></button>
                </div>
                <Editor 
                    editorState={this.state.editorState} 
                    onChange={this.onChange}
                    handleKeyCommand={this.handleKeyCommand}
                    placeholder="Add information about the context of your chart"
                    />

                {/*<RichTextEditor
                    value={this.state.value}
                    onChange={this.onChange}
                />*/}

            </div>
        )
    }
})

const Input = React.createClass({

    getInitialState: function() {
        return {
            value: this.props.value ? this.props.value : ""
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            })
        }
    },

    onChange: function(event) {
        event = Object.assign({}, event)

        this.setState({value: event.target.value})

        if (this.props.onChange)
            this.props.onChange(event)
    },

    render: function() {
        return (
            <input {...this.props} value={this.state.value} onChange={this.onChange} />
        )
    }
})

export const InputText = (props) => (
    <Input type={props.type ? props.type : 'text'} {...props} />
)

const TextAreaAG = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value ? this.props.value : ""
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            })
        }
    },

    onChange: function(event) {
        this.setState({value: event.target.value})

        if (this.props.onChange)
            this.props.onChange(event)
    },

    render: function() {
        return (
            <Textarea {...this.props} value={this.state.value} onChange={this.onChange} />
        )
    }
})

export const InputTextArea = (props) => (
    <TextAreaAG {...props} />
)

// export const InputNumber = (props) => (
//     <Input type="number" {...props} />
// )

export const InputNumber = React.createClass({

    getInitialState: function() {
        return {
            value: this.props.value ? this.props.value : "0"
        };
    },

    // componentWillReceiveProps: function(nextProps) {
    //     if ('value' in nextProps) {
    //         this.setState({
    //             value: nextProps.value
    //         })
    //     }
    // },

    // getValue: function(value) {
    //     let { min, max } = this.props
    //     let n = numeral(value)
    
    //     if (_.isNumber(min) && n.value() < min) n = numeral(min)
    //     else if (_.isNumber(max) && n.value() > max) {
    //         n = numeral(max)
    //     }

    //     return n.value()
    // }

    onChange: function(event) {
        let { min, max } = this.props

        let n = numeral(event.target.value)
        let value = n.value()

        if (_.isNumber(min) && value < min) n = numeral(min)
        else if (_.isNumber(max) && value > max) {
            n = numeral(max)
        }

        this.setState({value: n.value()})

        if (this.props.onChange)
            this.props.onChange(n.value())
    },

    render: function() {



        return (
            <Input type="number" {...this.props} value={this.state.value} onChange={this.onChange} />
        )
    }
})

// export const InputNumber = NumberInput
