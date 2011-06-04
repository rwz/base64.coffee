CoffeeScript Base64 implementation
==================================

Usage
-----

    Base64.encode('hello world') # -> 'aGVsbG8gd29ybGQ='
    Base64.decode('aGVsbG8gd29ybGQ=') # -> 'hello world'


But wait, there is more
-----------------------
Also supports unicode strings. Oh wow!

    Base64.encode('привет мир') # -> '0L/RgNC40LLQtdGCINC80LjRgOCAgA=='
    Base64.decode('0L/RgNC40LLQtdGCINC80LjRgOCAgA==') # -> 'привет мир'