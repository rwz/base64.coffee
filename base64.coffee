@Base64 = (->
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  fromCharCode = String.fromCharCode
  invalidCharacters = /[^A-Za-z0-9\+\/\=]/g
  max = Math.max
  INVALID_CHARACTER_ERR = (->
    try
      document.createElement '$'
    catch error
      error
  )()


  encode = @btoa || (input) ->
    output = ''
    i = 0

    while i < input.length

      chr1 = input.charCodeAt(i++) || 0
      chr2 = input.charCodeAt(i++) || 0
      chr3 = input.charCodeAt(i++) || 0

      if max(chr1, chr2, chr3) > 0xFF
        throw INVALID_CHARACTER_ERR

      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63

      if isNaN chr2
        enc3 = enc4 = 64
      else if isNaN chr3
        enc4 = 64

      for char in [ enc1, enc2, enc3, enc4 ]
        output += characters.charAt(char)

    output

  decode = @atob || (input) ->
    output = ''
    i = 0
    length = input.length

    if length % 4 != 0
      throw INVALID_CHARACTER_ERR

    while i < length

      enc1 = characters.indexOf input.charAt(i++)
      enc2 = characters.indexOf input.charAt(i++)
      enc3 = characters.indexOf input.charAt(i++)
      enc4 = characters.indexOf input.charAt(i++)

      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4

      output += fromCharCode(chr1)

      if enc3 != 64
        output += fromCharCode(chr2)
      if enc4 != 64
        output += fromCharCode(chr3)
    output

  decode: (input) ->
    result = decode(input.replace(invalidCharacters, ''))
    Unicode.pack(result)

  encode: (input) -> encode(Unicode.unpack input)

)()