import React, {Component, Fragment} from 'react'
import './style.css'
import axios from 'axios'
import TodoItem from './todoItem.js'

class TodoList extends Component{
    constructor(props){
        super(props)
        this.state = {
            inputValue : '',
            list: ['init_data1', 'init_data2']
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.handleItemDelete = this.handleItemDelete.bind(this)
    }

    handleInputChange(e){
        const value = e.target.value
        this.setState( pre => ( 
            {inputValue: value}
        ))
    }
    handleBtnClick(e){
        this.setState(pre => (
            {
                inputValue: '',
                list: [...pre.list, pre.inputValue]
            }
        ))
        
    }
    handleItemDelete(index){
        const list = [...this.state.list];
        list.splice(index, 1);
        this.setState( pre => {
            const list = [...pre.list];
            list.splice(index, 1);
            return {list: list}
        })
    }
    getTodoItem(){
        return this.state.list.map((item, index) => {
            return <TodoItem
                        key = {index}
                        content={item}
                        index={index}
                        handleItemDelete={this.handleItemDelete}
                        />
        })
    }
    componentDidMount(){
        axios.get('/api')
        .then((res)=>{
            this.setState((pre) => {
                return {list: [...res.data]}
            })
        }).catch(()=>{
            alert('network error')
        })
    }
    render(){
        return (
            <Fragment>
                <div>
                    <label htmlFor='input_id'>请输入内容</label>
                    <input id='input_id' className='input' value = {this.state.inputValue} onChange={this.handleInputChange}/>
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul>
                    { this.getTodoItem() }
                </ul>
            </Fragment>
        )
    }
}

export default TodoList