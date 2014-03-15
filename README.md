rework-plugin-mixin
====================

[![Build Status](https://travis-ci.org/reworkcss/rework-plugin-mixin.png)](https://travis-ci.org/reworkcss/rework-plugin-mixin)

mixin() plugin for rework, formerly included in core

Add user-defined mixins, functions that are invoked for a given property, and
passed the value. Returning an object that represents one or more properties.

For example the following `overflow` mixin allows the designer
to utilize `overflow: ellipsis;` to automatically assign associated
properties preventing wrapping etc.

The receiver (`this`) is the `Rework` instance, allowing the mixin to reference
properties such as the vendor `.prefixes` array.

```js
var css = rework(css)
  .use(rework.mixin({ overflow: ellipsis }))
  .toString()

function ellipsis(type) {
  if ('ellipsis' == type) {
    return {
      'white-space': 'nowrap',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    }
  }

  return type;
}
```

  Mixins in use look just like regular CSS properties:

```css

h1 {
  overflow: ellipsis;
}
```

yields:

```css
h1 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
```

  You may also return array values to expand to several definitions of the property:

```
function display(type) {
  if ('flex' == type) {
    return {
      display: [
        '-webkit-flex',
        '-moz-flex',
        '-webkit-flexbox',
        'flex'
      ]
    }
  }

  return {
    display: type
  }
}
```

  Would yield:

```css
.myclass {
  display: -webkit-flex;
  display: -moz-flex;
  display: -webkit-flexbox;
  display: flex;
}
```
