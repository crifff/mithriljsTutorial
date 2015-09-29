function Todo(data) {
	this.done = m.prop(false);
	this.description = m.prop(data.description);
	this.history = data.history.map((entry)=>{
		return new HistoryEntry(entry);
	})
}

function HistoryEntry(data) {
	this.auther = m.prop(data.auther);
	this.date = m.prop(data.date);
}



