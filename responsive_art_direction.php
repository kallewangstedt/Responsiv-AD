<?php
/*
Lägg följande kod i functions.php eller gör en 
require_once("responsive_art_direction.php");
*/

function responsive_art_direction(){
	global $post;

	$spinner = 'src="' . get_bloginfo("stylesheet_directory") . "/spinner.gif" . '"';

	return preg_replace('#(<img.+?)(src="[^"]*")(.*?/?>)#i', '$1data-default-$2 ' . $spinner . ' $3', $post->post_content);
}
add_filter("the_content", "responsive_art_direction", 9);


?>
