const app = angular.module('app', []);

const TEST_PER_SET = 2000;
const TEST_ARR = Array.apply(null, { length: TEST_PER_SET }).map((_, i) => i);
const TEST_VAR = 'test';
const tests = [
  {
    desc: 'baseline',
    template: ``,
  },
  {
    desc: 'baseline render elements',
    template: `<div></div>`,
  },
  {
    desc: 'interpolation literal',
    template: `<div>{{'test'}}</div>`,
  },
  {
    desc: 'interpolation literal w/ one time binding',
    template: `<div>{{::'test'}}</div>`,
  },
  {
    desc: 'interpolation scope',
    template: `<div>{{$ctrl.prop}}</div>`,
    controller: function() {
      this.prop = TEST_VAR;
    },
  },
  {
    desc: 'interpolation scope w/ one time binding',
    template: `<div>{{::$ctrl.prop}}</div>`,
    controller: function() {
      this.prop = TEST_VAR;
    },
  },
  {
    desc: 'ng-bind literal',
    template: `<div ng-bind="'test'"></div>`,
  },
  {
    desc: 'ng-bind literal w/ one time binding',
    template: `<div ng-bind="::'test'"></div>`,
  },
  {
    desc: 'ng-bind scope',
    template: `<div ng-bind="$ctrl.prop"></div>`,
    controller: function() {
      this.prop = TEST_VAR;
    },
  },
  {
    desc: 'ng-bind scope w/ one time binding',
    template: `<div ng-bind="::$ctrl.prop"></div>`,
    controller: function() {
      this.prop = TEST_VAR;
    },
  },
];

tests.forEach((test, i) =>
  app.component(
    `test${i}`,
    Object.assign({}, test, {
      template: TEST_ARR.reduce(a => a + test.template, ''),
    })
  )
);

app.component('testContainer', {
  bindings: {
    testId: '<',
  },
  template: `
    <div ng-switch="$ctrl.testId">
      ${tests
        .map((_, i) => {
          const name = `test${i}`;
          return `
            <div  ng-switch-when="${i}">
              <${name}></${name}>
            </div>`;
        })
        .join('')}
    </div>`,
});
