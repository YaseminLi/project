import React from 'react';
export default class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue: '',
            selectedFilter: ''
        }
    }
    componentWillMount() {
        const url = document.URL.split('/#/')[1];
        const selectedFilter = url ? url : 'all';
        let todos=JSON.parse(localStorage.getItem('todos'));
        todos=todos?todos:[];
        this.setState({ selectedFilter,todos })
    }
    inputChange(e){
        this.setState({ inputValue: e.target.value })
    }
    //增加todoItem
    onAddTodo(e) {
        if (e.keyCode == 13) {
            const newTodo = { title: e.target.value, completed: false };
            const todos = this.state.todos;
            todos.push(newTodo)
            this.setState({ todos, inputValue: '' });
            localStorage.setItem('todos',JSON.stringify(todos))
        };
    }
    //todoItemga完成的状态切换
    changeChecked(index) {
        const { todos } = this.state;
        todos[index].completed = !todos[index].completed;
        this.setState({ todos });
        localStorage.setItem('todos',JSON.stringify(todos))
    }
    //删除todoItem
    destroy(index) {
        const { todos } = this.state;
        todos.splice(index, 1);
        this.setState({ todos });
        localStorage.setItem('todos',JSON.stringify(todos))
    }
    //清除完成的
    clearCompleted() {
        let { todos } = this.state;
        todos = todos.filter(item => { if (item.completed == false) return true });
        this.setState({ todos })
        localStorage.setItem('todos',JSON.stringify(todos))
    }
    //被选中的filter保存至state中
    selectedFilter(a) {
        this.setState({
            selectedFilter: a
        });
    }
    //全部勾选
    toggleAll() {
        const { todos } = this.state;
        const toggle = todos.find(e => e.completed == false);
        if (toggle) {
            todos.map(item => item.completed = true);
        } else {
            todos.map(item => item.completed = false);
        }
        this.setState({ todos });
        localStorage.setItem('todos',JSON.stringify(todos))
    }
    render() {
        let { todos, selectedFilter } = this.state;
        const activeTodos = todos.filter(item => { if (item.completed == false) return true });
        const completedTodos =todos.filter(item => { if (item.completed == true) return true });
        let currentTodos = [];
        if (selectedFilter == 'active') {
            currentTodos = activeTodos;
        } else if (selectedFilter == 'completed') {
            currentTodos = completedTodos;
        } else {
            currentTodos = todos;
        }
        const todoList = currentTodos? currentTodos.map((item, index) => (
            <div key={index} className='todoItem'>
                <label htmlFor={index} className={item.completed ? 'Complete' : ''}></label>
                <input type='checkbox' id={index} checked={item.completed} onChange={this.changeChecked.bind(this, index)} />
                <div className={item.completed ? 'itemComplete' : 'item'}>{item.title}</div>
                <button className='destroy' onClick={this.destroy.bind(this, index)}>x</button>
            </div>
        )) : '';
        return (
            <div className='main'>
                <div className='toggle'
                    style={{ "display": todos.length!==0? "flex" : "none" }}
                    onClick={this.toggleAll.bind(this)}
                >
                    <p className={todos.length == completedTodos.length ? 'toggle-all' : ''}>></p></div>
                <input
                    className='new-todo'
                    placeholder='What needs to be done?'
                    onKeyUp={e => this.onAddTodo(e)}
                    value={this.state.inputValue}
                    type="text"
                    onChange={(e) => this.inputChange(e)}
                />
                <div className='todoList'>
                    {todoList}
                </div>

                <div className='footer' style={{ "display": todos.length!==0? "flex" : "none" }} >
                    <div className='total-count'>
                        <span className='num'>{activeTodos.length} </span>
                        <span className='num-item'>{activeTodos.length < 2 ? 'item' : 'items'} </span>
                        <span>left</span>
                    </div>
                    <div className='filters'>
                        <span onClick={this.selectedFilter.bind(this, 'all')} className={selectedFilter == 'all' ? 'selected' : 'no-selected'}>All</span>
                        <span onClick={this.selectedFilter.bind(this, 'active')} className={selectedFilter == 'active' ? 'selected' : 'no-selected'}>Active</span>
                        <span onClick={this.selectedFilter.bind(this, 'completed')} className={selectedFilter == 'completed' ? 'selected' : 'no-selected'}>Complete</span>
                    </div>
                    <div className='clear' onClick={this.clearCompleted.bind(this)}>
                        <p style={{ "display": completedTodos.length !== 0 ? "flex" : "none" }}>clear completed</p>
                    </div>
                </div>
            </div>
        )
    }
}