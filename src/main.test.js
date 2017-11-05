var Table = require('cli-table');

require('./main');

describe('General perf benchmarks', () => {
  let $compile, $rootScope;
  const table = new Table({
    head: ['Description', 'Result'],
    colWidths: [60, 20],
  });
  afterAll(() => {
    table.sort((a, b) => a[1] - b[1]);
    console.log(table.toString());
  });
  beforeEach(() => angular.mock.module('app'));
  beforeEach(() => {
    angular.mock.inject(function(_$compile_, _$rootScope_) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
    global.gc();
  });
  const runTest = ([i, desc]) => {
    it(desc, () => {
      const $ele = $compile(`<test-container test-id="${i}"></test-container>`)(
        $rootScope
      );

      const start = Date.now();
      $rootScope.$digest();
      const end = Date.now();
      table.push([`${i} - ${desc}`, end - start]);
    });
  };
  [
    [0, 'baseline'],
    [1, 'baseline render elements'],
    [2, 'interpolation literal'],
    [3, 'interpolation literal w/ one time binding'],
    [4, 'interpolation scope'],
    [5, 'interpolation scope w/ one time binding'],
    [6, 'ng-bind literal'],
    [7, 'ng-bind literal w/ one time binding'],
    [8, 'ng-bind scope'],
    [9, 'ng-bind scope w/ one time binding'],
  ].forEach(runTest);
});
