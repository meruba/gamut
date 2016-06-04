(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('imageUpload', imageUpload);

  function imageUpload() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'directives/image-upload/image-upload.html',
      scope: {
        options: '=',
        event: '&'
      },
      controller: imageController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  imageController.$inject = ['$scope', 'Upload'];

  function imageController($scope, Upload){

    var vm = this;
    vm.image = vm.options.image;
    vm.textIdenticon = vm.options.identicon;
    vm.width = vm.options.width || '100%';
    vm.height = vm.options.height || '100%';

    vm.uploadFiles = uploadFiles;
    function uploadFiles(files){
      $scope.files = files;
      if (!$scope.files) return;
      angular.forEach(files, function(file){
        if (file && !file.$error) {
          file.upload = Upload.upload({
            url: vm.options.url,
            data: {
              tags: 'gls-image',
              context: 'photo=gls',
              file: file
            }
          }).progress(function (e) {
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            vm.status = file.progress + "%"
          }).success(function (data, status, headers, config) {
            vm.image = data.image;
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };

  }

})();
