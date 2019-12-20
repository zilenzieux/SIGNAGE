<?php
/**
 * Plugin Name: Signage_ITKMITL
 * Author:      ITKMITL
 * Version:     0.0.1
 * Description: Create Slide
 **/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs duting pluginactivation
 */
function activator()
{
  require_once plugin_dir_path( __FILE__ ) . 'includes/Activator.php';
	Activator::activate();
}
register_activation_hook(__FILE__, 'activator');

/**
 * the code that runs during plugin deactivation
 */
function deactivator()
{
  require_once plugin_dir_path( __FILE__ ) . 'includes/Deactivator.php';
	Deactivator::deactivate();
}
register_deactivation_hook(__FILE__, 'Deactivator');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/Core_Signage.php';

function run_signage() {
  define ("SIGNAGE_PLUGIN_PATH", plugin_dir_path( __FILE__ ) );
  define ("SIGNAGE_PLUGIN_URL", plugins_url (  ) );
  define ("SIGNAGE_PLUGIN_VERSION",  "1.0" );
  Core_Signage::init();
}

run_signage();
