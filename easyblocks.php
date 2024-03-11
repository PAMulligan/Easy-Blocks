<?php
/**
 * Plugin Name:       Easy Blocks
 * Description:       Custom blocks created for the Easy Does It theme, but usable in any Gutenberg theme.
 * Requires at least: 6.1
 * Requires PHP:      8.0
 * Version:           1.0.0
 * Author:            Paul Mulliganiel
 * AuthorURI:		  https://github.com/PAMulligan
 * Text Domain:       easyblocks
 *
 * @package           create-block
 */

namespace EasyDoesIt;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

final class EasyBlocks
{
	static function init()
	{
		add_action( 'enqueue_block_assets', function() {
			$style_url = plugins_url('build/style-index.css', __FILE__);
			wp_enqueue_style('easyblocks-style', $style_url, array());
		});
		add_action( 'init', function() {
			$script_url = plugins_url('build/index.js', __FILE__);
			wp_enqueue_script("easyblocks-index", $script_url, array('wp-blocks', 'wp-element', 'wp-editor'));
		});
	}

	static function convert_custom_properties($value)
	{
		$prefix     = 'var:';
		$prefix_len = strlen($prefix);
		$token_in   = '|';
		$token_out  = '--';
		if (str_starts_with($value, $prefix)) {
			$unwrapped_name = str_replace(
				$token_in,
				$token_out,
				substr($value, $prefix_len)
			);
			$value          = "var(--wp--$unwrapped_name)";
		}
	
		return $value;
	}
}

EasyBlocks::init();