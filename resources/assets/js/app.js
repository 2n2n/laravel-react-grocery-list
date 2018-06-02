
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');


import axios from "axios";

class Task {
    constructor(description, priority) {
        this.description = description;
        this.priority = priority || 'high';
    }

    show() { 
        console.log(this.description, ' ', this.priority);
    }
}

axios.get('/api/user').then(data => console.log(data)).catch(e => console.log(e));
new Task('make a todo list').show()

