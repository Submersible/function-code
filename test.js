var Code = require('./'),
    test = require('tap').test;

test('inlining', function (t) {
    t.plan(2);
    t.test('one line', function (t) {
        t.plan(2);
        t.equals(function () { foo += 1; bar += foo; }.toInline(), 'foo += 1; bar += foo;');
        t.equals(Code.inline(function () { foo += 1; bar += foo; }), 'foo += 1; bar += foo;');
    });
    t.test('multi line', function (t) {
        t.plan(2);
        var dedent_code = (
            'var a = 1,\n' +
            '    b = 2;\n' +
            'console.log(\'a + b =\', a + b);'
        );
        t.equals(function () {
            var a = 1,
                b = 2;
            console.log('a + b =', a + b);
        }.toInline(), dedent_code);
        t.equals(Code.inline(function () {
            var a = 1,
                b = 2;
            console.log('a + b =', a + b);
        }), dedent_code);
    });
});

test('self invoke', function (t) {
    t.plan(2);
    t.test('one line', function (t) {
        t.plan(3);
        t.equals(function () { foo += 1; return bar += foo; }.toCode(), '(function () { foo += 1; return bar += foo; }())');
        t.equals(Code(function () { foo += 1; return bar += foo; }), '(function () { foo += 1; return bar += foo; }())');
        t.equals(Code.code(function () { foo += 1; return bar += foo; }), '(function () { foo += 1; return bar += foo; }())');
    });
    t.test('multi line', function (t) {
        t.plan(3);
        var dedent_code = (
            '(function () {\n' +
            '    var foo = 1,\n' +
            '        bar = 2;\n' +
            '    foo += 1;\n' +
            '    bar += foo;\n' +
            '}())'
        );
        t.equals(function () {
            var foo = 1,
                bar = 2;
            foo += 1;
            bar += foo;
        }.toCode(), dedent_code);
        t.equals(Code(function () {
            var foo = 1,
                bar = 2;
            foo += 1;
            bar += foo;
        }), dedent_code);
        t.equals(Code.code(function () {
            var foo = 1,
                bar = 2;
            foo += 1;
            bar += foo;
        }), dedent_code);
    });
});

test('with state', function (t) {
    t.plan(3);
    t.test('one line', function (t) {
        t.plan(3);
        t.equals(function (obj, n) { foo += 1; return bar += foo; }.toCode({hello: 'world'}, 123), '(function (obj, n) { foo += 1; return bar += foo; }({"hello":"world"},123))');
        t.equals(Code(function (obj, n) { foo += 1; return bar += foo; }, {hello: 'world'}, 123), '(function (obj, n) { foo += 1; return bar += foo; }({"hello":"world"},123))');
        t.equals(Code.code(function (obj, n) { foo += 1; return bar += foo; }, {hello: 'world'}, 123), '(function (obj, n) { foo += 1; return bar += foo; }({"hello":"world"},123))');
    });
    t.test('multi line', function (t) {
        t.plan(3);
        var dedent_code = (
            '(function (obj, n) {\n' +
            '    foo += 1;\n' +
            '    bar += foo;\n' +
            '}({"hello":"world"},123))'
        );
        t.equals(function (obj, n) {
            foo += 1;
            bar += foo;
        }.toCode({hello: 'world'}, 123), dedent_code);
        t.equals(Code(function (obj, n) {
            foo += 1;
            bar += foo;
        }, {hello: 'world'}, 123), dedent_code);
        t.equals(Code.code(function (obj, n) {
            foo += 1;
            bar += foo;
        }, {hello: 'world'}, 123), dedent_code);
    });
    t.test('test serialing', function (t) {
        t.plan(1);
        t.equals(function (a, b, c, d, e, f) {
            return a + b + c + d + e + f;
        }.toCode(
            undefined, true, 123, NaN, -0.123,
            [1, 2, 3], {foo: 'bar', meow: false}
        ), (
            '(function (a, b, c, d, e, f) {\n' +
            '    return a + b + c + d + e + f;\n' +
            '}(null,true,123,null,-0.123,[1,2,3],{"foo":"bar","meow":false}))'
        ));
    });
});
