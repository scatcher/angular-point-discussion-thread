(function () {
    'use strict';

    angular
        .module('demo-app', [
            //Mock Support
            'ngMockE2E',
            'toastr',

            //SP-Angular
            'angularPoint'
        ])
        .constant('user', {lookupId: '1', lookupValue: 'Bob Smith'})
        .constant('_', _)
        .run(function ($httpBackend) {

            // Don't mock the html views
            $httpBackend.whenGET(/\.html$/).passThrough();

            $httpBackend.whenGET(/\.xml$/).passThrough();

        });

})();
