const sortData = (data, sortString) => {
    if (!Array.isArray(data)) {
        throw new Error('Data should be an array');
    }
    if (typeof sortString !== 'string' || sortString.trim() === '') {
        throw new Error('Sort string should be a non-empty string.');
    }

    const [field, order] = sortString.split(':').map(s => s.trim());
    if (!field) {
        throw new Error('Sort field is required.');
    }

    // Check if field exists in at least one item
    if (!data.some(item => item.hasOwnProperty(field))) {
        throw new Error(`The field "${field}" does not exist in the data.`);
    }

    const isAsc = !order || order.toLowerCase() === 'asc';

    return [...data].sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];

        if (valueA === undefined && valueB === undefined) return 0;
        if (valueA === undefined) return isAsc ? 1 : -1;
        if (valueB === undefined) return isAsc ? -1 : 1;

        if (valueA < valueB) return isAsc ? -1 : 1;
        if (valueA > valueB) return isAsc ? 1 : -1;
        return 0;
    });
};

module.exports = sortData;