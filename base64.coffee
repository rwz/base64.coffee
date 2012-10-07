###
 * base64.coffee, v1.0
 * https://github.com/rwz/base64.coffee
 *
 * Copyright 2012 Pavel Pravosud
 * Licensed under the MIT license.
 * http://opensource.org/licenses/mit-license
 *
 * References: http://en.wikipedia.org/wiki/Base64
 *
 * Date: Sat Jan 7 17:30:44 ICT 2012
###

fromCharCode = String.fromCharCode
CHARACTERS ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
INVALID_CHARACTERS = /[^a-z\d\+\=\/]/ig
CHARMAP = {}
CHARMAP[char] = i for char, i in CHARACTERS.split('')

class InvalidSequenceError extends Error
  name: 'InvalidSequence'
  constructor: (char) ->
    if char
      @message = """"#{char}" is an invalid Base64 character"""
    else
      @message = 'Invalid bytes sequence'

encode = @btoa ?= (input) ->
  output = ''
  i = 0

  while i < input.length

    chr1 = input.charCodeAt(i++)
    chr2 = input.charCodeAt(i++)
    chr3 = input.charCodeAt(i++)

    if invalidChar = Math.max(chr1, chr2, chr3) > 0xFF
      throw new InvalidSequenceError(invalidChar)

    enc1 = chr1 >> 2
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    enc4 = chr3 & 63

    if isNaN(chr2)
      enc3 = enc4 = 64
    else if isNaN(chr3)
      enc4 = 64

    for char in [ enc1, enc2, enc3, enc4 ]
      output += CHARACTERS.charAt(char)

  output

decode = @atob ?= (input) ->
  output = ''
  i = 0
  length = input.length

  throw new InvalidSequenceError if length % 4

  while i < length

    enc1 = CHARMAP[input.charAt(i++)]
    enc2 = CHARMAP[input.charAt(i++)]
    enc3 = CHARMAP[input.charAt(i++)]
    enc4 = CHARMAP[input.charAt(i++)]

    chr1 = (enc1 << 2) | (enc2 >> 4)
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
    chr3 = ((enc3 & 3) << 6) | enc4

    output += fromCharCode(chr1)

    if enc3 != 64
      output += fromCharCode(chr2)

    if enc4 != 64
      output += fromCharCode(chr3)

  output

unpack = (utfstring) ->
  utfstring = utfstring.replace(/\r\n/g, '\n')
  string = ''

  for i in [0 .. utfstring.length-1]
    c = utfstring.charCodeAt(i)

    if c < 128
      string += fromCharCode(c)
    else if c > 127 and c < 2048
      string += fromCharCode((c >> 6) | 192)
      string += fromCharCode((c & 63) | 128)
    else
      string += fromCharCode((c >> 12) | 224)
      string += fromCharCode(((c >> 6) & 63) | 128)
      string += fromCharCode((c & 63) | 128)

  string

pack = (string) ->
  utfstring = ''
  i = c = c1 = c2 = 0

  while i < string.length

    c = string.charCodeAt(i)

    if c < 128
      utfstring += fromCharCode(c)
      i++
    else if (c > 191) && (c < 224)
      c2 = string.charCodeAt(i+1)
      utfstring += fromCharCode(((c & 31) << 6) | (c2 & 63))
      i += 2
    else
      c2 = string.charCodeAt(i+1)
      c3 = string.charCodeAt(i+2)
      utfstring += fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
      i += 3

  utfstring

@Base64 =
  encode64: (str) -> encode(unpack(str))
  decode64: (str) -> pack(decode(str.replace(INVALID_CHARACTERS, '')))