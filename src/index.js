import {
	registerFormatType,
	applyFormat,
	removeFormat,
} from "@wordpress/rich-text";
import { __ } from "@wordpress/i18n";
import { RichTextToolbarButton, ColorPalette } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import { Popover, PanelBody } from "@wordpress/components";
import halfHighlightIcon from "./assets/low-highlight.svg";
import halfHighlightActive from "./assets/low-highlight-active.svg";
import "./style.scss";

registerFormatType("easyblocks/half-highlight", {
	title: __("Half highlight", "easyblocks"),
	tagName: "span",
	className: "easyblocks-half-highlight",
	edit: ({ onChange, value, contentRef, isActive }) => {
		const [showColors, setShowColors] = useState(false);
		const halfHighlight = value.activeFormats?.find(
			(format) => format.type === "easyblocks/half-highlight"
		);
		const attributes = {
			...(halfHighlight?.attributes || {}),
			...(halfHighlight?.unregisteredAttributes || {}),
		};
		console.log({ halfHighlight });
		return (
			<>
				<RichTextToolbarButton
					icon={
						<img
							height={24}
							width={24}
							src={isActive ? halfHighlightActive : halfHighlightIcon}
						/>
					}
					title={__("Half highlight", "easyblocks")}
					onClick={() => {
						setShowColors(true);
					}}
				/>
				{!!showColors && (
					<Popover
						anchor={contentRef?.current}
						onClose={() => {
							setShowColors(false);
						}}
					>
						<PanelBody>
							<ColorPalette
								value={attributes?.["data-color"]}
								onChange={(newValue) => {
									if (newValue) {
										onChange(
											applyFormat(value, {
												type: "easyblocks/half-highlight",
												attributes: {
													"data-color": newValue,
													style: `background-image: linear-gradient(to right, ${newValue}, ${newValue})`,
												},
											})
										);
									} else {
										onChange(
											removeFormat(value, "easyblocks/half-highlight")
										);
									}
								}}
							/>
						</PanelBody>
					</Popover>
				)}
			</>
		);
	},
});
