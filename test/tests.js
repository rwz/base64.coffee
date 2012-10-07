test('Base64.decode64 ASCII', function(){
  equal(Base64.decode64('aGVsbG8gd29ybGQ='), 'hello world', 'ASCII');
  equal(Base64.decode64('aGVsbG8gd29ybGQ=\n'), 'hello world', 'ASCII with trailing newline');
  equal(Base64.decode64('  aGVsbG8gd29ybGQ= '), 'hello world', 'ASCII unstripped');
  equal(Base64.decode64('0L/RgNC40LLQtdGCINC80LjRgA=='), 'привет мир', 'Unicode');
  equal(Base64.decode64('0L/RgNC40LLQtdGCINC80LjRgA==\n'), 'привет мир', 'Unicode with trailing newline');
  equal(Base64.decode64('  0L/RgNC40LLQtdGCINC80LjRgA==   '), 'привет мир', 'Unicode unstripped');
});

test('Base64.encode64 ASCII', function(){
  equal(Base64.encode64('hello world'), 'aGVsbG8gd29ybGQ=', 'ASCII');
  equal(Base64.encode64('привет мир'), '0L/RgNC40LLQtdGCINC80LjRgA==', 'Unicode');
});