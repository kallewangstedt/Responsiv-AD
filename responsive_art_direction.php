<?php
/*
Lägg följande kod i functions.php eller gör en 
require_once("responsive_art_direction.php");
*/

function responsive_art_direction($content){

	$spinner = 'src="' . get_bloginfo("stylesheet_directory") . "/global/images/spinner.gif" . '"';

	$img = preg_replace('#(<img.*?)(src="[^"]*")(.*?/?>)#i', '$1data-default-$2 ' . $spinner . '$3', $content);
	$img = preg_replace('#(<img(.*?))(width="[^"]*"){1}(.*?/?>)#i', '$1data-default-$3$4', $img);
	$img = preg_replace('#(<img(.*?))(height="[^"]*"){1}(.*?/?>)#i', '$1data-default-$3$4', $img);
	$img = preg_replace('/[ ]{2,}/i', ' ', $img);

	return $img;
}
add_filter("the_content", "responsive_art_direction");


?>
