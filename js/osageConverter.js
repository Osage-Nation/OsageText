var macron = "\u0304";
var combiningDotAboveRight = "\u0358";
var osageCaseOffset = 40;  // Amount to add to get lower case from upper.

// TODO 13-Dec-2016:
// 1. Simplify lower/upper conversion using the offset above.
// 2. Create a Python transliteration.
// 3. Simplify the regular expressions. Mostly done 13-Dec.

var osage_private_use_map = {
  '\uf020': ' ',
  '\uf021': '!',
  '\uf022': [String.fromCodePoint(0x104c7), String.fromCodePoint(0x104ef)],
  '\uf023': '#',
  '\uf024': '$',
  '\uf025': '%',
  '\uf026': '&',
  '\uf027': "\'",
  '\uf028': '(',
  '\uf029': ')',
  '\uf02a': '*',
  '\uf02b': '+',
  '\uf02c': [String.fromCodePoint(0x104ba), String.fromCodePoint(0x104e2)],
  '\uf02d': '-',
  '\uf02e': '.',
  '\uf02f': [String.fromCodePoint(0x104be), String.fromCodePoint(0x104e6)],
  '\uf030': '0',
  '\uf031': '1',
  '\uf032': '2',
  '\uf033': '3',
  '\uf034': '4',
  '\uf035': '5',
  '\uf036': '6',
  '\uf037': '7',
  '\uf038': '8',
  '\uf039': '9',
  '\uf03a': ':',
  '\uf03b': [' ', ' '],  // Character is no longer used.
  '\uf03c': '<',
  '\uf03d': '=',
  '\uf03e': '>',
  '\uf03f': [String.fromCodePoint(0x104be), String.fromCodePoint(0x104e6)],
  '\uf040': '@',
  '\uf041\uf041': [String.fromCodePoint(0x104b0)+macron, String.fromCodePoint(0x104d8)+macron],
  '\uf041': [String.fromCodePoint(0x104b0), String.fromCodePoint(0x104d8)],
  '\uf041^': [String.fromCodePoint(0x104b0)+combiningDotAboveRight,
     String.fromCodePoint(0x104d8)+combiningDotAboveRight],
  '\uf041\uf05e': [String.fromCodePoint(0x104b0)+combiningDotAboveRight,
     String.fromCodePoint(0x104d8)+combiningDotAboveRight],  '\uf042': [String.fromCodePoint(0x104b4), String.fromCodePoint(0x104dc)],
  '\uf043': [String.fromCodePoint(0x104b5), String.fromCodePoint(0x104dd)],
  '\uf044': [String.fromCodePoint(0x104c8), String.fromCodePoint(0x104f0)],
  '\uf045\uf045': [String.fromCodePoint(0x104b7)+macron, String.fromCodePoint(0x104df)+macron],
  '\uf045': [String.fromCodePoint(0x104b7), String.fromCodePoint(0x104df)],
  '\uf045^': [String.fromCodePoint(0x104b7)+combiningDotAboveRight,
     String.fromCodePoint(0x104df)+combiningDotAboveRight],
  '\uf045\uf05e': [String.fromCodePoint(0x104b7)+combiningDotAboveRight,
     String.fromCodePoint(0x104df)+combiningDotAboveRight],
  '\uf048': [String.fromCodePoint(0x104b9), String.fromCodePoint(0x104e1)],
  // The eh-consonants
  '\uf048\uf043': [String.fromCodePoint(0x104b6), String.fromCodePoint(0x104de)],
  '\uf048\uf04b': [String.fromCodePoint(0x104bd), String.fromCodePoint(0x104e5)],
  '\uf048\uf050': [String.fromCodePoint(0x104c5), String.fromCodePoint(0x104ed)],
  '\uf048\uf044': [String.fromCodePoint(0x104c9), String.fromCodePoint(0x104f1)],
  '\uf048\uf05d': [String.fromCodePoint(0x104cb), String.fromCodePoint(0x104f3)],
  
  '\uf049': [String.fromCodePoint(0x104b1), String.fromCodePoint(0x104d9)],
  '\uf04a': [String.fromCodePoint(0x104b3), String.fromCodePoint(0x104db)],
  '\uf04b': [String.fromCodePoint(0x104bc), String.fromCodePoint(0x104e4)],
  '\uf04c': [String.fromCodePoint(0x104bf), String.fromCodePoint(0x104e7)],
  '\uf04d': [String.fromCodePoint(0x104c0), String.fromCodePoint(0x104e8)],
  '\uf04e': [String.fromCodePoint(0x104c1), String.fromCodePoint(0x104e9)],
  '\uf04f\uf04f': [String.fromCodePoint(0x104c2)+macron, String.fromCodePoint(0x104ea)+macron],
  '\uf04f': [String.fromCodePoint(0x104c2), String.fromCodePoint(0x104ea)],
  '\uf04f^': [String.fromCodePoint(0x104c2)+combiningDotAboveRight,
    String.fromCodePoint(0x104ea)+combiningDotAboveRight],
  '\uf04f\uf05e': [String.fromCodePoint(0x104c2)+combiningDotAboveRight,
    String.fromCodePoint(0x104ea)+combiningDotAboveRight],
  '\uf050': [String.fromCodePoint(0x104c4), String.fromCodePoint(0x104ec)],
  '\uf053': [String.fromCodePoint(0x104c6), String.fromCodePoint(0x104ee)],
  '\uf054': [String.fromCodePoint(0x104cd), String.fromCodePoint(0x104f5)],
  '\uf055\uf055': [String.fromCodePoint(0x104ce)+macron, String.fromCodePoint(0x104f6)+macron],
  '\uf055': [String.fromCodePoint(0x104ce), String.fromCodePoint(0x104f6)],
  '\uf055^': [String.fromCodePoint(0x104ce)+combiningDotAboveRight,
    String.fromCodePoint(0x104f6)+combiningDotAboveRight],
  '\uf055\uf05e': [String.fromCodePoint(0x104ce)+combiningDotAboveRight,
    String.fromCodePoint(0x104f6)+combiningDotAboveRight],
  '\uf056': [String.fromCodePoint(0x104c7), String.fromCodePoint(0x104ef)],
  '\uf057': [String.fromCodePoint(0x104cf), String.fromCodePoint(0x104f7)],
  '\uf058': [String.fromCodePoint(0x104d0), String.fromCodePoint(0x104f8)],
  '\uf059\uf059': [String.fromCodePoint(0x104bb)+macron, String.fromCodePoint(0x104e3)+macron],
  '\uf059': [String.fromCodePoint(0x104bb), String.fromCodePoint(0x104e3)],
  '\uf059^': [String.fromCodePoint(0x104bb)+combiningDotAboveRight,
    String.fromCodePoint(0x104e3)+combiningDotAboveRight],
  '\uf059\uf05e': [String.fromCodePoint(0x104bb)+combiningDotAboveRight,
    String.fromCodePoint(0x104e3)+combiningDotAboveRight],
  '\uf05a': [String.fromCodePoint(0x104d2), String.fromCodePoint(0x104fa)],  // ??
  '\uf05b': [String.fromCodePoint(0x104d3), String.fromCodePoint(0x104fb)],  // ??
  '\uf05c': [' ', ' '],  // Character is no longer used.
  '\uf05d': [String.fromCodePoint(0x104ca), String.fromCodePoint(0x104f2)],  // ??],
  '\uf05e': '^',
  '\uf05f': '_',
  '\uf060': '`',
  '\uf061': [String.fromCodePoint(0x104b2), String.fromCodePoint(0x104da)],  // ??
  '\uf065': [String.fromCodePoint(0x104b8), String.fromCodePoint(0x104e0)],  // ??
  '\uf06f': [String.fromCodePoint(0x104c3), String.fromCodePoint(0x104eb)],  // ??
  '\uf07b': '{',
  '\uf07c': '|',
  '\uf07d': '}',
  '\uf07e': '~',
  '\uf0b6': '\u00b6',
};

