
describe('SSAP tests: ', function() {
    var $controller, Source, $rootScope, $httpBackend;

    beforeEach(module('app'));

    beforeEach(angular.mock.http.init);
    afterEach(angular.mock.http.reset);

    beforeEach(inject(function(_$controller_, _Source_, _$rootScope_, _$httpBackend_) {
        $controller = _$controller_;
        $scope = {};
        Source = _Source_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET($rootScope.sourceURL).passThrough();
    }));

    it('JSON validity', function(done) {

        var indexCtrl = $controller('indexCtrl', { $scope: $scope });
          
        Source.get($rootScope.sourceURL).then(function(response) {
            expect(response.data.items.length > 0).toBe(true);
            expect(typeof response.data.items[0].title).toBe('string');
            expect(typeof response.data.items[0].content).toBe('string');
            expect(typeof response.data.items[0].updated).toBe('string');
            expect(response.data.items[0].title.length > 0).toBe(true);
            expect(response.data.items[0].content.length > 0).toBe(true);
            expect(response.data.items[0].updated.length > 0).toBe(true);
            done();
        });
    });

    it('goHome method', function(done) {

        var itemCtrl = $controller('itemCtrl', { $scope: $scope });

        expect($scope.goHome().$$url).toBe('/');
        done();
    });

});