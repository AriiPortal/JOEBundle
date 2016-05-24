'use strict';

var spec = {};

spec.weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function indexToDay(i) {
	return i + 1;
}

function dayToIndex(day) {
	return day == 0 ? 6 : day - 1;
}

function toDayName(day) {
	return spec.weekdays[dayToIndex(day)];
}

function formatMonthday(i) {
	var suffix;
	if (i != 11 && i % 10 == 1) {
		suffix = 'st';
	} else if (i != 12 && i % 10 == 2) {
		suffix = 'nd';
	} else if (i != 13 && i % 10 == 3) {
		suffix = 'rd';
	} else {
		suffix = 'th';
	}
	return String(i) + suffix;
}

spec.monthdays = new Array(31).fill(1);
spec.monthdays = spec.monthdays.map(function (x, i) {
	return formatMonthday(x + i);
});

function indexToMonthday(i) {
	return i + 1;
}

function monthdayToIndex(day) {
	return day - 1;
}

function toMonthdayName(day) {
	return spec.monthdays[monthdayToIndex(day)];
}

spec.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

spec.ultimos = ['last day', '1 day'];
spec.ultimos = spec.ultimos.concat(new Array(29).fill(2).map(function (x, i) {
	return String(x + i) + ' days';
}));