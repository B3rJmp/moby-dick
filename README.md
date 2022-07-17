# All Moby Dick Projects

### Vanilla JS

Here's a simple JavaScript file that will run with node.js. All there is to do is to type `node read-file.js` and it will spit out the sorted words. I didn't spend a whole lot of time with UI on this one, I more just wanted to get the functionality down before moving into Vue

### Vue.js

Type the commands
```
cd moby-dick-vue
npm install
npm run serve
```

Once that's finished, you can go to the url, and it will load all the words in when the app is mounted.

##### Notes

I actually had to revisit this one a few times since the original way I was running the script took very long to run. Now I've got it down to around a second.

### PHP

I started this project up using WAMP, since it's pretty painless in terms of serving up PHP applications. There's nothing too special about it, it just runs the script on the backend before the page loads, and imports the data dynamically into the HTML.

Whatever you use to serve it, your URL will look something like `http://localhost/moby-dick/moby-dick-php/public/index.php`

### Python

I didn't spend a lot of time trying to implement this into a HTML file, but I did make it look nice (in my opinion) in the command line.

To run this, type the following commands:
```
cd moby-dick-python
python read-file.py
```

As long as you have python installed, it should run fine.

### Laravel

Technically just PHP again, but there's a lot more to it. If you have composer installed, and PHP is in your PATH variable, you should be able to run these commands:

```
cd moby-dick-laravel
composer install
php artisan serve
```

This will likely serve the app on `http://localhost:8000`

This doubles as an API endpoint for `moby-dick-vue-api`

### Vue + Laravel

This utilizes Laravel as a RESTful API, so you'll need to make sure to serve `moby-dick-vue-api` and `moby-dick-laravel` at the same time.

In one window of your terminal run these commands:
```
cd moby-dick-laravel
php artisan serve
```
and in another window run these commands:
```
cd moby-dick-vue-api
npm install
npm run serve
```

As long as the Laravel app is on localhost:8000 the api should run fine.