// Handles upper case, too.
var osage_latin_to_unicode_map = {
  // 'a': [String.fromCodePoint(0x104d8), '\uf041'],
  'a': [String.fromCodePoint(0x104b2), '\uf061'],
  'aa': [String.fromCodePoint(0x104d8)+macron, '\uf041\uf041'], // Macron
  'a\'': [String.fromCodePoint(0x104d9), '\uf049'],
  'an': [String.fromCodePoint(0x104da), '\uf061'],
  'ah': [String.fromCodePoint(0x104db), '\uf04a'],
  'a^': [String.fromCodePoint(0x104d8)+combiningDotAboveRight, '\uf04a^'],
  'b':  [String.fromCodePoint(0x104dc), '\uf042'],
  'br': [String.fromCodePoint(0x104dc), '\uf042'],
  'hc': [String.fromCodePoint(0x104de), '\uf043'],
  'c':  [String.fromCodePoint(0x104dd), '\uf043'],
  'ch': [String.fromCodePoint(0x104de), '\uf043'],
  'd':  [String.fromCodePoint(0x104f0), '\uf044'],
  // 'e':  [String.fromCodePoint(0x104df), '\uf045'],
  'e':  [String.fromCodePoint(0x104b8), '\uf065'],
  'e^':  [String.fromCodePoint(0x104df)+combiningDotAboveRight, '\uf065^'],
  'ee': [String.fromCodePoint(0x104df)+macron, '\uf045\uf045'], // Macron
  'en': [String.fromCodePoint(0x104e0), '\uf065'],
  'g':  [String.fromCodePoint(0x104f9), '\uf059'],
  'h':  [String.fromCodePoint(0x104e1), '\uf048'],
  'hy': [String.fromCodePoint(0x104e2), '\uf02c'],
  'i':  [String.fromCodePoint(0x104e3), '\uf059'],
  'ii': [String.fromCodePoint(0x104e3)+macron, '\uf059\uf059'], // Macron
  'j':  [String.fromCodePoint(0x104db), '\uf04a'],
  'k':  [String.fromCodePoint(0x104e4), '\uf04b'],
  'hk': [String.fromCodePoint(0x104e5), '\uf048\uf04b'],
  'ky': [String.fromCodePoint(0x104e6), '\uf048\uf03f'],
  'l':  [String.fromCodePoint(0x104e7), '\uf04c'],
  'm':  [String.fromCodePoint(0x104f8), '\uf04d'],
  'n':  [String.fromCodePoint(0x104e9), '\uf04e'],
  // 'o':  [String.fromCodePoint(0x104ea), '\uf04f'],
  'o': [String.fromCodePoint(0x104c3), '\uf06f'],
  'o^': [String.fromCodePoint(0x104ea)+combiningDotAboveRight, '\uf06f^'],
  'oo': [String.fromCodePoint(0x104ea)+macron, '\uf04f\uf04f'], // Macron
  'on': [String.fromCodePoint(0x104eb), '\uf06f'],
  'p':  [String.fromCodePoint(0x104ec), '\uf050'],
  'hp': [String.fromCodePoint(0x104ed), '\uf048\uf04b'],
  's':  [String.fromCodePoint(0x104ee), '\uf053'],
  'sh': [String.fromCodePoint(0x104ef), '\uf022'],
  't':  [String.fromCodePoint(0x104f5), '\uf054'],
  'ht': [String.fromCodePoint(0x104f1), '\uf048\uf04b'],
  'ts': [String.fromCodePoint(0x104f2), '\uf05d'],
  'hts': [String.fromCodePoint(0x104f3), '\uf054'],
  'tsh': [String.fromCodePoint(0x104f4), '\uf054'],
  'u':  [String.fromCodePoint(0x104f6), '\uf055'],
  'u^': [String.fromCodePoint(0x104f6)+combiningDotAboveRight, '\uf055^'],
  'uu': [String.fromCodePoint(0x104f6)+macron, '\uf055\uf055'], // Macron
  'v':  [String.fromCodePoint(0x104ef), '\uf056'],
  'w':  [String.fromCodePoint(0x104f7), '\uf057'],
  'x':  [String.fromCodePoint(0x104f8), '\uf058'],
  'y':  [String.fromCodePoint(0x104e3), '\uf05a'],
  'y^':  [String.fromCodePoint(0x104e3)+combiningDotAboveRight, '\uf05a^'],
  'z':  [String.fromCodePoint(0x104fa), '\uf05a'],
  'zh': [String.fromCodePoint(0x104fb), '\uf05b'],
  // Upper case input.
  'A': [String.fromCodePoint(0x104b0), '\uf041'],
  'A^': [String.fromCodePoint(0x104b0)+combiningDotAboveRight, '\uf041^'],
  'Aa': [String.fromCodePoint(0x104b0)+macron, '\uf041\uf041'], // Macron
  'AA': [String.fromCodePoint(0x104b0)+macron, '\uf041\uf041'], // Macron
  'A\'': [String.fromCodePoint(0x104b1), '\uf049'],
  'An': [String.fromCodePoint(0x104b2), '\uf061'],
  'An': [String.fromCodePoint(0x104b2), '\uf061'],
  'AN': [String.fromCodePoint(0x104b2), '\uf061'],
  'Ah': [String.fromCodePoint(0x104b3), '\uf04a'],
  'AH': [String.fromCodePoint(0x104b3), '\uf04a'],
  'B':  [String.fromCodePoint(0x104b4), '\uf042'],
  'Br': [String.fromCodePoint(0x104b4), '\uf042'],
  'BR': [String.fromCodePoint(0x104b4), '\uf042'],
  'Hc':[String.fromCodePoint(0x104b6), '\uf043'],
  'HC':[String.fromCodePoint(0x104b6), '\uf043'],
  'C':  [String.fromCodePoint(0x104b5), '\uf043'],
  'Ch': [String.fromCodePoint(0x104b6), '\uf043'],
  'CH': [String.fromCodePoint(0x104b6), '\uf043'],
  'D':  [String.fromCodePoint(0x104c8), '\uf044'],
  'E':  [String.fromCodePoint(0x104b7), '\uf045'],
  'E^':  [String.fromCodePoint(0x104b7)+combiningDotAboveRight, '\uf045^'],
  'Ee': [String.fromCodePoint(0x104b7)+macron, '\uf045\uf045'], // Macron
  'EE': [String.fromCodePoint(0x104b7)+macron, '\uf045\uf045'], // Macron
  'En': [String.fromCodePoint(0x104b8), '\uf065'],
  'EN': [String.fromCodePoint(0x104b8), '\uf065'],
  'G':  [String.fromCodePoint(0x104d1), '\uf059'],
  'H':  [String.fromCodePoint(0x104b9), '\uf048'],
  'HY': [String.fromCodePoint(0x104ba), '\uf02c'],
  'I':  [String.fromCodePoint(0x104b1), '\uf059'],
//  'I':  [String.fromCodePoint(0x104bb), '\uf059'],
  'Ii': [String.fromCodePoint(0x104bb)+macron, '\uf059\uf059'], // Macron
  'II': [String.fromCodePoint(0x104bb)+macron, '\uf059\uf059'], // Macron
  'J':  [String.fromCodePoint(0x104b3), '\uf04a'],
  'K':  [String.fromCodePoint(0x104bc), '\uf04b'],
  'Hk': [String.fromCodePoint(0x104bd), '\uf048\uf04b'],
  'HK': [String.fromCodePoint(0x104bd), '\uf048\uf04b'],
  'Ky': [String.fromCodePoint(0x104be), '\uf048\uf03f'],
  'KY': [String.fromCodePoint(0x104be), '\uf048\uf03f'],
  'L':  [String.fromCodePoint(0x104bf), '\uf04c'],
  'M':  [String.fromCodePoint(0x104c0), '\uf04d'],
  'N':  [String.fromCodePoint(0x104c1), '\uf04e'],
  'O':  [String.fromCodePoint(0x104c2), '\uf04f'],
  'O^':  [String.fromCodePoint(0x104c2)+combiningDotAboveRight, '\uf04f^'],
  'Oo': [String.fromCodePoint(0x104c2)+macron, '\uf04f\uf04f'], // Macron
  'OO': [String.fromCodePoint(0x104c2)+macron, '\uf04f\uf04f'], // Macron
  'On': [String.fromCodePoint(0x104c3), '\uf06f'],
  'ON': [String.fromCodePoint(0x104c3), '\uf06f'],
  'P':  [String.fromCodePoint(0x104c4), '\uf050'],
  'Hp': [String.fromCodePoint(0x104c5), '\uf048\uf04b'],
  'HP': [String.fromCodePoint(0x104c5), '\uf048\uf04b'],
  'S':  [String.fromCodePoint(0x104c6), '\uf053'],
  'Sh': [String.fromCodePoint(0x104c7), '\uf022'],
  'SH': [String.fromCodePoint(0x104c7), '\uf022'],
  'T':  [String.fromCodePoint(0x104cd), '\uf054'],
//  'T':  [String.fromCodePoint(0x104c8), '\uf044'],
  'Ht': [String.fromCodePoint(0x104c9), '\uf048\uf04b'],
  'HT': [String.fromCodePoint(0x104c9), '\uf048\uf04b'],
  'Ts': [String.fromCodePoint(0x104ca), '\uf05d'],
  'TS': [String.fromCodePoint(0x104ca), '\uf05d'],
  'Hts': [String.fromCodePoint(0x104cb), '\uf054'],
  'HTs': [String.fromCodePoint(0x104cb), '\uf054'],
  'HTS': [String.fromCodePoint(0x104cb), '\uf054'],
  'Tsh': [String.fromCodePoint(0x104cc), '\uf054'],
  'TSh': [String.fromCodePoint(0x104cc), '\uf054'],
  'TSH': [String.fromCodePoint(0x104cc), '\uf054'],
  'U':  [String.fromCodePoint(0x104ce), '\uf055'],
  'U^':  [String.fromCodePoint(0x104ce)+combiningDotAboveRight, '\uf055^'],
  'Uu': [String.fromCodePoint(0x104ce)+macron, '\uf055\uf055'], // Macron
  'UU': [String.fromCodePoint(0x104ce)+macron, '\uf055\uf055'], // Macron
  'V':  [String.fromCodePoint(0x104c7), '\uf056'],
  'W':  [String.fromCodePoint(0x104cf), '\uf057'],
  'X':  [String.fromCodePoint(0x104d0), '\uf058'],
  'Y':  [String.fromCodePoint(0x104bb), '\uf05a'],
  'Y^':  [String.fromCodePoint(0x104bb)+combiningDotAboveRight, '\uf05a^'],
  'Z':  [String.fromCodePoint(0x104d2), '\uf05a'],
  'Zh': [String.fromCodePoint(0x104d3), '\uf05b'],  
  'ZH': [String.fromCodePoint(0x104d3), '\uf05b'],  
  ';':  [" ", '\uf03b'],
  ',':  [String.fromCodePoint(0x104b9), '\uf02c'],
  '\[': [String.fromCodePoint(0x104d3), '\uf05b'],
  '{': [String.fromCodePoint(0x104d3), '\uf05b'],
  '\]': [String.fromCodePoint(0x104cb), '\uf05d'],
  '}': [String.fromCodePoint(0x104cb), '\uf05d'],
  '\/': [String.fromCodePoint(0x104be), '\uf03f'],
  '|': [" ", '\uf05c'],
  '\\': [" ", '\uf05c'],
  '\"': [String.fromCodePoint(0x104be), '\uf056'],
  // TODO: Finish these.
}

