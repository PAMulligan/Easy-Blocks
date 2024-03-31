<?php
/**
 * Plugin Name:         Easy Blocks
 * Description:         Custom blocks for my portfolio
 * Requires at least:   6.1
 * Requires PHP:        7.0
 * Version:             1.1.1
 * Author:              Paul Mulliganiel
 * Author URI:          https://github.com/PAMulligan
 * Text Domain:         easyblocks
 * 
 * @package             create-block
 */

if (!defined('ABSPATH')) {
	die('Silence is golden.');
}

function easy_blocks_init() {
    register_block_type( __DIR__ . '/build/blocks/easycurve' );
}
add_action('init', 'easy_blocks_init');