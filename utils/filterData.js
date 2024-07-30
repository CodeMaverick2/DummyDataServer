const filterData = (data, filterString) => {
    if (!Array.isArray(data)) {
        throw new Error('Data should be an array');
    }
    if (typeof filterString !== 'string' || filterString.trim() === '') {
        throw new Error('Filter string should be a non-empty string.');
    }

    const [field, value] = filterString.split(':').map(s => s.trim());
    if (!field || !value) {
        throw new Error('Invalid filter format. Use "field:value" to specify the filter.');
    }

    // Check if field exists in at least one item
    if (!data.some(item => item.hasOwnProperty(field))) {
        throw new Error(`The field "${field}" does not exist in the data.`);
    }

    return data.filter(item => {
        const itemValue = item[field];
        if (itemValue === undefined) {
            return false;
        }
        return itemValue.toString().toLowerCase().includes(value.toLowerCase());
    });
};

module.exports = filterData;