var full_map = osage_private_use_map;

var minOsageU = String.fromCodePoint(0x104b0);
var maxOsageU = String.fromCodePoint(0x104d8);
var lowerCaseOffset = 0x28;
var oldOsageDot = '\uf02e';

// Converts from old Osage codepoints to Unicode Standard.
// Converts to lower case if the flag is set.
// Converts Latin characters if flag is set.
// Converts Osage period 0xf02e to empty character if set.
// TODO: Convert to UTF-16.
function oldOsageToUnicode(textIn, convertToLower, convertLatin, clearOsageDot) {
  var convertResult = "";
  var index;
  var outputIsUTF16 = true;

  var parsedInput = preParseOldOsage(textIn);
  if (!parsedInput) {
    return "";
  }
  for (index = 0; index < parsedInput.length; index ++) {
    var c = parsedInput[index];
    if (c == oldOsageDot && clearOsageDot) {
      continue;
    }
    var result = osage_private_use_map[c];
    if (result) {
      if (Array.isArray(result)) {
        if (convertToLower) {
          out = result[1];  // The lower case.
        } else {
          out = result[0];  // Upper case.
        }
      } else {
        out = result;  // Only a single character.
      }
    } else {
      // It's not in the map.
      if (convertLatin) {
        result = osage_latin_to_unicode_map[c];
      }
      if (result == null) {
        out = c;
      } else {
        out = result[0];
      }
    }
    convertResult += out;
  }
  if (outputIsUTF16) {
    var convertResultUTF16 = "";
    var u16list = [];
    for (var i = 0; i < convertResult.length; i++) {
      var cp = convertResult.codePointAt(i);
      var utf16Result = getUnicodeCharacter(cp);
      if (typeof utf16Result === 'string') {
        var len16 = utf16Result.length;
          for (var j = 0; j < len16; j ++) {
            var charCode = utf16Result.codePointAt(j);
          }
      }
      u16list.push(utf16Result);
    }
    return u16list.join("");
  } else {
    return convertResult;
  }
}

