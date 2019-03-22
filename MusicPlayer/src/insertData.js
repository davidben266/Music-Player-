
if (window.location.pathname == "/MusicPlayer/login.html") {
    console.log(window.location.pathname);
    const loginBtn = document.getElementById('login');
    const signupBtn = document.getElementById('signup');

    loginBtn.addEventListener('click', (e) => {
        let parent = e.target.parentNode.parentNode;
        Array.from(e.target.parentNode.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                parent.classList.add('slide-up')
            } else {
                signupBtn.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    });

    signupBtn.addEventListener('click', (e) => {
        let parent = e.target.parentNode;
        Array.from(e.target.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                parent.classList.add('slide-up')
            } else {
                loginBtn.parentNode.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    });
}



function createArtist(e) {
    e.preventDefault();

    let fetch = postRequest("#addArtistForm", `http://localhost/MusicPlayerServer/queries.php?exec=createartist`);

    fetch.then(function (response) {
        console.log(response);
        return response.json;
    })
        .then(function (response) {
            if (response) {

                let form = document.querySelector("#addArtistForm");
                let artistname = form.querySelector("input[name='artistname']");
                alert("El artista " + artistname.value + " se ha registrado correctamente");
                showArtistInformation("artistinfo");


            } else {
                alert("No se puede registrar el artista");
            }
        });
}
function createAlbum(e) {
    e.preventDefault();

    let fetch = postRequest("#addAlbumForm", `http://localhost/MusicPlayerServer/queries.php?exec=addalbum`);

    fetch.then((response) => {
        return response.json;
    })
        .then((response) => {
            if (response) {

                let form = document.querySelector("#addAlbumForm");
                let name = form.querySelector("input[name='name']");
                alert("El album " + name.value + " se ha registrado correctamente");
                let contentMedia = document.getElementById("content");

                let element = document.createElement("div");
                element.classList.add("item");
                let img = document.createElement("img");
                let data = {};
                data["name"] = name.value;

                console.log(data);
                var params = new FormData();
                for (const key in data) {
                    params.append(key, data[key]);
                }
                var config = {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: params
                };
                a(config, img, element, contentMedia);
                showInformation("albuminfo");

            } else {
                alert("No se puede registrar el album");
            }
        });
}

function a(config, img, element, contentMedia) {
    fetch(`http://localhost/MusicPlayerServer/queries.php?exec=selectbyalbumname`, config)
        .then(function (response) {
            //console.log(response.text());

            return response.json();
        })
        .then(function (response) {
            if (response) {
                img.src = response.cover;
                element.appendChild(img);
                contentMedia.appendChild(element);
            }
        });
}
function createPlayList(e) {
    e.preventDefault();

    let form = document.querySelector("#addPlayListForm");
    let inputs = form.querySelectorAll("input");
    let data = {};

    for (let i = 0; i < inputs.length; i++) {

        if (inputs[i].type == "text" || inputs[i].type == "date" || inputs[i].checked || inputs[i].type == "file" || inputs[i].type == "password") {
            data[inputs[i].name] = inputs[i].value;
        }

    }
    let userSelector = document.getElementById("userPicker");
    let userId = userSelector.options[userSelector.selectedIndex].value;

    data["owner"] = userId;
    console.log(data);

    var params = new FormData();
    for (const key in data) {
        params.append(key, data[key]);
    }

    var config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: params
    };

    fetch(`http://localhost/MusicPlayerServer/queries.php?exec=addplaylist`, config)
        .then(function (response) {
            return response.json;
        })
        .then(function (response) {
            if (response) {
                let form = document.querySelector("#addPlayListForm");
                let name = form.querySelector("input[name='name']");

                alert("La PlayList " + name.value + " se ha registrado correctamente");

                showPlayListInformation("playlistinfo");
            } else {
                alert("No se puede registrar la playList");
            }
        });
}
/*function createSong(e) {
    e.preventDefault();

    let form = document.querySelector("#addSongForm");
    let inputs = form.querySelectorAll("input");
    let data = {};

    for (let i = 0; i < inputs.length; i++) {

        if (inputs[i].type == "text" || inputs[i].type == "date" || inputs[i].checked || inputs[i].type == "file" || inputs[i].type == "password") {
            data[inputs[i].name] = inputs[i].value;
        }

    }
    console.log(data);

    /*const selectedFile = document.getElementById('songFile').files[0];
    const reader = new FileReader();
    data["file"] = reader.readAsBinaryString(selectedFile);

    var params = new FormData();
    for (const key in data) {
        params.append(key, data[key]);
    }

    var config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: params
    };

    fetch(`http://localhost/MusicPlayerServer/queries.php?exec=addsong`, config)
        .then(function (response) {
            return response.json;
        })
        .then(function (response) {
            if (response) {
                let form = document.querySelector("#addSongForm");
                let title = form.querySelector("input[name='title']");
                alert("La cancion " + title.value + " se ha registrado correctamente");
                showInformation("songinfo");
            } else {
                alert("No se puede registrar la cancion");
            }
        });
}*/
function doLogin(e) {
    e.preventDefault();
    let fetch = postRequest("#loginForm", `http://localhost/MusicPlayerServer/queries.php?exec=login`);

    fetch.then(function (response) {
        return response.json();
    })
        .then(function (response) {
            if (response.login) {
                alert(`Bienvenido`);
                let form = document.querySelector("#loginForm");
                let username = form.querySelector("input[name='username']");
                sessionStorage.setItem("username", username.value);
                window.location = "./index.html";
            } else {
                alert("Nombre de usuario o contraseña incorrecta");
            }
        });
}
function doSignUp(e) {
    e.preventDefault();

    let fetch = postRequest("#signUpForm", `http://localhost/MusicPlayerServer/queries.php?exec=signup`);

    fetch.then(function (response) {

        return response.json();
    })
        .then(function (response) {
            if (response) {
                alert(`Bienvenido`)
                let form = document.querySelector("#signUpForm");
                let username = form.querySelector("input[name='username']");
                sessionStorage.setItem("username", username.value);
                window.location = "./index.html";
            } else {
                alert("El sistema de registro esta petaqueado");
            }
        });
}
function addSongToPlayList(e) {
    e.preventDefault();

    let formPlayList = document.querySelector("#playListInfoForm");
    let data = {};

    let playListName = formPlayList.querySelector("input[name='playListName']");
    let songSelector = document.getElementById("songPicker");
    let songId = songSelector.options[songSelector.selectedIndex].value;

    data["playlists_id"] = playListName.placeholder;
    data["songs_id"] = songId;

    var params = new FormData();
    for (const key in data) {
        params.append(key, data[key]);
    }

    var config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: params
    };

    fetch('http://localhost/MusicPlayerServer/queries.php?exec=addsongstoplaylist', config)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            if (response) {
                let title = songSelector.options[songSelector.selectedIndex].text;

                let playListSongs = document.getElementById("playListSongs");
                if (playListSongs.value != "You don't have any song, add one!") {
                    playListSongs.value += title + "\n";
                }
                else {
                    playListSongs.value = title + "\n";
                }


                alert("La cancion " + title + " se ha agregado correctamente");

            } else {
                alert("No se puede agregar la cancion");
            }
        });
}
function createSongs() {
    selectorQueries("#songPicker", "addsongoptions");
}
function createUsers() {
    selectorQueries("#userPicker", "adduseroptions");
}
function selectorQueries(selectId, method) {
    var config = { method: 'GET', mode: 'cors' };

    fetch(`http://localhost/MusicPlayerServer/queries.php?exec=${method}`, config)
        .then(function (response) {
            return response.json();
        })
        .then(function (optionSelect) {
            let select = document.querySelector(selectId);
            optionSelect.forEach(result => {
                let option = document.createElement("option");
                option.value = result.id;

                option.innerHTML = (method == "addsongoptions") ? result.title : result.username;

                select.appendChild(option);
            });

        });

}
function showPlayListInformation(method) {

    let data = {};

    data["username"] = sessionStorage.username;

    var params = new FormData();
    for (const key in data) {
        params.append(key, data[key]);
    }

    var config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: params
    };

    fetch(`http://localhost/MusicPlayerServer/queries.php?exec=${method}`, config)
        .then(function (response) {
            return response.json();
        })
        .then(function (info) {
            if (document.getElementById("queryMedia") == null) {
                deletePlayList(method, info);
            }
            else {
                var container = document.getElementById("queryMedia");
                container.remove(container.selectedIndex);

                deletePlayList(method, info);
            }

        });
}
function deletePlayList(method, info) {
    let menu = document.querySelector(".mediaContent .menu");
    let queryMedia = document.createElement("div");

    queryMedia.id = "queryMedia";

    info.forEach(result => {

        let div = document.createElement("div");
        div.classList.add("item");

        div.onclick = function () {
            let playListMenu = document.getElementById("playListInfo");
            playListMenu.style.display = "block";



        }


        let image = document.createElement("img");
        image.src = "https://img.icons8.com/nolan/64/000000/menu-2.png"; 7
        image.id = result.id;


        image.onclick = (e) => { //Beginning
            let menu = document.getElementById("deleteMenu");
            menu.style.display = "block";
            menu.style.top = `${e.clientY + 15}px`;

            let deleteButton = menu.querySelector("#delete");
            let updateButton = menu.querySelector("#update");

            window.addEventListener('mouseup', function () {
                if (event.target != menu && event.target.parentNode != menu) {
                    menu.style.display = "none";
                }
            });


            deleteButton.onclick = function () {
                let menu = document.getElementById("deleteMenu");
                menu.style.display = "none";

                let data = {};

                data["id"] = image.id;

                var params = new FormData();
                for (const key in data) {
                    params.append(key, data[key]);
                }

                var config = {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: params
                };

                fetch(`http://localhost/MusicPlayerServer/queries.php?exec=deleteplaylist`, config)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (response) {
                        if (response) {
                            alert("It has been delete sucessfully!");
                            showPlayListInformation(method);
                        }
                        else {
                            alert("We can't delete it");
                        }

                    });
            };

            updateButton.onclick = function () {
                let menu = document.getElementById("deleteMenu");
                menu.style.display = "none";

                let id = {};

                id["id"] = image.id;

                if (method == "playlistinfo") {
                    updateQuery(id, "addPlayList", "addPlayListForm", "selectplaylist", "updateplaylist", "playlistinfo");
                }
            }

        } //End OnClick

        let playListName = document.createElement("div");
        playListName.classList.add("menuText");


        playListName.innerHTML = result.name;

        div.appendChild(playListName);
        div.appendChild(image);
        queryMedia.appendChild(div);

    });

    let button = document.getElementById("addButton");
    menu.insertBefore(queryMedia, button);
}

