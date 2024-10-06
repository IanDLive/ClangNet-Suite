/************************************************************************************************
 * ClangNet API - a collection of functions that are commonly called through the ClangNet Suite *
 * **********************************************************************************************/

(function () {
    /**
     * @function cnGetJSON
     * @export $
     * @param {String} url
     * @param {java.util.HashMap} header
     * @returns {JSON}
     */
    function cnGetJSON(url, header) {
        var HttpRequest = Packages.com.gmt2001.HttpRequest;
        var HashMap = Packages.java.util.HashMap;
        if (header == null) {
            var h = new HashMap();
        } else {
            var h = header;
        }
        var responseData = HttpRequest.getData(HttpRequest.RequestType.GET, encodeURI(url), '', h);
        return responseData.content;
    }


    /**
     * @function cnGetJSONPackage
     * @exports $
     * @param {String} url
     * @param {java.util.HashMap} header
     * @returns {Object}
     * @returns {Object.content}
     * @returns {Object.httpCode}
     * @returns {Object.success}
     */
    function cnGetJSONPackage(url, header) {
        var HttpRequest = Packages.com.gmt2001.HttpRequest;
        var HashMap = Packages.java.util.HashMap;
        if (header == null) {
            var h = new HashMap();
        } else {
            var h = header;
        }
        var responseData = HttpRequest.getData(HttpRequest.RequestType.GET, encodeURI(url), '', h);
        return responseData;
    }


    /**
     * @function cnPostJSONPackage
     * @exports $
     * @param {String} url
     * @param {Object} payload
     * @returns {Object}
     * @returns {Object.content}
     * @returns {Object.httpCode}
     * @returns {Object.success}
     */
    function cnPostJSONPackage(url, payload) {
        var HttpRequest = Packages.com.gmt2001.HttpRequest;
        var HashMap = Packages.java.util.HashMap;
        var responseData = HttpRequest.getData(HttpRequest.RequestType.POST, url, payload, new HashMap());
        return responseData;
    }


    /**
     * @function cnUserStrings
     * @export $
     * @param {String} user
     * @returns {Array}
     *          0 = @[NAME]
     *          1 = [NAME]
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
    $.cnPostJSONPackage = cnPostJSONPackage;
    $.cnUserStrings = cnUserStrings;
})();