// Converts from old Osage codepoints to Unicode Standard.
// Converts to lower case if the flag is set.
// TODO: Convert to UTF-16.
function latinToUnicode(textIn, convertToLower) {
  var convertResult = "";
  var index;
  var outputIsUTF16 = true;

  var parsedInput = preParseLatin(textIn);
  if (!parsedInput) {
    return "";
  }
  for (index = 0; index < parsedInput.length; index ++) {
    var c = parsedInput[index];
    if (convertToLower) {
      c = c.toLowerCase();
    }
    var result = osage_latin_to_unicode_map[c];
    if (result) {
      if (Array.isArray(result)) {
        out = result[0];  // Upper case.
      } else {
        out = result;  // Only a single character.
      }
    } else {
      // It's not in the map.
      out = c;
    }
    convertResult += out;
  }
  if (outputIsUTF16) {
    var convertResultUTF16 = "";
    var u16list = [];
    for (var i = 0; i < convertResult.length; i++) {
      var cp = convertResult.codePointAt(i);
      var utf16Result = getUnicodeCharacter(cp);
      if (typeof utf16Result === 'string') {
        var len16 = utf16Result.length;
          for (var j = 0; j < len16; j ++) {
            var charCode = utf16Result.codePointAt(j);
          }
      }
      u16list.push(utf16Result);
    }
    return u16list.join("");
  } else {
    return convertResult;
  }
}

