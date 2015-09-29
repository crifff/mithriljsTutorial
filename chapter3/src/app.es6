let home = {
	controller: ()=>{},
	view: ()=>{
		return m("h1", 'HOME');
	}
};

home.controller.prototype.onunload = (e)=> {
	console.log("unload HOME")
};

let dashboard = {
	controller: ()=> {},
	view: ()=> {
		return m("h1", 'DASH BOARD');
	}
};
dashboard.controller.prototype.onunload = (e)=> {
	e.preventDefault();
};

m.route(document.body, "/", {
	"/": home,
	"/dashboard": dashboard
});

m.route("/dashboard"); //unload HOME
m.route("/home"); //dashboardのunload時にpreventDefaultされるとhomeへの移動が中断される
