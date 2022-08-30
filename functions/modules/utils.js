
export function sort(property) {
    // console.log(1, property[0])
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return (obj1, obj2) => {
        var result = (obj1[property] < obj2[property]) ? -1 : (obj1[property] > obj2[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

export function sortMulti() {
    var props = arguments;
    return (obj1, obj2) => {
        var i = 0, result = 0, numberOfProperties = props.length;
        // try getting a different result from 0 (equal)as long as we have extra properties to compare
        while (result === 0 && i < numberOfProperties) {
            result = sortOne(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

export function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed() + ' ' + sizes[i];
}

export function truncate(text, size = 100) {
    text = text.replace(/<\/?(.*?)>/g, "");
    if (text.length > size) {
        var subString = text.slice(0, size);
        var body = subString.slice(0, subString.lastIndexOf(" ")) + "..";
        return body
    }
    return text
}