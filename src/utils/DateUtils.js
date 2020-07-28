

export function convertDateToDisplayedString(date) {
    let string = "";
    if (date && date instanceof Date) {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        return `${(d <= 9 ? '0' + d : d)}/${(m <= 9 ? '0' + m : m)}/${y}`;
    }
    return string;
}

export function convertDateToStringInput(date) {
    return convertDateToStringInputWithSeparator(date, "-");
}

export function convertDateToStringInputWithSeparator(date, separator) {
    const safeSeparator = (separator) ? separator : "_";
    let stringInput = "";
    if (date && date instanceof Date) {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        return `${y}${safeSeparator}${(m <= 9 ? '0' + m : m)}${safeSeparator}${(d <= 9 ? '0' + d : d)}`;
    }
    return stringInput;
}

export function getMonthString(date) {
    let stringInput = "";
    if (date && date instanceof Date) {
        return date.toLocaleString('default', { month: 'long' });;
    }
    return stringInput;
}