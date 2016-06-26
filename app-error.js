"use strict";

var AppError = {};

AppError.mongo_duplicate_column_error = "11000";
AppError.invalid_email_format = "Invalid email format";
AppError.invalid_inputs_provided = "Invalid inputs provided";
AppError.invalid_credentials = "Invalid credentials";
AppError.no_users = "No users found";
AppError.invalid_auth_token = "Invalid authtoken";
AppError.unauth_access = "Unauthorized access";
AppError.registration_successfull = "Registration successfull. Please login to use the app.";

module.exports = AppError;
