<?php
include("RecursiveMenu.php");

// setup database connection
$db = new PDO("mysql:dbname=test;host=localhost", "test", "test");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// build and render menu
$menu = new RecursiveMenu($db);
$menu->assembleMenu()->render();
