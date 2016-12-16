import _ from 'lodash'
import React, { PropTypes } from 'react'
import Textarea from 'react-textarea-autosize'

import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, Entity, ContentState } from 'draft-js'
import numeral from 'numeral'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { setEditState } from '../../actions/sync'

const {Map} = Immutable

class RichEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
        };

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => {
            if (!this.props.editing) {
                this.props.setEditState(true)
            }
            this.setState({editorState})
            this.timedSave()
        }

        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    componentWillMount() {
        let content = this.props.defaultContent

        if (typeof content == 'string'){
            let emptyContentState = ContentState.createFromText('');
            content = convertToRaw(emptyContentState);
        }

        if (typeof content.entityMap == "undefined") {
            content.entityMap = {}
        }

        let cs = convertFromRaw(content)

        this.setState({
            editorState: EditorState.createWithContent(cs),
        })
        this.timedSave = _.debounce(this.save,1000)
    }

    save() {
        const content = this.state.editorState.getCurrentContent()
        let rawContentState = convertToRaw(content)
        let plainText = content.getPlainText()
        this.props.saveDescription(rawContentState, plainText)
    }

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    render() {
        const {editorState} = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div className="RichEditor-root wysiwyq">
                <div className="toolbar">
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />
                </div>
                <div className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        placeholder="Add information about the context of your chart..."
                        ref="editor"
                        spellCheck={true}
                        />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    const { 
        saveState,
    } = state

    return {
        editing: saveState.editing,
    }
}

export default connect(mapStateToProps, {
    setEditState
})(RichEditor)

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
            {this.props.icon ? <i className="material-icons">{this.props.icon}</i> : this.props.label}
            </span>
            );
    }
}

const BLOCK_TYPES = [
    {label: 'Header', style: 'header-three', icon: 'format_size'},
    {label: 'Blockquote', style: 'blockquote', icon: 'format_quote'},
    {label: 'UL', style: 'unordered-list-item', icon: 'format_list_bulleted'},
    {label: 'OL', style: 'ordered-list-item', icon: 'format_list_numbered'},
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
            <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
                icon={type.icon}
            />
            )}
        </div>
        );
};

var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD', icon: 'format_bold' },
    {label: 'Italic', style: 'ITALIC', icon: 'format_italic'},
    {label: 'Underline', style: 'UNDERLINE', icon: 'format_underlined'},
];

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
        {INLINE_STYLES.map(type =>
            <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
                icon={type.icon}
            />
            )}
        </div>
    );
};


/*export const DraftEditor = React.createClass({
    getInitialState: function() {     
        return {
            editorState: EditorState.createEmpty(),
            //editorState: EditorState.createEmpty(),
            // value: RichTextEditor.createValueFromString(content,'html'),
        }
    },
    componentWillReceiveProps: function(nextProps) {
    },
    componentWillMount: function() {
        let content = this.props.defaultContent

        if (typeof content == 'string'){
            let emptyContentState = ContentState.createFromText('');
            content = convertToRaw(emptyContentState);
        }

        if (typeof content.entityMap == "undefined") {
            content.entityMap = {}
        }

        let ContentSt = convertFromRaw(content)
        //let contentState = ContentState.createFromBlockArray(ContentSt)

        this.setState({
            editorState: EditorState.createWithContent(ContentSt)
        })
        this.timedSave = _.debounce(this.save,500)
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
            { style : 'unstyled', label : 'Paragraph' },
            { style : 'header-three', label : 'Header' },
            { style : 'blockquote', label : 'Block quote' },
        ]
        let codeOptions = blockStyles.map(c => (
            <option key={c.style} value={c.style}>{ c.label }</option>
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
            </div>
        )
    }
})*/

class Input extends React.Component {
    state = {
        value: this.props.value ? this.props.value : ""
    };

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            })
        }
    }

    onChange = (event) => {
        event = Object.assign({}, event)

        this.setState({value: event.target.value})

        if (this.props.onChange)
            this.props.onChange(event)
    };

    render() {
        return (
            <input {...this.props} value={this.state.value} onChange={this.onChange} />
        )
    }
}

export const InputText = (props) => (
    <Input type={props.type ? props.type : 'text'} {...props} />
)

class TextAreaAG extends React.Component {
    state = {
        value: this.props.value ? this.props.value : ""
    };

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value
            })
        }
    }

    onChange = (event) => {
        this.setState({value: event.target.value})

        if (this.props.onChange)
            this.props.onChange(event)
    };

    render() {
        return (
            <Textarea {...this.props} value={this.state.value} onChange={this.onChange} />
        )
    }
}

export const InputTextArea = (props) => (
    <TextAreaAG {...props} />
)

// export const InputNumber = (props) => (
//     <Input type="number" {...props} />
// )

export class InputNumber extends React.Component {
    state = {
        value: this.props.value ? this.props.value : "0"
    };

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

    onChange = (event) => {
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
    };

    render() {



        return (
            <Input type="number" {...this.props} value={this.state.value} onChange={this.onChange} />
        )
    }
}

// export const InputNumber = NumberInput
