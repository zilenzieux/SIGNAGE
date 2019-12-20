<?php

class Admin{

  static function init() {
    /* Test_Admin */
	add_action( 'admin_menu', array( __CLASS__, 'admin_menu' ) );
	
	/* Add_Meta_Box_Content */
	add_action( 'add_meta_boxes', array( 'Setup_Content', 'add_content_meta_box' ) );  // array( ' Class ', ' function ' )

	/* Add_CSS_Style & JS_Script */
	add_action( 'admin_enqueue_scripts', array( __CLASS__, 'custom_pugin_assets' ) );

  }

  static function admin_menu() {
		add_menu_page(
			( 'IT Signage' ),
			( 'IT Signage' ),
			'edit_posts',
			'signage',
			array(),
			'dashicons-filter',
			25
		);
	}

	static function custom_pugin_assets(){
    //css and js files
    wp_enqueue_style(
    "MYCSS",
    SIGNAGE_PLUGIN_URL. "/Testing4/assets/mystyle.css",
    ' ',
    SIGNAGE_PLUGIN_VERSION,
    true
    );

    wp_enqueue_script(
    "MYJS",
    SIGNAGE_PLUGIN_URL. "/Testing4/assets/myscript.js",
    ' ',
    SIGNAGE_PLUGIN_VERSION,
    true
    );
	}

}