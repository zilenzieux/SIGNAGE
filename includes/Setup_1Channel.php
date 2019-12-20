<?php

class Setup_Channel{
  static function register_post_types() {

    register_post_type( 'Channel',
			array(
				'labels' => array(
					'name' => ( 'Channel' ),
					'singular_name' => ( 'Channel' ),
					'add_new' =>  ( 'Add Channel'),
					'new_item' => ( 'New Channel' ),
					'view_item' => ( 'View Channel' ),
					'add_new_item' => ( 'Add New Channel' ),
					'edit_item' => ( 'Edit Channel' ),
					'not_found' => ( 'Not found Channel' ),
				),
				  'public' => true,
				  'has_archive' => false,
				  'show_in_menu' => 'signage',
				  'show_in_admin_bar' => true,
	  			  'supports' => array( 'title' ),
				  'taxonomies' => array(),
				  'rewrite' => false,
			)
	);

	}
}