function showInformation(method) {
    var config = { method: 'GET', mode: 'cors' };

    fetch(`http://localhost/MusicPlayerServer/queries.php?exec=${method}`, config)
        .then(function (response) {            
            return response.json();
        })
        .then(function (info) {

            if (document.getElementById("queryMedia") == null) {

                crudMethod(method, info);
            }
            else if (document.getElementById("queryMedia") != null) {
                var container = document.getElementById("queryMedia");
                container.remove(container.selectedIndex);

                crudMethod(method, info);
            }           

        });
}

function displayInformation(){

    fetch(`http://localhost/MusicPlayerServer/queries.php?exec=${"displayinformation"}`, config)
    .then(function (response) {            
        return response.json();
    })
    .then(function (info) {

        if (document.getElementById("content") != null) {
            var container = document.getElementById("content");
           
            while(container.firstChild){
                container.removeChild(container.firstChild);
            }
            
            let addItem=document.createElement("div");
            addItem.classList.add("item");
            addItem.classList.add("add");
    
            let sym=document.createElement("i");
            sym.classList.add("fas");
            sym.classList.add("fa-plus-circle");
    
            addItem.appendChild(sym);
            container.appendChild(addItem);
    
            crudMethod("displayinformation", info);
        }
    });   
}

function postRequest(formSelector, url) {

    let form = document.querySelector(formSelector);
    let inputs = form.querySelectorAll("input");
    let data = {};

    for (let i = 0; i < inputs.length; i++) {

        if (inputs[i].type == "text" || inputs[i].type == "email" || inputs[i].type == "date" || inputs[i].checked || inputs[i].type == "file" || inputs[i].type == "password") {
            data[inputs[i].name] = inputs[i].value;
        }

    }


    var params = new FormData();
    for (const key in data) {
        params.append(key, data[key]);
    }

    var config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: params
    };

    return fetch(url, config);

}

