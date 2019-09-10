import moment from "moment";

export function formatTime(seconds) {
	let m = moment.duration(seconds, 'second');

	let secs = m.seconds();
	let mins = m.minutes();

	secs = secs < 10 ? "0" + secs : secs;
	//mins = mins < 10 ? "0" + mins : mins;

	return mins + ":" + secs;
}

export default function collision(el1, el2) {
	var obj1 = el1.getBoundingClientRect();
	var obj2 = el2.getBoundingClientRect();

	return intersection(obj1, obj2);
}

export function inFocus(el) {
	var doc = document.documentElement;
	var left = 0;
	var top = window.innerHeight * 0.5;
	var height = 0;
	var width = window.innerWidth;

	var wnd = {
		top : top,
		left : left,
		height : height,
		width : width
	};
	var obj = el.getBoundingClientRect();

	return intersection(wnd, obj);
}

export function generateFictionTitle(_str) {
	var str = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    //var possible = "0123456789";

    for (var i = 0; i < _str.length; i++) {
    	if (i == 0) {
    		str += _str.charAt(0);
    	} else if (_str.charAt(i) == " ") {
    		str += " ";
    	} else if (i == _str.length - 1 ) {
    		str += _str.charAt(_str.length - 1);;
    	} else {
    		str += possible.charAt(Math.floor(Math.random() * possible.length));
    	}
    }

	return str;
}

export function intersection(obj1, obj2) {
	var x1 = obj1.left;
	var y1 = obj1.top;
	var h1 = obj1.height;
	var w1 = obj1.width;
	var b1 = y1 + h1;
	var r1 = x1 + w1;
	var x2 = obj2.left;
	var y2 = obj2.top;
	var h2 = obj2.height;
	var w2 = obj2.width;
	var b2 = y2 + h2;
	var r2 = x2 + w2;

	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
	return true;
}

export function getMinScale(_obj, _window) {
	//_obj = { w, h}, _window = { w, h}

	let a1 = _obj.w/_obj.h; // _obj1.h != 0
	let a2 = _window.w/_window.h; // _obj2.h != 0
	var _return = 0;

	if (a1 > a2) {
		_return =  _window.w / _obj.w;
	} else {
		_return =  _window.w / _obj.w;
		//_return =  _window.h / _obj.h;
	}

	return _return;
}

export function Timer(_delay, _count) { return {
	timerId : -1,
	currentCount : 0,
	repeatCount : Math.max(0,_count),
	//0 - till an infinity exists
	delay : Math.max(1,_delay),
	active : false,
	
	onTimerEvent : null,
	onTimerEventEnd : null,
	
	
	start : function ()
	{
		if (this.active)
			return false;
		
		if (!this.onTimerEvent && !this.onTimerEventEnd)
			return false;
		
		this.active = true;
		
		if ((this.currentCount <= this.repeatCount) || (this.repeatCount == 0))
			this.timerId = setInterval(this.timerProgress.bind(this), this.delay);
	},
	stop : function()
	{
		if (this.timerId!=-1)
			clearInterval(this.timerId);
		this.timerId = -1;
		this.active = false;
	},
	
	reset : function()
	{
		this.stop();
		this.currentCount = 0;
	},
	
	timerProgress : function()
	{
		
			
		if ((this.currentCount >= this.repeatCount) && (this.repeatCount > 0))
		{
			clearInterval(this.timerId);
			this.currentCount = this.repeatCount;
			this.timerId = -1;
			this.active = false;
			
			if (this.onTimerEventEnd)
			{
				var timerEvent = {type : "onTimerEventEnd", currentCount : this.currentCount, repeatCount : this.repeatCount, target : this};
				this.onTimerEventEnd(timerEvent);
			}
		}
		
		if (this.onTimerEvent)
		{
			var timerEvent = {type : "onTimerEvent", currentCount : this.currentCount, repeatCount : this.repeatCount, target : this};
			this.onTimerEvent(timerEvent);
		}
		
		this.currentCount++;
	}
}}

export function isServer() {
	return !(typeof window !== 'undefined')
}
