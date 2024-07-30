const filterData = require('../utils/filterData');
const sortData = require('../utils/sortData');
const dataService = require('../services/dataService');

exports.getData = async (req, res) => {
    try {
        let data = await dataService.getData();
        const { filter, sort } = req.query;

        // Handle filtering
        if (filter !== undefined) {
            if (typeof filter !== 'string' || filter.trim() === '') {
                return res.status(400).json({ error: 'Filter query must be a non-empty string.' });
            }
            try {
                data = filterData(data, filter);
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
        }

        // Handle sorting
        if (sort !== undefined) {
            if (typeof sort !== 'string' || sort.trim() === '') {
                return res.status(400).json({ error: 'Sort query must be a non-empty string.' });
            }
            try {
                data = sortData(data, sort);
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
        }

        // Check for invalid query parameters
        const allowedParams = ['filter', 'sort'];
        const invalidParams = Object.keys(req.query).filter(param => !allowedParams.includes(param));
        if (invalidParams.length > 0) {
            return res.status(400).json({ error: `Invalid query parameter(s): ${invalidParams.join(', ')}` });
        }

        // Handle no data found
        if (data.length === 0) {
            return res.status(404).json({ message: 'No data matched the criteria' });
        }

        // Respond with filtered and sorted data
        res.json(data);
    } catch (error) {
        console.error('Error in getData:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};