function crudMethod(method, info) {
    let contentMedia = document.getElementById("content");


    if (method == "displayinformation") {

        fetch(`http://localhost/MusicPlayerServer/queries.php?exec=selectbyalbumname`, config)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                if (response) {
                    for (var i = 0; i < Object.keys(info).length; i++) {
                        let element = document.createElement("div");
                        element.classList.add("item");
                        let img = document.createElement("img");

                        img.src = response[i].cover;
                        element.appendChild(img);
                        contentMedia.appendChild(element);
                    }
                }
            });


    }


    let menu = document.querySelector(".mediaContent .menu");
    let queryMedia = document.createElement("div");

    queryMedia.id = "queryMedia";

    info.forEach(result => {

        let div = document.createElement("div");
        div.classList.add("item");

        let image = document.createElement("img");
        image.src = "https://img.icons8.com/nolan/64/000000/menu-2.png"; 7
        image.id = result.id;

        if (method == "songinfo") {
            div.onclick = function () {
                let data = {};

                data["id"] = image.id;

                var params = new FormData();
                for (const key in data) {
                    params.append(key, data[key]);
                }

                var config = {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: params
                };

                let selectMethod = "selectsong";
                fetch(`http://localhost/MusicPlayerServer/queries.php?exec=${selectMethod}`, config)
                    .then(function (response) {
                        //console.log(response.text());

                        return response.json();
                    })
                    .then(function (response) {
                        if (response) {
                            initMusicPlayer("Artist Name ", response.title, response.file);
                        }
                    });
            }
        }


        image.onclick = (e) => {
            let menu = document.getElementById("deleteMenu");
            menu.style.display = "block";
            menu.style.top = `${e.clientY + 15}px`;

            let deleteButton = menu.querySelector("#delete");
            let updateButton = menu.querySelector("#update");

            window.addEventListener('mouseup', function () {
                if (event.target != menu && event.target.parentNode != menu) {
                    menu.style.display = "none";
                }
            });

            deleteButton.onclick = function () {
                let menu = document.getElementById("deleteMenu");
                menu.style.display = "none";

                let data = {};

                data["id"] = image.id;

                var params = new FormData();
                for (const key in data) {
                    params.append(key, data[key]);
                }

                var config = {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: params
                };

                var exec;

                if (method == "songinfo") {
                    exec = "deletesong";
                }
                else if (method == "artistinfo") {
                    exec = "deleteartist";
                }
                else if (method == "albuminfo") {
                    exec = "deletealbum";
                }


                fetch(`http://localhost/MusicPlayerServer/queries.php?exec=${exec}`, config)
                    .then(function (response) {

                        return response.json();
                    })
                    .then(function (response) {
                        if (response) {
                            alert("It has been delete sucessfully!");
                            showInformation(method);
                        }
                        else {
                            alert("We can't delete it");
                        }

                    });
            };

            updateButton.onclick = function () {
                let menu = document.getElementById("deleteMenu");
                menu.style.display = "none";

                let id = {};

                id["id"] = image.id;

                if (method == "songinfo") {
                    updateQuery(id, "addSong", "addSongForm", "selectsong", "updatesong", "songinfo");
                }
                else if (method == "artistinfo") {
                    updateQuery(id, "addArtist", "addArtistForm", "selectartist", "updateartist", "artistinfo");
                }
                else if (method == "albuminfo") {
                    updateQuery(id, "addAlbum", "addAlbumForm", "selectalbum", "updatealbum", "albuminfo");
                }

            };

        }

        let playListName = document.createElement("div");
        playListName.classList.add("menuText");


        playListName.innerHTML = (method == "songinfo") ? result.title : result.name;

        div.appendChild(playListName);
        div.appendChild(image);
        queryMedia.appendChild(div);
    });

    let button = document.getElementById("addButton");
    menu.insertBefore(queryMedia, button);
}

