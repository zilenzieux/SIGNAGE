<?php

class Setup_Layout{
  static function register_post_types() {

	register_post_type( 'Layout',
			array(
				'labels' => array(
					'name' => ( 'Layout' ),
					'singular_name' => ( 'Layout' ),
					'add_new' =>  ( 'Add Layout'),
					'new_item' => ( 'New Layout' ),
					'view_item' => ( 'View Layout' ),
					'add_new_item' => ( 'Add New Layout' ),
					'edit_item' => ( 'Edit Layout' ),
					'not_found' => ( 'Not found Layout' ),
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
