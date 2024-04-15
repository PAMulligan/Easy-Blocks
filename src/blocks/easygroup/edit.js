import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	JustifyContentControl,
} from "@wordpress/block-editor";
import { parseValue } from "../../utils/parseValue";
import "./editor.scss";

export default function Edit(props) {
	console.log({ props });
	const blockGap = parseValue(props.attributes.style?.spacing?.blockGap || "");
	const blockProps = useBlockProps({
		style: { gap: blockGap, justifyContent: props.attributes.justifyContent },
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [["easyblocks/easy-button", {}]],
		allowedBlocks: ["easyblocks/easy-button"],
	});
	return (
		<>
			<BlockControls>
				<JustifyContentControl
					value={props.attributes.justifyContent}
					allowedControls={["left", "center", "right", "space-between"]}
					onChange={(newValue) => {
						props.setAttributes({
							justifyContent: newValue,
						});
					}}
				/>
			</BlockControls>
			<div {...innerBlocksProps} />
		</>
	);
}
