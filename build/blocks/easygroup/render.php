<?

use EasyDoesIt\EasyBlocks;

$block_gap = EasyBlocks::convert_custom_properties($attributes['style']['spacing']['blockGap'] ?? 0);
$block_wrapper_attributes = get_block_wrapper_attributes([
  'style' => 'gap: ' . $block_gap . '; justify-content: ' . $attributes['justifyContent']
]);
?>
<div <? echo $block_wrapper_attributes; ?>>
  <? echo $content; ?>
</div>