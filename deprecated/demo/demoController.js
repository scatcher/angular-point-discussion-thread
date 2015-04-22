(function () {
    'use strict';

    angular
        .module('demo-app')
        .controller('demoController', demoController);

    /* @ngInject */
    function demoController(mockModel, apDiscussionThreadFactory) {
        var vm = this;

        vm.val = 'test';

        activate();


        /**==================PRIVATE==================*/

        function activate() {
            mockModel.executeQuery()
                .then(function (indexedCache) {
                    /** Provision discussion thread attribute on first entity */
                    vm.testEntity = indexedCache[1];
                    //vm.testEntity.discussionThread = apDiscussionThreadFactory
                    //    .createDiscussionObject(vm.testEntity, 'discussionThread');

                    console.log(vm.testEntity);

                })
        }
    }
})();
