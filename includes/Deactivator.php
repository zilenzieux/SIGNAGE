<?php

class Deactivator
{

    public static function deactivate() {
        // Re-build rewrite rules, including those for our custom post types
        flush_rewrite_rules();
    }
     
}