// Converts from old Osage codepoints to Unicode Standard.
// Converts to lower case if the flag is set.
// TODO: Convert to UTF-16.
function latinToOldOsage(textIn, convertToLower) {
  var convertResult = "";
  var index;
  var outputIsUTF16 = true;
  var out;

  var parsedInput = preParseLatin(textIn);
  if (!parsedInput) {
    return "";
  }

  for (index = 0; index < parsedInput.length; index ++) {
    var c = parsedInput[index].toLowerCase();
    var result = osage_latin_to_unicode_map[c];
    if (result) {
      if (Array.isArray(result)) {
          out = result[1];
      } else {
        out = result;  // Only a single character.
      }
    } else {
      // It's not in the map.
      out = c;
    }
    convertResult += out;
  }
  if (outputIsUTF16) {
    var convertResultUTF16 = "";
    var u16list = [];
    for (var i = 0; i < convertResult.length; i++) {
      var cp = convertResult.codePointAt(i);
      var utf16Result = getUnicodeCharacter(cp);
      if (typeof utf16Result === 'string') {
        var len16 = utf16Result.length;
          for (var j = 0; j < len16; j ++) {
            var charCode = utf16Result.codePointAt(j);
          }
      }
      u16list.push(utf16Result);
    }
    return u16list.join("");
  } else {
    return convertResult;
  }
}

