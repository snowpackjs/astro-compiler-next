import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { convertToTSX } from '@astrojs/compiler';

const FIXTURE = `<html>
  <head>
    <title>Hello world</title>
  </head>
  <body>
    <div>
      {/*
    </div>
  </body>
</html>`;

let result;
test.before(async () => {
  result = await convertToTSX(FIXTURE, {
    pathname: '/src/components/EOF.astro',
  });
});

test('got a tokenizer error', () => {
  assert.ok(Array.isArray(result.errors));
  assert.is(result.errors.length, 1);
  assert.is(result.errors[0].text, 'Unterminated comment');
  assert.is(FIXTURE.split('\n')[result.errors[0].location.line - 1], `      {/*`);
});

test.run();
