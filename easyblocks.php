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

namespace EasyDoesIt;

if (!defined('ABSPATH')) {
	die('Silence is golden.');
}

final class EasyBlocks 
{
    static function init()
    {
        add_action('enqueue_block_assets', function () {
            wp_enqueue_style('dashicons');
            $style_url = plugins_url("build/style-index.css", __FILE__);
			wp_enqueue_style('easyblocks-style', $style_url, array());
        });
        add_action('init', function() {
            add_filter('block_categories_all', function($categories) {
                array_unshift($categories, [
                    'slug' => 'easyblocks',
                    'title' => 'Easy Blocks'
                ]);    
                return $categories;
            });
            register_block_type( __DIR__ . '/build/blocks/easycurve' );
            register_block_type( __DIR__ . '/build/blocks/easygroup');
            register_block_type( __DIR__ . '/build/blocks/easybutton');
            register_block_type( __DIR__ . '/build/blocks/easygallery');
            register_block_type( __DIR__ . '/build/blocks/easyimage');
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