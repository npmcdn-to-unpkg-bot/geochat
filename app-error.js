"use strict";

var AppError = {};

AppError.mongo_duplicate_column_error = "11000";
AppError.invalid_email_format = "Invalid email format";
AppError.invalid_inputs_provided = "Invalid inputs provided";
AppError.invalid_credentials = "Invalid credentials";

module.exports = AppError;
