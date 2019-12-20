<?php

class Activator
{

    public static function activate() {
        // Re-build rewrite rules, including those for our custom post types
        flush_rewrite_rules();
    }
       
}