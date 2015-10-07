/**
 * TodoItem Model
 * @param {object} data
 * @constructor
 */
'use strict';

var TodoItem = function TodoItem(data) {
    this.description = m.prop(data.description);
    this.done = m.prop(false);
};

/**
 * list method
 * @returns {Array}
 */
TodoItem.list = function () {
    var tasks = [];
    var src = localStorage.getItem('todo');
    if (src) {
        var json = JSON.parse(src);
        for (var i = 0; i < json.length; i++) {
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
    localStorage.setItem('todo', JSON.stringify(todoList.filter(function (todo) {
        return !todo.done();
    })));
};
/**
 * view model
 */
var vm = undefined;
vm = {
    init: function init() {
        vm.list = TodoItem.list();
        vm.description = m.prop('');
        /**
         * add item
         */
        vm.add = function () {
            if (vm.description()) {
                vm.list().push(new TodoItem({ description: vm.description() }));
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

var Button = {
    controller: function controller() {},
    view: function view() {
        return {
            tag: 'button',
            children: ['追加'],
            attrs: {
                onclick: vm.add
            }
        };
    }
};

var app = {
    controller: function controller() {
        vm.init();
    },
    view: function view() {
        return {
            tag: 'div',
            children: [{
                tag: 'input',
                attrs: {
                    type: 'text',
                    onchange: m.withAttr('value', vm.description),
                    value: vm.description()
                }
            }, m.component(Button, {}, []), {
                tag: 'table',
                children: [vm.list().map(function (task) {
                    return {
                        tag: 'tr',
                        children: [{
                            tag: 'label',
                            children: [{
                                tag: 'td',
                                children: [{
                                    tag: 'input',
                                    attrs: {
                                        type: 'checkbox',
                                        onclick: m.withAttr("checked", vm.check.bind(task))
                                    }
                                }]
                            }, {
                                tag: 'td',
                                children: [task.description()],
                                attrs: {
                                    style: { textDecoration: task.done() ? 'line-through' : 'none' }
                                }
                            }]
                        }]
                    };
                })]
            }]
        };
    }

};

m.mount(document.getElementById('root'), app);

//# sourceMappingURL=app-compiled.js.map