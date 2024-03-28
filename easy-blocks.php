<?php
/**
 * Plugin Name:       Easy Blocks
 * Description:       Easy design customizations for Gutenberg sites.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.1
 * Author:            Paul Mulliganiel
 * Author URI: 		  https://www.github.com/PAMulligan
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       easy-blocks
 *
 * @package           easy-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function easy_blocks_block_init() {
	register_block_type( __DIR__ . '/build/blocks/postCarousel' );
}
add_action( 'init', 'easy_blocks_block_init' );
