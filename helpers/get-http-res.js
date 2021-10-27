const defaultOptionsList = {
    get(code) {
        return this[`_${code}`];
    },
    _200: { message: 'Success' },
    _403: { message: 'Forbidden' },
    _500: { message: 'Internal Server Error' }
};

function getHttpRes(code, res, options) {
    const defaultOptions = defaultOptionsList.get(code);
    const mergedOptions = {...defaultOptions, ...options};
    
    return res.status(code).json({ ...mergedOptions });
}

module.exports = { getHttpRes };
