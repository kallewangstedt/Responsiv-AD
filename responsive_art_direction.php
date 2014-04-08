<?php

function responsive_art_direction(){
	global $post;

	$spinner = 'src="'.get_bloginfo("stylesheet_directory") . "/global/images/spinner.gif".'"';

	return preg_replace('#(<img.+?)(src="[^"]*")(.*?/?>)#i', '$1data-default-$2 '.$spinner.' $3', $post->post_content);
}
add_filter("the_content", "responsive_art_direction");


?>
