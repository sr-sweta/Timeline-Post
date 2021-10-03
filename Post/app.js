const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
var image = document.querySelector('.myImage');
const add = document.querySelector('.add');

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}


// window.fbAsyncInit = function() {
//     FB.init({
//         appId: '{your-app-id}',
//         cookie: true,
//         xfbml: true,
//         version: '{api-version}'
//     });

//     FB.AppEvents.logPageView();

// };

// (function(d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) { return; }
//     js = d.createElement(s);
//     js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

if (window.localStorage.getItem("todos") == undefined) {
    var todos = [];
    window.localStorage.setItem("todos", JSON.stringify(todos));
}

var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);


class item {
    constructor(name) {
        this.createItem(name);
    }
    createItem(name) {
        var itemBox = document.createElement('div');
        itemBox.classList.add('item');

        var input = document.createElement('textarea');
        input.disabled = true;
        input.value = name;
        input.classList.add('item_input');
        input.classList.add('size');

        // var photo = document.createElement('img');
        // input.disabled = true;
        // input.

        var line = document.createElement('br');
        var edit = document.createElement('button');
        edit.classList.add('edit');
        edit.innerHTML = "EDIT";
        edit.addEventListener('click', () => this.edit(input, name, edit));

        var remove = document.createElement('button');
        remove.classList.add('remove');
        remove.innerHTML = "REMOVE";
        remove.addEventListener('click', () => this.remove(itemBox, name));

        container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(line);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);

    }

    edit(input, name, edit) {
        if (input.disabled == true) {
            edit.innerHTML = 'SAVE'
            input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem("todos", JSON.stringify(todos));
        } else {
            input.disabled = !input.disabled;
            edit.innerHTML = 'EDIT';
        }
    }

    remove(itemBox, name) {
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
}

add.addEventListener('click', check);
// window.addEventListener('keydown', (e) => {
// 	if(e.which == 13){
// 		check();
// 	}
// })

function check() {
    if (inputValue.value != "") {
        console.log(inputValue.value);
        new item(inputValue.value);
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        inputValue.value = "";
    }
}


for (var v = 0; v < todos.length; v++) {
    new item(todos[v]);
}