function updateQuery(id, divSelector, formSelector, exec, method, infoMethod) {

    let form = document.getElementById(formSelector);
    document.getElementById(divSelector).style.display = "block";

    var selection = new FormData();
    for (const key in id) {
        console.log(key);
        selection.append(key, id[key]);
    }

    var config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: selection
    };

    fetch(`http://localhost/MusicPlayerServer/queries.php?exec=${exec}`, config)
        .then(function (response) {
            //console.log(response.text());          
            return response.json();
        })
        .then(function (response) {
            if (response) {

                let title = form.querySelector("p[name=FormTitle]");
                let titleVar = title.innerHTML;
                title.innerHTML = "Update Form";

                let inputsChanges = form.querySelectorAll("input");
                console.log(inputsChanges);
                for (let i = 0; i < inputsChanges.length; i++) {
                    console.log(response);
                    if (inputsChanges[i].type == "text" || inputsChanges[i].type == "date" || inputsChanges[i].checked || inputsChanges[i].type == "file") {
                        switch (inputsChanges[i].name) {
                            case "title":
                                inputsChanges[i].value = response.title;
                                break;
                            case "name":
                                inputsChanges[i].value = response.name;
                                break;
                            case "songsNumber":
                                inputsChanges[i].value = response.songsNumber;
                                break;
                            case "releaseDate":
                                inputsChanges[i].value = response.releaseDate;
                                break;
                            case "artistname":
                                inputsChanges[i].value = response.artistname;
                                break;
                            case "age":
                                inputsChanges[i].value = response.age;
                                break;
                            case "cover":
                                inputsChanges[i].value = response.cover;
                        }
                    }
                }
                if (formSelector == "addPlayListForm") {
                    let checkboxPub = form.querySelector("input[name=Public]");
                    let checkboxPriv = form.querySelector("input[name=Private]");
                    if (response.isPublic == "1") {
                        checkboxPub.checked = true;
                        checkboxPriv.checked = false;
                    }
                    else {
                        checkboxPriv.checked = true;
                        checkboxPub.checked = false;
                    }

                    let userSelector = document.getElementById("userPicker");

                    var opts = userSelector.options;
                    for (var opt, j = 0; opt = opts[j]; j++) {
                        if (opt.value == response.owner) {
                            userSelector.selectedIndex = j;
                            break;
                        }
                    }
                }

                let updateButton = form.querySelector("button[name=submitButton]");
                updateButton.type = "button"
                updateButton.innerHTML = "Update";
                updateButton.onclick = function () {

                    let inputs2 = form.querySelectorAll("input");
                    let data = {};
                    data["id"] = response.id;
                    for (let j = 0; j < inputs2.length; j++) {

                        if (inputs2[j].type == "text" || inputs2[j].type == "date" || inputs2[j].checked || inputs2[j].type == "file" || inputs2[j].type == "password") {
                            if (inputs2[j].name == "Private" || inputs2[j].name == "Public") {
                                data["isPublic"] = inputs2[j].value;
                            }
                            else {
                                data[inputs2[j].name] = inputs2[j].value;
                            }

                        }
                    }

                    if (formSelector == "addPlayListForm") {
                        let userSelector = document.getElementById("userPicker");
                        let userId = userSelector.options[userSelector.selectedIndex].value;
                        data["owner"] = userId;

                    }

                    console.log(data);

                    var params = new FormData();
                    for (const key in data) {
                        params.append(key, data[key]);
                    }

                    var config = {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: params
                    };


                    fetch(`http://localhost/MusicPlayerServer/queries.php?exec=${method}`, config)
                        .then(function (response) {
                            console.log(response.text());
                            return response.json;
                        })
                        .then(function (response) {
                            if (response) {
                                alert("Los datos han sido actualizados correctamente");
                                updateButton.type = "submit";
                                updateButton.innerHTML = "Add";
                                title.innerHTML = titleVar;

                                if (infoMethod == "playlistinfo") {
                                    showPlayListInformation(infoMethod);
                                    checkboxPub.checked = false;
                                    checkboxPriv.checked = false;
                                }
                                else {
                                    showInformation(infoMethod);
                                    displayInformation();
                                }

                            } else {
                                alert("No se puede actualizar los datos");
                            }
                        });
                }

            }
        });
}