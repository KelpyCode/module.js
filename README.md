# module.js
A lightweight clientside module system for the browser

## How to use it
First, you have to load `module.js`.
Simply do that by putting a `script` tag in the head. Best is to put it as far to the top as possible.
```html
<html>
    <head>
    <script src="/path/to/module.js"></script>
    </head>
    <body>
    ...
    </body>
</html>
```
Now you've implemented `module.js` into your website!

Now you can use it in your scripts.
Below `<script src="/path/to/module.js"></script>` add the path to your script(s)

```html
<head>
    <script src="/path/to/module.js"></script>
    
    <script src="/path/to/myscript.js"></script>
    <script src="/path/to/mymodule.js"></script>
</head>
```

For example, in `myscript.js` you put:
```js
    Module("/path/to/mymodule.js", function(mymodule){ // Load the module at "/path/to/mymodule.js"
        mymodule.hi(mymodule.test); // Exported variable mymodule is being used
        // At fist "I am being loaded!" will be printer, after that
        // "Hello!" will be printed in the console
        
    })
```

And inside the module file `mymodule.js`:
```js
    define(function(){
        var out = {test: "Hello!", hi: console.log};
        console.log("I am being loaded!");
        return out;
    });
```

## Loading multiple modules

That is easy.
```html
<head>
    <script src="/path/to/module.js"></script>
    
    <script src="/path/to/myscript.js"></script>
    <script src="/path/to/logger.js"></script>
    <script src="/path/to/chat.js"></script>
    <script src="/path/to/navbar.js"></script>
</head>
```

Simply pass an array instead of an string into the Module function
`myscript.js`:
```js
    Module(["/path/to/logger", "/path/to/chat", "/path/to/navbar" ], function(logger, chat, navbar){ 
        logger("Log stuff");
        chat.init();
        navbar.doSomething();
    })
```

## Shortening flowork
You probably want to keep you script as small as possible.
You dont always want to type the `long/ass/path/toYourScript.js`.

Easy fix!
```js
Module.config({
    "vendor": "/js/vendor",
    "js": "/js",
    "crypt": "/js/lib/crypto"
});
```

Now we can use `@vendor:someHandler` which gets replaced to `/js/vendor/someHandler.js`.
```js
Module.config({
    "vendor": "/js/vendor",
    "js": "/js",
    "crypt": "/js/lib/crypto"
});
Module(["@vendor:someHandler", "@js:minifier", "@crypt:md5" ], function(someHandler, minifier, md5Hasher){ 
    /*
        ...
    */
})
```

Also note: if no extension is given in the path, the path will be extended with `.js`.

## What about recursion?
_(recursion as in module1 requires module2 and module2 requires module1)_

Yes sorry, I haven't fixed that yet

