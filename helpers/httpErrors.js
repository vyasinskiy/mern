const httpErrors = {
    _500: (res, msg= 'Internal server error') => res.status(500).json({ message: msg })
}

module.exports = { httpErrors };
