var bootstrapComponent = {
	controller: function () {
	},
	view: function () {
		return [
			m(".container", [
				m(".page-header", [
					m("h1", "Alerts")
				]),
				m(".alert.alert-success[role='alert']", [
					m("strong", "Well done!"),
					" You successfully read this important alert message.\n      "
				]),
				m(".alert.alert-info[role='alert']", [
					m("strong", "Heads up!"),
					" This alert needs your attention, but it's not super important.\n      "
				]),
				m(".alert.alert-warning[role='alert']", [
					m("strong", "Warning!"),
					" Best check yo self, you're not looking too good.\n      "
				]),
				m(".alert.alert-danger[role='alert']", [
					m("strong", "Oh snap!"),
					" Change a few things up and try submitting again.\n      "
				])
			])
		];
	}
};

var carouselModule = {
	controller: function () {
	},
	view: function () {
		function enableCrousel(element, isInitialized, context) {
			if (!isInitialized) {
				$(element).carousel();
			}
		}

		return [
			m(".container", [
				m(".page-header", [
					m("h1", "Carousel")
				]),
				m(".carousel.slide[data-ride='carousel']", {config: enableCrousel}, [//configで描画時に呼び出される
					m("ol.carousel-indicators", [
						m("li", "hogehoge")
					])
				])
			])
		];
	}
};


m.mount(document.getElementById("root"), bootstrapComponent);


var NavBar = {
	view: function (ctrl, args) {
		var activeUrl = m.route();
		return m(".container", [
			m(".navbar-header", [
				m("button.navbar-toggle.collapsed[aria-controls='navbar']" +
					"[aria-expanded='false'][data-target='#navbar']" +
					"[data-toggle='collapse'] [type='button']", [
					m("span.sr-only", "Toggle navigation"),
					m("span.icon-bar"),
					m("span.icon-bar"),
					m("span.icon-bar")
				]),
				m("a.navbar-brand", {href: "#", config: m.route}, args.title)
			]),
			m(".navbar-collapse.collapse[id='navbar']", [
				m("ul.nav.navbar-nav", [
					m("li", {class: args.root === activeUrl ? "active" : ""}, [
						m("a", {href: args.root, config: m.route}, args.pages[args.root])
					]),
					m("li.dropdown", [
						m("a.dropdown-toggle[aria-expanded='false']" +
							"[data-toggle='dropdown'][href='#'][role='button']",
							{class: args.root !== activeUrl ? "active" : ""},
							[args.title + " ", m("span.caret")]),
						m("ul.dropdown-menu[role='menu']", Object.keys(args.pages).map(function (key) {
								if (key === args.root) {
									return "";
								}
								return m("li", [m("a", {href: key, config: m.route},
									[key === activeUrl
										? m("span.glyphicon.glyphicon-triangle-right")
										: "",
										args.pages[key]])]);
							})
						)
					])
				])
			])
		]);
	}
};

//
m.route(document.getElementById("root"), "/title", {
	"/title": bootstrapComponent,
	"/buttons": bootstrapComponent,
	"/tables": bootstrapComponent,
});

m.mount(document.getElementById("navbar"), m.component(NavBar, {
	title: "サンプル一覧",
	root: "/title",
	pages: {
		"/title": "Bootstrapサンプル",
		"/buttons": "Buttons",
		"/tables": "Tables",
	}
}));



