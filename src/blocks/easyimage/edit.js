import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
	InspectorControls,
	RichText
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import {
	PanelBody,
	TextControl,
	ToggleControl
} from "@wordpress/components";
import { useState } from 'react';
import metadata from "./block.json";
import { ImageThumbnail } from "../../components/imageThumbnail";
import "./editor.scss";
import { useImage } from "../../hooks/useImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPanorama } from "@fortawesome/free-solid-svg-icons";
// The next three lines fix a bug, and must be added when using FA icons in any block
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function Edit(props) {
	const blockProps = useBlockProps();
	const image = useImage(props.attributes.imageId);
	const imageSelected = !!props.attributes.imageId && !!image?.source_url;
	const [linkUrl, setLinkUrl] = useState(props.attributes.linkUrl);
	const [isLink, setIsLink] = useState(props.attributes.isLink);

	return (
		<>
			<div {...blockProps}>
				{!!imageSelected &&
					<ImageThumbnail imageId={props.attributes.imageId} />}
				{!imageSelected && (
					<div
						style={{
							display: "flex",
							height: 150,
							width: "100%",
							background: "white",
						}}
					>
						<FontAwesomeIcon icon={faPanorama} style={{ margin: "auto" }} />
					</div>
				)}
				<MediaUploadCheck>
					<MediaUpload
						allowedTypes={["image"]}
						render={({ open }) => {
							return (
								<button className="media-select" onClick={open}>
									{imageSelected
										? __("Replace image", metadata.textdomain)
										: __("Select an image", metadata.textdomain)}
								</button>
							);
						}}
						value={props.attributes.imageId}
						onSelect={(item) => {
							props.setAttributes({
								imageId: item.id,
							});
						}}
					/>
				</MediaUploadCheck>
			</div>
			<InspectorControls>
				<PanelBody title={__("Is this a link?")}>
					<ToggleControl
						help={
							isLink
								? __("Is a link")
								: __("Isn't a link")
						}
						value={props.attributes.isLink}
						checked={isLink}
						onChange={(newValue) => {
							props.setAttributes({isLink: newValue});
							setIsLink(newValue);
						}}
					/>
					{!!isLink && 
						<RichText
							placeholder="Link URL"
							value={props.attributes.linkUrl}
							allowedFormats={[]}
							multiline={false}
							onSplit={() => {}}
							onReplace={() => {}}
							onChange={(newValue) => {
								props.setAttributes({
									linkUrl: newValue,
								});
								setLinkUrl(newValue);
							}}
						/>
					}
				</PanelBody>
				<PanelBody title={__("Text", metadata.textdomain)}>
					<TextControl
						label={__("Tagline")}
						value={props.attributes.tagline}
						onChange={(newValue) => {
							props.setAttributes({tagline: newValue})
						}}
					/>
					{!!imageSelected && (
						<TextControl
							label={__("Hover Text")}
							value={props.attributes.hoverText}
							onChange={(newValue) => {
								props.setAttributes({hoverText: newValue})
							}}
						/>
					)}
				</PanelBody>
			</InspectorControls>
		</>
	);
}