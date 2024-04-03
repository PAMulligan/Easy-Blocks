import {
	useBlockProps,
	BlockControls,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarButton, Icon } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import { useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import "./editor.scss";
import { ImageThumbnail } from "../../components/imageThumbnail";

export default function Edit(props) {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: "easy-gallery-inner-blocks",
		},
		{
			allowedBlocks: ["easyblocks/easy-image"],
		}
	);
	const [editMode, setEditMode] = useState(true);
	const innerBlocks = useSelect(
		(select) => {
			const { getBlocksByClientId } = select("core/block-editor");
			const block = getBlocksByClientId(props.clientId)?.[0];
			return block?.innerBlocks;
		},
		[props.clientId]
	);
	const previewModeImage = useState({
		imageId: innerBlocks?.[0]?.attributes?.imageId,
		blockId: innerBlocks?.[0]?.clientId,
	});

	return (
		<>
			<div {...blockProps}>
				{!!editMode && (
					<div className="edit-mode">
						<span className="easy-label">
							{__("Easy Image Gallery", metadata.textdomain)}
						</span>
						<div {...innerBlocksProps} />
					</div>
				)}
				{!editMode && (
					<>
						<div className="preview-mode">
							{(innerBlocks || []).map((innerBlock) => (
								<div className="easy-gallery-image easy-gallery-hover-container">
									<ImageThumbnail
										key={innerBlock.clientId}
										imageId={innerBlock.attributes.imageId}
										height={270}
										className={`thumb ${
											innerBlock.clientId === previewModeImage.blockId
												? "selected"
												: ""
										}`}
									/>
									{!!innerBlock.attributes.hoverText && 
										<div className="easy-gallery-overlay">
											<div className="easy-gallery-hover-text">
												{innerBlock.attributes.hoverText}
											</div>
										</div>
									}
									{!!innerBlock.attributes.tagline && (
										<p className="easy-gallery-tagline">{innerBlock.attributes.tagline}</p>
									)}
								</div>
							))}
						</div>
						<div>
							<ImageThumbnail
								height="initial"
								imageId={previewModeImage?.imageId}
							/>
						</div>
					</>
				)}
			</div>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={
							editMode ? (
								<Icon icon="welcome-view-site" />
							) : (
								<Icon icon="edit" />
							)
						}
						label={
							editMode
								? __("Preview gallery", metadata.textdomain)
								: __("Edit gallery", metadata.textdomain)
						}
						onClick={() => {
							setEditMode((prevState) => !prevState);
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}