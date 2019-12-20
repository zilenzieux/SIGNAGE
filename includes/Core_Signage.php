<?php

class Core_Signage{

static function init() {

  self::load_dependencies();

  }

private static function load_dependencies() {

		/* Admin */
		require_once SIGNAGE_PLUGIN_PATH . 'includes/admin.php';
    Admin::init();
    
    /* Setup Channel*/
    require_once SIGNAGE_PLUGIN_PATH . 'includes/Setup_1Channel.php';
    Setup_Channel::register_post_types();

    /* Setup Layout*/
    require_once SIGNAGE_PLUGIN_PATH . 'includes/Setup_2Layout.php';
    Setup_Layout::register_post_types();

    /* Setup Playlist*/
    require_once SIGNAGE_PLUGIN_PATH . 'includes/Setup_3Playlist.php';
    Setup_Playlist::register_post_types();

    /* Setup Content*/
    require_once SIGNAGE_PLUGIN_PATH . 'includes/Setup_4Content.php';
    Setup_Content::register_post_types();

  }
		
}
