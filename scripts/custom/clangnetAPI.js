/************************************************************************************************
 * ClangNet API - a collection of functions that are commonly called through the ClangNet Suite *
 * **********************************************************************************************/

(function () {
    /**
     * @function cnGetJSON
     * @export $
     * @param {String} url
     * @returns {JSON}
     */
    function cnGetJSON(url) {
        var HttpRequest = Packages.com.gmt2001.HttpRequest;
        var HashMap = Packages.java.util.HashMap;
        var responseData = HttpRequest.getData(HttpRequest.RequestType.GET, encodeURI(url), '', new HashMap());
        return responseData.content;
    }


    /**
     * @function cnGetJSONPackage
     * @exports $
     * @param {String} url
     * @returns {Object}
     * @returns {Object.content}
     * @returns {Object.httpCode}
     * @returns {Object.success}
     */
    function cnGetJSONPackage(url) {
        var HttpRequest = Packages.com.gmt2001.HttpRequest;
        var HashMap = Packages.java.util.HashMap;
        var responseData = HttpRequest.getData(HttpRequest.RequestType.GET, encodeURI(url), '', new HashMap());
        return responseData;
    }


    /**
     * @function cnUserStrings
     * @export $
     * @param {String} user
     * @returns {Array}
     */
    function cnUserStrings(user) {
        var user_mention = '';
        var user_string = '';

        if (user.substr(0, 1) == '@') {
            user_mention = user;
            user_string = user.substr(1);
        } else {
            user_mention = '@' + user;
            user_string = user;
        }
        return [user_mention, user_string];
    }

    /** Export functions to API */
    $.cnGetJSON = cnGetJSON;
    $.cnGetJSONPackage = cnGetJSONPackage;
    $.cnUserStrings = cnUserStrings;
})();

