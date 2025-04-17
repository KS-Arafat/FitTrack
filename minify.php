<?php
function minify_html($buffer)
{
    return preg_replace(
        ['/>\s+/s', '/\s+</s', '/\s+/s'],
        ['>', '<', ' '],
        $buffer
    );
}
ob_start("minify_html");

?>