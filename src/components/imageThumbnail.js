import { useImage } from "../hooks/useImage";

export const ImageThumbnail = (props) => {
	const image = useImage(props.imageId);

	return image?.source_url ? (
		<img
			style={{
				margin: "0 auto",
				display: "block",
				height: "auto",
				width: "150px",
			}}
			onClick={props.onClick}
			src={image.source_url}
			className={props.className}
		/>
	) : null;
};