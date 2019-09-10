## NBCUX Labs Portfolio site 😇

This portfolio is built with Angular.js and gulp based off the Google Web starter kit. Current portfolio is in the v3 folder. 

### Commands

Installing the app
```npm install```

Running the app for development
```gulp serve```

Building the app
```gulp```

To test the built version
```gulp serve:dist```


Javascript is being minified when you build the application. You will need to add any new scripts into the minification process in ```gulpfile.babel.js``` under the ```scripts``` task.

### Adding a new page

1. Add your new html under the ```views``` folder.

2. Add a new state to ```app.js```

3. Add it to the site navigation under ```nav.html```

4. If your'd like to link to it on the home page add a partial under the ```partials/home``` folder. Include that partial in the ```views/home.html```