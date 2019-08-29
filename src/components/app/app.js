import React, {Component} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import SearchPanel from '../SearchPanel/SearchPanel';
import TodoList from '../TodoList/TodoList';
import ItemStatusFilter from '../ItemStatus/ItemStatus';
import AddItem from '../AddItem';

import './app.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {items : [
        this.createAddItem('Drink Coffee'),
        this.createAddItem('Make Awesome App'),
        this.createAddItem('Have a lunch')
      ],
      filter: 'all',
      search: ''
    };
  }
    maxId = 100;

    createAddItem = (label) => {
      return {
        label,
        important: false,
        done: false,
        id: this.maxId++
      }
    };

    onDelete = (id) => {
      this.setState(({items}) => {
        const idx = items.findIndex((el) => el.id === id);
        const newArray = [
          ...items.slice(0, idx),
          ...items.slice(idx + 1)
        ];
        return { items: newArray}
      })
    };

    onAdd = (item) => {
      const newItem = this.createAddItem(item);
      this.setState(({items}) => {
        const newArray = [
          ...items,
          newItem
        ];
        return {items: newArray }
      })
    };


    ToggleProperty = (arr, id, propName) => {
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};
      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ];
    };

    onToggleDone = (id) => {
      this.setState(({items}) => {
        return { items: this.ToggleProperty(items, id, 'done')};
      })
    };

    onToggleImportant = (id) => {
      this.setState(({items}) => {
        return { items: this.ToggleProperty(items, id, 'important')};
      })
    };

    onFilterChange = (filter) => {
      this.setState({ filter });
    };

    onSearchChange = (search) => {
      this.setState({ search });
    };


    filterItems(items, filter) {
      if (filter === 'all') {
        return items;
      } else if (filter === 'active') {
        return items.filter((item) => (!item.done));
      } else if (filter === 'done') {
        return items.filter((item) => item.done);
      }
    }

    searchItems(items, search) {
      if (search.length === 0) {
        return items;
      }

      return items.filter((item) => {
        return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
    }

    render() {
      const { items, filter, search } = this.state;
      const doneCount = items.filter((item) => item.done).length;
      const todoCount = items.length - doneCount;
      const visibleItems = this.searchItems(this.filterItems(items, filter), search);


      return (
        <div className="todo-app">
          <AppHeader toDo={todoCount} done={doneCount} />
          <div className="top-panel d-flex">
            <SearchPanel
              onSearchChange={this.onSearchChange}
            />
            <ItemStatusFilter
              filter={filter}
              onFilterChange={this.onFilterChange}
            />
          </div>
          <TodoList
            items={ visibleItems }
            onDelete={this.onDelete}
            onToggleImportant={this.onToggleImportant}
            onToggleDone={this.onToggleDone}
          />
          <AddItem onAdd={this.onAdd} />
        </div>
      );
    }
}
