/**
 * Middleware to convert specified request body fields from string to array.
 * @param  {...string} args - List of field names to be converted from string to array.
 * @returns {Function} - Express middleware function.
 */
const stringToArray = function(...args) {
    return function(req, res, next) {
        // Iterate through each specified field
        const fields = args;
        fields.forEach(field => {
            // Check if the field exists in the request body
            if(req.body[field]){
                // If the field value is a string
                if(typeof req.body[field] == "string"){
                    // If the string contains "#" character, split by "#" and trim each item
                    if(req.body[field].indexOf("#") >=0){
                        req.body[field] = (req.body[field].split("#")).map(item => item.trim())
                    }
                    // If the string contains "," character, split by "," and trim each item
                    else if(req.body[field].indexOf(",") >=0){
                        req.body[field] = (req.body[field].split(",")).map(item => item.trim())
                    }
                    // Otherwise, convert the string to an array with a single element
                    else{ 
                        req.body[field] = [req.body[field]]
                    }
                }
                // If the field value is already an array
                if(Array.isArray(req.body[field])){
                    // Trim each item in the array
                    req.body[field] = req.body[field].map(item => item.trim())
                    // Remove duplicates by converting to a Set and back to an array
                    req.body[field] = [... new Set(req.body[field])]
                }
            }
            // If the field doesn't exist in the request body, set it as an empty array
            else{
                req.body[field] = []
            }
        })
        // Move to the next middleware
        next()
    }
}

// Export the middleware function
module.exports = {
    stringToArray
}
