<?php

require_once './headers.php';
require_once 'libs/Pabhoz/MySQLiManager/MySQLiManager.php';

$db = new MySQLiManager('localhost','root','','AplicacionSuperCool');

if(isset($_GET["exec"])){
	if($_GET["exec"] != null && $_GET["exec"] != ""){
			switch ($_GET["exec"]){
				case "addsong":
					insertRow("songs");
                break;
                case "login":
					login();
                break;
                case "signup":
                    insertRow("users");
                break;
				case "addplaylist":
					insertRow("playlists");
                break;
				case "createartist":
					insertRow("artists");
                break;
				case "addalbum":
					insertRow("albums");
                break;
				case "addsongstoplaylist":
					playlistsHasSongs();
                break;
				case "addsongoptions":
					addSongOptions();
				break;
				case "adduseroptions":
					addUserOptions();
				break;
				case "playlistinfo":
					playListInfo("playlists");
					break;
				case "artistinfo":
					showInfo("artists");
					break;
				case "songinfo":
					showInfo("songs");
					break;
				case "albuminfo":
					showInfo("albums");
					break;
				case "deletesong":
					deleteQuery("songs");
					break;
				case "deletealbum":
					deleteQuery("albums");
					break;
				case "deleteartist":
					deleteQuery("artists");
					break;
				case "deleteplaylist":
					deleteQuery("playlists");
					break;
				case "selectsong":
					select("songs");
					break;
				case "selectartist":
					select("artists");
					break;
				case "selectalbum":
					select("albums");
					break;
				case "selectplaylist":
					select("playlists");
					break;
				case "updatesong":
					updateQuery("songs");
					break;
				case "updateartist":
					updateQuery("artists");
					break;
				case "updatealbum":
					updateQuery("albums");
					break;
				case "updateplaylist":
					updateQuery("playlists");
					break;
				case "selectbyalbumname":
					selectByName("albums");
					break;
				case "displayinformation":
					selectByName("albums");
			}
		}else{
			die("La función <b>".$_GET['exec']."</b> no existe");
		}
}

function login(){
    global $db;

    if (!isset($_POST["username"])) die("Username must be provided");

    $where = (isset($_POST["username"])) ? "username = '$_POST[username]'" : "";
    $fetch = $db->select("*","users",$where);
    $fetch = ($fetch == NULL) ? [] : $fetch;
    $response = ($fetch[0]["password"] == $_POST["password"]) ? 1 : 0;

    print json_encode(["login"=> $response]);
}

function insertRow($table){
global $db;

    $data = $_POST;
    $data["id"] = "";
    $fetch = $db->insert($table,$data);
	print json_encode($fetch);
}

function playlistsHasSongs(){
	global $db;
    $data = $_POST;
   
	$where =  (isset($_POST["playlists_id"]))? "name= '".$_POST["playlists_id"]."'" : "";
	$id= $db->select("id","playlists",$where);
   	$data["playlists_id"]=$id[0]["id"];
    $fetch = $db->insert("playlists_has_songs",$data);
	
    print json_encode($fetch);
}

function addSongOptions(){
		global $db;
		$fetch=$db->select("title,id","songs");
	    $fetch = ($fetch == NULL) ? [] : $fetch;

		print json_encode($fetch);		
}

function addUserOptions(){
	global $db;
	$fetch=$db->select("username,id","users");
	$fetch = ($fetch == NULL) ? [] : $fetch;

	print json_encode($fetch);		
}

function playListInfo($table){
	global $db;
	$data = $_POST;

	$where = (isset($_POST["username"]))? "username= '".$_POST["username"]."'" : "";
	$id=$db->select("id,username","users",$where);
	
	$data["username"]=$id[0]["id"];
	
	$where = (isset($data["username"]))? "owner= '".$data["username"]."'" : "";

	$fetch=$db->select("id,name",$table,$where);
	$fetch = ($fetch == NULL) ? [] : $fetch; 
	
	print json_encode($fetch);		
}

function showInfo($table){
	global $db;
	$data = $_POST;
	
	if($table=="songs"){
		$fetch=$db->select("id,title",$table);		
		$fetch = ($fetch == NULL) ? [] : $fetch; 
	}
	else{
		$fetch=$db->select("id,name",$table);		
		$fetch = ($fetch == NULL) ? [] : $fetch; 
	}
	
	
	print json_encode($fetch);		
}

function select($table){
	global $db;
	$data = $_POST;

	$where=(isset($data["id"]))? "id= '".$data["id"]."'": "";	

	if($table=="songs"){
		$fetch=$db->select("id,title,duration,format,file",$table,$where);		
	}
	else if($table=="albums"){
		$fetch=$db->select("*",$table,$where);		
	}
	else if($table=="artists"){
		$fetch=$db->select("id,name,artistname,age",$table,$where);		
	}
	else if($table=="playlists"){
		$fetch=$db->select("id,name,owner,isPublic",$table,$where);		
	}
	
	$fetch = ($fetch == NULL) ? [] : $fetch; 

	print json_encode($fetch[0]);	
}

function deleteQuery($table){
	global $db;
	$data = $_POST;

	$fetch=$db->delete($table,$data,$complex=false);

	print json_encode($fetch);		
}

function updateQuery($table){
	global $db;
	$data = $_POST;

	$where=(isset($data["id"]))? "id= '".$data["id"]."'": "";

	$fetch=$db->update($table,$data,$where);
    
	print json_encode($fetch);	
}

function selectByName($table){
	global $db;
	$data = $_POST;

	if($table=="songs"){
		$where=(isset($data["title"]))? "title= '".$data["title"]."'": "";
		$fetch=$db->select("id,title,cover",$table,$where);
	}
	else{
		$where=(isset($data["name"]))? "name= '".$data["name"]."'": "";
		$fetch=$db->select("id,name,cover",$table,$where);
	}
	
    
	print json_encode($fetch);	
}

