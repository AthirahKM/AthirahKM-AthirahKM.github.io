(function () {
    var app = angular.module('test', []);

    app.controller('TestController', ["$scope", "$http", '$window', 'apiURL', '$rootScope', '$cookies', 'DTOptionsBuilder', 'baseURL', 'sharedFn', function ($scope, $http, $window, apiURL, $rootScope, $cookies, DTOptionsBuilder, baseURL, sharedFn) {
        console.log("TestController logged on.");

        $scope.IsOpenDetail = false;

        //Variants

        $scope.getVariants = function () {
            console.log("TestController.getVariants triggered.");
            $http({
                method: 'GET',
                url: apiURL + '/v3/covid-19/variants/countries'
            }).then(function onSuccess(response) {
                $scope.variants = response.data;
                console.log($scope.variants);
            }).catch(function onError(response) {
                console.log(response);
            });
        };

        $scope.getVariantsByCountries = function (country) {
            console.log("TestController.getVariantsByCountries triggered.");
            $http({
                method: 'GET',
                url: apiURL + '/v3/covid-19/variants/countries/' + country
            }).then(function onSuccess(response) {
                $scope.countryVariantsList = response.data;
                console.log($scope.variants);
            }).catch(function onError(response) {
                console.log(response);
            });
        };


        // Influenza
        $scope.getInfluenzaILINet = function () {
            console.log("TestController.getInfluenzaILINet triggered.");
            $http({
                method: 'GET',
                url: apiURL + '/v3/influenza/cdc/ILINet'
            }).then(function onSuccess(response) {
                $scope.InfluenzaILINetList = response.data;
                $scope.InfluenzaILINetList2 = $scope.InfluenzaILINetList.data;
                console.log($scope.InfluenzaILINetList2);
            }).catch(function onError(response) {
                console.log(response);
            });
        };

        $scope.getInfluenzaUSCL = function () {
            console.log("TestController.getInfluenzaUSCL triggered.");
            $http({
                method: 'GET',
                url: apiURL + '/v3/influenza/cdc/USCL'
            }).then(function onSuccess(response) {
                $scope.InfluenzaUSCLList = response.data;
                $scope.InfluenzaUSCLList2 = $scope.InfluenzaUSCLList.data;
                console.log($scope.InfluenzaUSCLList2);
            }).catch(function onError(response) {
                console.log(response);
            });
        };

        $scope.getInfluenzaUSPHL = function () {
            console.log("TestController.getInfluenzaUSPHL triggered.");
            $http({
                method: 'GET',
                url: apiURL + '/v3/influenza/cdc/USPHL'
            }).then(function onSuccess(response) {
                $scope.InfluenzaUSPHLList = response.data;
                $scope.InfluenzaUSPHLList2 = $scope.InfluenzaUSPHLList.data;
                console.log($scope.InfluenzaUSPHLList2);
            }).catch(function onError(response) {
                console.log(response);
            });
        };

        //Therapeutic
        $scope.getTherapeutic = function () {
            console.log("TestController.getTherapeutic triggered.");
            $http({
                method: 'GET',
                url: apiURL + '/v3/covid-19/therapeutics'
            }).then(function onSuccess(response) {
                $scope.TherapeuticList = response.data;
                $scope.TherapeuticList2 = $scope.TherapeuticList.phases;
                console.log($scope.TherapeuticList2);
            }).catch(function onError(response) {
                console.log(response);
            });
        };

        //government
        $scope.getGovCountries = function () {
            console.log("TestController.getGovCountries triggered.");
            $http({
                method: 'GET',
                url: apiURL + '/v3/covid-19/gov/'
            }).then(function onSuccess(response) {
                $scope.GovCountries = response.data;
            }).catch(function onError(response) {
                console.log(response);
            });
        };

        $scope.getGovListByCountries = function () {
            console.log("TestController.getGovListByCountries triggered.");
            $http({
                method: 'GET',
                url: apiURL + '/v3/covid-19/gov/Austria'
            }).then(function onSuccess(response) {
                $scope.GovAustriaList = response.data;

                $scope.GovAustriaCasesDistrict = $scope.GovAustriaList.districts;
                $scope.GovAustriaCasesData = $scope.GovAustriaList.percentageBySex;
                $scope.GovAustriaProvinceData = $scope.GovAustriaList.provinces;

                $scope.GovAustriaSex_NewCases = $scope.GovAustriaCasesData.cases;

                $scope.GovAustriaCasesFemale = $scope.GovAustriaSex_NewCases.female;
                $scope.GovAustriaCasesMale = $scope.GovAustriaSex_NewCases.male;

                $scope.GovAustriaSex_Death = $scope.GovAustriaCasesData.deaths;

                $scope.GovAustriaDeathFemale = $scope.GovAustriaSex_Death.female;
                $scope.GovAustriaDeathMale = $scope.GovAustriaSex_Death.male;

                $scope.getCasesDeathBySex();
                $scope.getAustriaProvince();

                console.log($scope.GovAustriaList);

            }).catch(function onError(response) {
                console.log(response);
            });
        };

        $scope.getCasesDeathBySex = function () {

            var elementList = [];

            elementList.push({
                "c": [{
                    "v": "Cases"
                }, {
                    "v": $scope.GovAustriaCasesFemale
                }, {
                    "v": $scope.GovAustriaCasesMale
                }]
            });

            elementList.push({
                "c": [{
                    "v": "Deaths"
                }, {
                    "v": $scope.GovAustriaDeathFemale
                }, {
                    "v": $scope.GovAustriaDeathMale
                }]
            });

            $scope.CasesBySexChart = {
                "type": "ColumnChart",
                "displayed": false,
                "cssStyle": "height:500px;width: 100%",
                "data": {
                    "cols": [{
                        "id": "DIV",
                        "label": "DIV",
                        "type": "string"
                    }, {
                        "id": "1",
                        "label": "Male",
                        "type": "number",
                    }, {
                        "id": "2",
                        "label": "Female",
                        "type": "number",
                    }
                    ],
                    "rows": elementList
                },
                "options": {
                    "title": "",
                    "isStacked": "false",
                    "fill": 20,
                    "is3D": true,
                    //"colors": ["#002780", "#002001", "#003301"],
                    "animation": {
                        "startup": true,
                        "duration": 2000,
                        "easing": "inAndOut"
                    },
                    "displayExactValues": false,
                    "vAxis": {
                        "title": "Percentage",
                        "gridlines": {
                            "count": 10
                        }
                    },
                    "hAxis": {
                        //"title": "DIV"
                    }
                }
            };

        };

        $scope.getAustriaProvince = function () {

            var elementList = [];
            angular.forEach($scope.GovAustriaProvinceData, function (item) {
                elementList.push({
                    "c": [{
                        "v": item.province
                    }, 
                    {
                    "v": item.cases
                    },
                    {
                        "v": item.cases
                    },
                    {
                        "v": item.deaths
                    },
                    {
                        "v": item.deaths
                    },
                    {
                        "v": item.recovered
                    },
                    {
                        "v": item.recovered
                    }
                    ]
                });
            });

            $scope.AustriaProvinceChart = {
                "type": "ColumnChart",
                "displayed": false,
                "cssStyle": "height:500px;width: 100%",
                "data": {
                    "cols": [{
                        "id": "Province",
                        "label": "Province",
                        "type": "string"
                    }, {
                        "id": "Cases",
                        "label": "Cases",
                        "type": "number",
                    },
                    { "role": 'annotation' },
                    {
                        "id": "Death",
                        "label": "Death",
                        "type": "number",
                    },
                    { "role": 'annotation' },
                    {
                        "id": "Recovered",
                        "label": "Recovered",
                        "type": "number",
                    },
                    { "role": 'annotation' }],
                    "rows": elementList
                },
                "options": {
                    "title": "",
                    "isStacked": "false",
                    "fill": 20,
                    "is3D": true,
                    //"colors": ["#f542c8"],
                    "animation": {
                        "startup": true,
                        "duration": 2000,
                        "easing": "inAndOut"
                    },
                    "displayExactValues": false,
                    "vAxis": {
                        "minValue": 0,
                        "title": "Total",
                        "gridlines": {
                            "count": 10
                        }
                    },
                    "hAxis": {
                        //"title": "Treatment Type Return By PPATM",
                        "minValue": 0,
                        "viewWindowMode": 'pretty',
                        "textPosition": 'out',
                        "slantedText": true,
                        "showTextEvery": 1
                    }
                }
            };

        };

        //nyt
        $scope.getNYTStates = function () {
            console.log("TestController.getNYTStates triggered.");
            $http({
                method: 'GET',
                url: apiURL + '/v3/covid-19/nyt/states?lastdays=8'
            }).then(function onSuccess(response) {
                $scope.nytStates = response.data;
                console.log($scope.nytStates);
            }).catch(function onError(response) {
                console.log(response);
            });
        };

        $scope.getListByNYTStates = function (stt) {
            console.log("TestController.getListByNYTStates triggered.");
            $http({
                method: 'GET',
                url: apiURL + '/v3/covid-19/nyt/states/' + stt + '?lastdays=8'
            }).then(function onSuccess(response) {
                $scope.IsOpenDetail = true;

                $scope.nytStatesList0 = response.data[0];
                $scope.nytStatesList1 = response.data[1];
                $scope.nytStatesList2 = response.data[2];
                $scope.nytStatesList3 = response.data[3];
                $scope.nytStatesList4 = response.data[4];
                $scope.nytStatesList5 = response.data[5];
                $scope.nytStatesList6 = response.data[6];
                $scope.nytStatesList7 = response.data[7];
                $scope.nytStatesList8 = response.data[8];

                //console.log($scope.nytStatesList);
            }).catch(function onError(response) {
                console.log(response);
            });
        };

        //vaccine

        $scope.getVaccine = function () {
            console.log("TestController.getNYTCounties triggered.");
            $http({
                method: 'GET',
                url: apiURL + '/v3/covid-19/vaccine'
            }).then(function onSuccess(response) {

                $scope.VaccineList = response.data.phases;
                $scope.VaccineData = response.data;
                $scope.VaccineDataList = $scope.VaccineData.data;


            }).catch(function onError(response) {
                console.log(response);
            });
        };

        $scope.getCountryVaccineCoverage = function () {
            console.log("TestController.getWorldVaccineCoverage triggered.");
            $http({
                method: 'GET',
                url: apiURL + '/v3/covid-19/vaccine/coverage/countries?lastdays=1&fullData=false',
            }).then(function onSuccess(response) {
                $scope.VaccCountryCoverageList = response.data;
            }).catch(function onError(response) {
                console.log(response);
            });
        };

        $scope.ChartVaccineList = function () {

            var elementList = [];
            angular.forEach($scope.VaccCountryCoverageList, function (item) {
                console.log($scope.VaccCountryCoverageList);


                elementList.push({
                    "c": [{
                        "v": item.country
                    },
                    {
                        "v": item.timeline[0]
                    },
                    //{
                    //    "v": item.timeline
                    //}
                    ]
                });
            });

            $scope.VaccineCoverageCountriesChart = {
                "type": "ColumnChart",
                //"displayed": false,
                "cssStyle": "height:500px;width: 100%",
                "data": {
                    "cols": [
                        {
                            "id": "Year",
                            "label": "Year",
                            "type": "string"
                        },
                        {
                            "id": "Total",
                            "label": "Total",
                            "type": "number",
                        },

                        { "role": 'annotation' }

                    ],
                    "rows": elementList
                },
                "options": {
                    "title": "",
                    "isStacked": "false",
                    "fill": 20,
                    "is3D": true,
                    "colors": ["#002780", "#002001", "#003301", "#002001", "#003301", "#002001", "#003301", "#002001"],
                    "animation": {
                        "startup": true,
                        "duration": 2000,
                        "easing": "inAndOut"
                    },
                    "displayExactValues": false,
                    "vAxis": {
                        "title": "Total Coverage",
                        "gridlines": {
                            "count": 10
                        }
                    },
                    "hAxis": {
                        "title": "Patient Category"
                    }
                }
            };


        };
  

    }]);

})();