// Parsing of Latin combinations.
// vowel + ^, double vowels, dotted, pre-aspirated, single letters, non-letters
var osage_latin_chars =
  "[aeouy][\\^\f05e]|aa|ee|ii|oo|uu|yy|a\'|ts\'|ah|[aeo]n|br|[cs]h|hch|hts|h[ckpty]|iu|ky|tsh|t[hst]|zh|[a-eg-pst-z]|['|\\/\;,]|\\|/|6|\;|,|\\S|\\s";

// Use regular expression to greedily process input string, producing list of strings
// to be converted. E.g., 'htathanh' should give {"ht", "a", "th", "n", "h"}
function preParseLatin(instring) {
  var regex1 = new RegExp(osage_latin_chars, "gi");
  var outList = instring.match(regex1);
  return outList;
}

// For converting input to sets of connected characters.
// Vowels + ^, double vowels, pre-aspirated consonants, single characters.
var old_osage_chars =
  "[\uf041\uf045\uf04f\uf055\uf059][\\^\uf05e]|\uf041\uf041|\uf045\uf045|\uf04f\uf04f|\uf055\uf055|\uf048[\uf043\uf04b\uf050\uf044\uf05d]|[\uf021-\uf045\uf048-\uf061\uf065\uf06f\uf07b-\uf07e\uf0b6]|";

function preParseOldOsage(instring) {
  var combined_chars = old_osage_chars + osage_latin_chars;
  var regex2 = new RegExp(combined_chars, "gi");
  var outList = instring.match(regex2);
  return outList;
}
