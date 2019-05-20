import React, {Component} from 'react'
import './item.css'
import PropTypes from 'prop-types'

class TodoItem extends Component {
    constructor(props){
        super(props)
        this.state = {}
        this.handleItemDelete = this.handleItemDelete.bind(this)
    }
    render(){
        return <li className='item' onClick={this.handleItemDelete}>{this.props.content}</li>
    }
    handleItemDelete(index){
        this.props.handleItemDelete(this.props.index)
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.content !== this.props.content){
            return true;
        }else{
            return false;
        }
    }
}

TodoItem.propTypes ={
    test: PropTypes.string.isRequired,  //必须传递test。不写isRequired的话不传递不会报错,则默认不显示
    content: PropTypes.string,
    index: PropTypes.number,
    handleItemDelete: PropTypes.func
}

TodoItem.defaultProps = {
    test: 'default value'
}

export default TodoItem