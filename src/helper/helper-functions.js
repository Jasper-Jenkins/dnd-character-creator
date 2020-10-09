export default function isSelected(obj) {
    for (var key in obj) {
        obj.hasOwnProperty(key)
        return true;
    }
    return false;
}
