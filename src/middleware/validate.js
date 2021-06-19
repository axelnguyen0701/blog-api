const { validationResult } = require('express-validator');

const validation = (req, res, next) => {
	const validation_errors = validationResult(req);
	if (!validation_errors.isEmpty()) {
		let extractedErrors = ""
		validation_errors.array().map((err, index) => {
			if (index === 0) extractedErrors = err.msg;
			else {
				extractedErrors = extractedErrors + ', ' + err.msg
			}
		})
		return res.status(422).json({
			errors: extractedErrors,
		})
	} else {
		next();
	}
}

module.exports = validation;