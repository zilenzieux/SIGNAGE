<?php

class Setup_Playlist{
  static function register_post_types() {

	register_post_type( 'Playlist',
			array(
				'labels' => array(
					'name' => ( 'Playlist' ),
					'singular_name' => ( 'Playlist' ),
					'add_new' =>  ( 'Add Playlist'),
					'new_item' => ( 'New Playlist' ),
					'view_item' => ( 'View Playlist' ),
					'add_new_item' => ( 'Add New Playlist' ),
					'edit_item' => ( 'Edit Playlist' ),
					'not_found' => ( 'Not found Playlist' ),
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
