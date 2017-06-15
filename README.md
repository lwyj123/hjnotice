# hjnotice
a light web notice component(no dependencies)

## Install
```html
<link rel="stylesheet" href="hjnotice.css">
<!-- -->
<script src="hjnotice.js"></script>

```

## Usage
### hjnotice.success(options[, callback]);

`options` a Object for options or just a message string.

The first argument can be either a string(message) or an options object. The only required option is message; all others are optional.

- `message` - the string you wanna show.
- `duration` - notice hide after `duration` mileseconds. if duration not set or set 0, the notice will not hide automatically
- `position` - set the notice's position, you can set position to `top`, `right`, 'bottom', 'left'. the default is `right`

`callback` a callback function running when trigger DOMNodeRemoved(removed)  

### hjnotice.info(options[, callback]);

same as success, but the style is for info

### hjnotice.error(options[, callback]);

same as success, but the style is for error

### hjnotice.warnning(options[, callback]);

same as success, but the style is for warnning

## Example

```js
hjnotice.success({message:'A success message', duration:0, position: 'bottom'});
```