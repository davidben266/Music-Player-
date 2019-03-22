var isLoaded = false;
var elementosMultimedia = [];

var user = {
    id: null,
    email: null,
    username: null,
    playlist: []
}
var server = `http://localhost/MusicPlayerServer/queries.php?exec=`;
//Session handling
if (typeof (Storage) !== "undefined") {
    user.username = sessionStorage.getItem("username");
    if (user.username == null) { window.location = "login.html"; }

    //consultamos la información del usuario
    var config = { method: 'GET', mode: 'cors' };

    /*fetch(`${server}getMyInfo&username=${user.username}`, config)
        .then(function (response) {
            response.json().then(function (u) {
                user = u;
                initSongs();
                initPlaylists();
            })
        });*/

} else {
    alert('Su navegador no soporta almacenamiento local.')
}

window.onload = () => {
    createSongs();
    createUsers();

    document.querySelector("#controls .user").innerHTML = user.username.charAt(0).toUpperCase();

    let items = document.querySelectorAll(".mainLeftBar .item");
    let menu = document.querySelector(".mediaContent .menu");
    items.forEach(item => {
        item.onclick = function () {
            let old = document.querySelector(".hover");
            if (old) { old.classList.remove("hover"); }
            if (!this.classList.contains("hover")) {
                this.classList.add("hover");
            }

            let title = document.querySelector("#mediaPlayer .menu .title");
            title.innerHTML = this.dataset.title;

            let addButton = document.createElement("div");
            addButton.classList.add("item");
            addButton.id = "addButton";
            let image = document.createElement("img");
            image.src = "https://img.icons8.com/nolan/64/000000/plus.png";

            addButton.appendChild(image);
            let text = document.createElement("div");
            text.classList.add("menuText");

            switch (this.dataset.title) {
                case "My Songs":
                    if (document.getElementById("addButton") == null) {
                        text.innerHTML = "Add Song";
                    }
                    else {
                        var button = document.getElementById("addButton");
                        button.remove(button.selectedIndex);
                        text.innerHTML = "Add Song";
                    }
                    addButton.appendChild(text);
                    addButton.onclick = function () {
                        document.getElementById("addSong").style.display = "block";
                    }

                    menu.appendChild(addButton);
                    break;
                case "My Artists":
                    if (document.getElementById("addButton") == null) {
                        text.innerHTML = "Add Artist";

                    }
                    else {
                        var button = document.getElementById("addButton");
                        button.remove(button.selectedIndex);
                        text.innerHTML = "Add Artist";
                    }
                    addButton.appendChild(text);
                    addButton.onclick = function () {
                        document.getElementById("addArtist").style.display = "block";
                    }
                    menu.appendChild(addButton);
                    break;
                case "My Albums":
                    if (document.getElementById("addButton") == null) {
                        text.innerHTML = "Add Album";
                    }
                    else {
                        var button = document.getElementById("addButton");
                        button.remove(button.selectedIndex);
                        text.innerHTML = "Add Album";
                    }
                    addButton.appendChild(text);
                    addButton.onclick = function () {
                        document.getElementById("addAlbum").style.display = "block";
                    }
                    menu.appendChild(addButton);
                    break;
                case "My Playlists":
                    if (document.getElementById("addButton") == null) {
                        text.innerHTML = "Add Playlist";
                    }
                    else {
                        var button = document.getElementById("addButton");
                        button.remove(button.selectedIndex);
                        text.innerHTML = "Add Playlist";
                    }
                    addButton.appendChild(text);
                    addButton.onclick = function () {
                        document.getElementById("addPlayList").style.display = "block";
                    }
                    menu.appendChild(addButton);
                    break;
            }


            if (old == this || old == null) {
                menu.style.marginLeft = (menu.style.marginLeft != "0px") ? "0px" : `-${menu.clientWidth}px`;
            }
            switch (this.dataset.title) {
                case "My Artists":
                    showInformation("artistinfo");
                    break;
                case "My Playlists":
                    showPlayListInformation("playlistinfo");
                    break;
                case "My Songs":
                    showInformation("songinfo");
                    break;
                case "My Albums":
                    showInformation("albuminfo");
                    break;            
                                    
            }
        }
    });
    displayInformation();
    initMusicPlayer("Katy Perry", "365", "assets/songs/Bola Rebola.mp3");

    let fileLoader = document.getElementById("songFile");
    fileLoader.onchange = function(e){
        console.dir(this);
        for (let i = 0; i < this.files.length; i++) {
            let me = new MultimediaElement(this.files[i]);
            me.loadFileContent().then((r)=>{
                isLoaded = true;                
            });
            elementosMultimedia[i] = me;
        }
    }

}

let flag = 0;
let newMusicplayer;

function initMusicPlayer(artistName, name, songPath) {

    if (flag == 0) {
        newMusicplayer = new musicPlayer(artistName, name, songPath);
        flag = 1;
    }
    else {
        newMusicplayer.player.pause();
        newMusicplayer.player.src = songPath;
        newMusicplayer.player.play();
    }


}

function songData(){
    let form = document.querySelector("#addSongForm");

    let data = {
        id: null,
        title: form.querySelector("#songTitle").value,
        duration: elementosMultimedia[0].DOMElement.duration,
        format: elementosMultimedia[0].file.type,
        file: elementosMultimedia[0].data
    }
    console.log(data);

    var params = new FormData();
	for (const key in data) {
		params.append(key,data[key]);
	}

	var config = { 
		method: 'POST', 
		mode: 'cors',
		headers: {
			'Access-Control-Allow-Origin':'*'
		},
		body: params
    };

    fetch(`http://localhost/MusicPlayerServer/queries.php?exec=addsong`, config)
        .then(function (response) {
            console.log(response.text());
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

}