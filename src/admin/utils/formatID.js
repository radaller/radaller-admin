export default (value) => {
    if(!value) return '';
    const trim = /^\s+|\s+$/g;
    const special = /[^\w\s]/gi;
    const spaces = /\s+/g;
    return value
        .replace(trim, '')
        .replace(special, '')
        .replace(spaces, '_')
        .toLowerCase();
};