base64.coffee
==================================

This library has dual purpose:
 - provide atob/btoa polyfill for browsers which do not support it natively (IEs)
 - provide a wrapper to make Base64 encoding/decoding available for non-ASCII unicode strings

Usage
-----

    Base64.encode64('hello world') # => 'aGVsbG8gd29ybGQ='
    Base64.decode64('aGVsbG8gd29ybGQ=') # => 'hello world'
    Base64.encode('привет мир') # => '0L/RgNC40LLQtdGCINC80LjRgOCAgA=='
    Base64.decode('0L/RgNC40LLQtdGCINC80LjRgOCAgA==') # => 'привет мир'