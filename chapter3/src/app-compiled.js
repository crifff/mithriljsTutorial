"use strict";

var home = {
	controller: function controller() {},
	view: function view() {
		return m("h1", 'HOME');
	}
};

home.controller.prototype.onunload = function (e) {
	console.log("unload HOME");
};

var dashboard = {
	controller: function controller() {},
	view: function view() {
		return m("h1", 'DASH BOARD');
	}
};
dashboard.controller.prototype.onunload = function (e) {
	e.preventDefault();
};

m.route(document.body, "/", {
	"/": home,
	"/dashboard": dashboard
});

m.route("/dashboard"); //unload HOME
m.route("/home"); //dashboardのunload時にpreventDefaultされるとhomeへの移動が中断される

//# sourceMappingURL=app-compiled.js.map