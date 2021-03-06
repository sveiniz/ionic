describe('$ionSlide controller', function() {
  beforeEach(module('ionic'));

  function makeCtrl() {
    var ctrl;
    inject(function($rootScope, $controller) {
      ctrl = $controller('$ionSlide', {
        $scope: $rootScope.$new(),
        $element: angular.element('<div>')
      });
    });
    return ctrl;
  }

  it('#onAdded()', function() {
    var ctrl = makeCtrl();
    expect(ctrl.state).toBeFalsy();
    ctrl.onAdded(parent);
    expect(ctrl.state).toBe('detached');
  });

  it('#onRemoved()', function() {
    var ctrl = makeCtrl();
    expect(ctrl.state).toBeFalsy();
    ctrl.onRemoved();
    expect(ctrl.state).toBe('detached');
  });

  it('#setState()', function() {
    var ctrl = makeCtrl();
    ctrl.onAdded(angular.element('<div>'));

    expect(ctrl.element.parent().length).toBe(0);
    ctrl.setState('selected');
    expect(ctrl.element.attr('slide-state')).toBe('selected');
    expect(ctrl.element.attr('slide-previous-state')).toBe('detached');
    expect(ctrl.element.parent()[0]).toBe(ctrl.parentElement[0]);

    ctrl.setState('previous');
    expect(ctrl.element.attr('slide-state')).toBe('previous');
    expect(ctrl.element.attr('slide-previous-state')).toBe('selected');
    expect(ctrl.element.parent()[0]).toBe(ctrl.parentElement[0]);

    ctrl.setState('detached');
    expect(ctrl.element.attr('slide-state')).toBe('detached');
    expect(ctrl.element.attr('slide-previous-state')).toBe('previous');
    expect(ctrl.element.parent().length).toBe(0);

    ctrl.setState('next');
    expect(ctrl.element.attr('slide-state')).toBe('next');
    expect(ctrl.element.attr('slide-previous-state')).toBe('detached');
    expect(ctrl.element.parent()[0]).toBe(ctrl.parentElement[0]);

  });
});
