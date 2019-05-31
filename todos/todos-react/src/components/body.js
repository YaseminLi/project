import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import  TodoList from './todo_list';
export default class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue: '',
            todos: []
        }
    }
    inputChange(e) {
        this.setState({ inputValue: e.target.value })
    }
    //增加todoItem
    onAddTodo(e) {
        if (e.keyCode == 13) {
            const newTodo = { title: e.target.value, completed: false };
            const todos = this.state.todos;
            todos.push(newTodo);
            this.setState({ todos, inputValue: '' });
        };
    }
    //todoItem是否完成的状态
    changeChecked(index) {
        const { todos } = this.state;
        todos[index].completed = !todos[index].completed;
        this.setState({ todos });
    }
    //删除todoItem
    destroy(index) {
        const { todos } = this.state;
        todos.splice(index, 1);
        this.setState({ todos });
    }
    //清除完成的
    clearCompleted() {
        console.log('clear')
        let { todos } = this.state;
        todos = todos.filter(item => { if (item.completed == false) return true });
        this.setState({ todos })
    }
    render() {
        const allTodos = this.state.todos;
        const activeTodos = allTodos.filter(item => { if (item.completed == false) return true });
        const completedTodos = allTodos.filter(item => { if (item.completed == true) return true });
        // const todoList = todos.length ? todos.map((item, index) => (
        //     <div key={index} className='todoItem'>
        //         <label htmlFor={index} className={item.completed ? 'Complete' : ''}></label>
        //         <input type='checkbox' id={index} checked={item.completed} onChange={this.changeChecked.bind(this, index)} />
        //         <div className={item.completed ? 'itemComplete' : 'item'}>{item.title}</div>
        //         <button className='destroy' onClick={this.destroy.bind(this, index)}>x</button>
        //     </div>
        // )) : '';
        return (
            <div className='main'>
                <input className='new-todo' placeholder='What needs to be done?' onKeyUp={e => this.onAddTodo(e)} value={this.state.inputValue} onChange={(e) => this.inputChange(e)} />
                <div className='todoList'>
                    <Router>
                        <Switch>
                            <Route exact path='/' ><TodoList todos={allTodos}/></Route>
                            <Route path='/active' ><TodoList todos={activeTodos}/></Route>
                            <Route path='/completed' ><TodoList todos={completedTodos}/></Route>
                        </Switch>
                    </Router></div>

                <div className='footer' style={{ "display": allTodos.length !== 0 ? "flex" : "none" }} >
                    <div className='total-count'>
                        <span className='num'>{activeTodos.length} </span>
                        <span className='num-item'>{activeTodos.length < 2 ? 'item' : 'items'} </span>
                        <span>left</span>
                    </div>
                    <div className='filters'>
                        <Router>
                            <Link to="/"><span className='a'>All</span></Link>
                            <Link to="/active"><span>Active</span></Link>
                            <Link to="/complrete"><span>Complete</span></Link>
                        </Router>
                    </div>
                    <div onClick={this.clearCompleted.bind(this)}>clear completed</div>
                </div>
            </div>
        )
    }
}