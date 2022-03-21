(function () {
    var app = angular.module('TEST',
        [
            'ngCookies',
            'ngSanitize',
            'naif.base64',
            'datatables',
            'googlechart',
            'ui.bootstrap',
            'ui.tinymce',
            'test'
        ]);

    app.factory('baseURL', ['$window', '$location', function ($window, $location) {
        var url = 'http://localhost:15395';
        return url;
    }]);

    app.factory('apiURL', ['$window', '$location', function ($window, $location) {
        var url = 'https://disease.sh';
        return url;
    }]);

    app.factory('detectBrowser', ['$window', '$location', function ($window, $location) {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| ||a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }]);

    app.directive('ngConfirmClick', [function () {
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click', function (event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }]);

    app.factory('sharedFn', ['$window', '$location', '$rootScope', function ($window, $location, $rootScope) {
        return {
            queryString: function (param, path) {
                var sPageURL = path || window.location.search.substring(1),
                    sURLVariables = sPageURL.split(/[&||?]/),
                    res;

                for (var i = 0; i < sURLVariables.length; i += 1) {
                    var paramName = sURLVariables[i],
                        sParameterName = (paramName || '').split('=');

                    if (sParameterName[0] === param) {
                        res = sParameterName[1];
                    }
                }
                return res;
            },

            getPath: function () {
                return new $window.URL($location.absUrl()).href;
            },

            isURL: function (str) {
                var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                return pattern.test(str);
            },

            strToDate: function (dateString) {
                //This function only support this format - yyyy-mm-ddTHH:mm:ss

                if (dateString === null)
                    return;

                var reggie = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
                var dateArray = reggie.exec(dateString);
                var dateObject = new Date(
                    (+dateArray[1]),
                    (+dateArray[2]) - 1, // Careful, month starts at 0!
                    (+dateArray[3]),
                    (+dateArray[4]),
                    (+dateArray[5]),
                    (+dateArray[6])
                );
                return dateObject;
            },

            strToDateV2: function (dateString) {
                //This function only support this format - dd/mm/yyyy HH:mm:ss

                if (dateString === null)
                    return;

                var reggie = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
                var dateArray = reggie.exec(dateString);
                var dateObject = new Date(
                    (+dateArray[3]),
                    (+dateArray[2]) - 1, // Careful, month starts at 0!
                    (+dateArray[1]),
                    (+dateArray[4]),
                    (+dateArray[5]),
                    (+dateArray[6])
                );
                return dateObject;
            },

            dateToString: function (date) {
                //This function only return this format - dd/MM/yyyy 
                if (date === null)
                    date = new Date();

                var day = date.getDate();
                var month = (date.getMonth() + 1);
                day = day.toString().length !== 2 ? '0' + day : day;
                month = month.toString().length !== 2 ? '0' + month : month;
                return day + '/' + month + '/' + date.getFullYear();
            },

            dateToStringV2: function (date) {
                //This function only return this format - MM-dd-yyyy 
                if (date === null)
                    date = new Date();

                var day = date.getDate();
                var month = (date.getMonth() + 1);
                day = day.toString().length !== 2 ? '0' + day : day;
                month = month.toString().length !== 2 ? '0' + month : month;
                return month + '-' + day + '-' + date.getFullYear();
            },

            isJSON: function (str) {
                if (typeof (str) !== 'string') {
                    return false;
                }
                try {
                    JSON.parse(str);
                    return true;
                } catch (e) {
                    return false;
                }
            },

            guid: function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            },

            showModal: function (modalid) {
                try {
                    angular.element('.modal').modal('hide');
                    angular.element(modalid).modal({ backdrop: 'static', keyboard: false });
                    angular.element(modalid).modal('show');
                }
                catch (err) {
                    console.log(err);
                }
            },

            showMsgModal: function (title, msg) {
                try {
                    $rootScope.msgTitle = title;
                    $rootScope.msgBody = msg;
                    angular.element('#announcer').modal({ backdrop: 'static', keyboard: false });
                    angular.element('#announcer').modal('show');
                }
                catch (err) {
                    console.log(err);
                }
            }
        };
    }]);

    app.filter('filterNonUpgradeablePackage', function () {
        return function (packageList, packageId) {
            var filtered = [];
            if (packageList != undefined) {
                var currentPackage = packageList.find(function (element) {
                    return element.Id == packageId;
                });
                if (currentPackage != null)
                    for (var i = 0; i < packageList.length; i++) {
                        var item = packageList[i];
                        if (item != null && item != undefined)
                            if (item.Sort > currentPackage.Sort)
                                filtered.push(item);
                    }
            }
            return filtered;
        };
    });

    app.run(function ($rootScope, detectBrowser, baseURL, apiURL, sharedFn) {
        $rootScope.spinnerShow = false;
        $rootScope.showModalCloseButton = true;
        $rootScope.isMobile = detectBrowser;
        $rootScope.baseURL = baseURL;
        $rootScope.apiURL = apiURL;

        //Relay the message over session - in case redirection occur
        if (sessionStorage.message !== null && sessionStorage.message !== undefined) {
            sharedFn.showMsgModal('BERJAYA!', sessionStorage.message);
            delete sessionStorage.message;
        }

        if (sessionStorage.errMessage !== null && sessionStorage.errMessage !== undefined) {
            sharedFn.showMsgModal('RALAT!', sessionStorage.errMessage);
            delete sessionStorage.errMessage;
        }
    });

})();