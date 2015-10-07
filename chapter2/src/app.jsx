/**
 * TodoItem Model
 * @param {object} data
 * @constructor
 */
let TodoItem = function (data) {
    this.description = m.prop(data.description);
    this.done = m.prop(false);
};

/**
 * list method
 * @returns {Array}
 */
TodoItem.list = function () {
    const tasks = [];
    const src = localStorage.getItem('todo');
    if (src) {
        const json = JSON.parse(src);
        for (let i = 0; i < json.length; i++) {
            tasks.push(new TodoItem(json[i]));
        }
    }
    return m.prop(tasks);
};

/**
 * save method
 * @param {TodoItem[]} todoList
 */
TodoItem.save = function (todoList) {
    localStorage.setItem('todo', JSON.stringify(todoList.filter(todo => {
        return !todo.done();
    })));
};
/**
 * view model
 */
let vm;
vm = {
    init: () => {
        vm.list = TodoItem.list();
        vm.description = m.prop('');
        /**
         * add item
         */
        vm.add = function () {
            if (vm.description()) {
                vm.list().push(new TodoItem({description: vm.description()}));
                vm.description('');
                TodoItem.save(vm.list());
            }
        };
        /**
         * checked this item
         */
        vm.check = function () {
            this.done(true);
            TodoItem.save(vm.list());
        };
    }
};

let Button = {
    controller: ()=> {
    },
    view: ()=> {
        return <button onclick={vm.add}>追加</button>
    }
};

let app = {
    controller: ()=> {
        vm.init();
    },
    view: ()=> {
        return <div>
            <input type="text" onchange={m.withAttr('value', vm.description)} value={vm.description()}/>
            <Button/>
            <table>
                {vm.list().map(task =>{
                    return <tr>
                        <label>
                            <td>
                                <input type="checkbox" onclick={m.withAttr("checked",vm.check.bind(task))}/>
                            </td>
                            <td style={{textDecoration: task.done() ? 'line-through' : 'none'}}>{task.description()}</td>
                        </label>
                    </tr>
                    })}
            </table>
        </div>;
    }

};

m.mount(document.getElementById('root'), app);