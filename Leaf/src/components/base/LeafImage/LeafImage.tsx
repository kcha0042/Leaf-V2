import React, { useEffect, useState } from "react";
import { Image, ImageResizeMode, ImageStyle } from "react-native";
import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";
import { LeafImageScale } from "./LeafImageScale";

interface Props {
    fileName: string;
    width?: number;
    height?: number;
    scale?: LeafImageScale;
    style?: ImageStyle;
}

const LeafImage: React.FC<Props> = ({ fileName, width = 0, height = 0, scale = LeafImageScale.none, style }) => {
    const [size, setSize] = useState({ width: width, height: height });
    const [resizeMode, setResizeMode] = useState<ImageResizeMode>(null);
    const [imageSize, setImageSize] = useState({
        // Don't set these to 0, causes NaN issues
        width: 1,
        height: 1,
    });

    useEffect(() => {
        const imagePath = require("/assets/images/" + fileName);
        Image.getSize(
            imagePath,
            (width, height) => {
                setImageSize({ width: width, height: height });
            },
            (error) => {
                console.log("Error getting image dimensions:", error);
            },
        );

        if (scale == LeafImageScale.scaleToFill) {
            if (width > height) {
                setSize({ width: width, height: undefined });
            } else {
                setSize({
                    width: (imageSize.width * height) / imageSize.height,
                    height: undefined,
                });
            }
        }
    }, []);

    useEffect(() => {
        switch (scale) {
            case LeafImageScale.none:
                setResizeMode("stretch");
                break;
            case LeafImageScale.scaleToFit:
                setResizeMode("contain");
                break;
            case LeafImageScale.scaleToFill:
                setResizeMode("cover");
                break;
            case LeafImageScale.scaleToFillCrop:
                setResizeMode("cover");
                break;
            default:
                throw new UnreachableCaseError(scale);
        }
    }, []);

    return (
        <Image
            source={require("/assets/images/" + fileName)}
            resizeMode={resizeMode}
            style={{
                width: size.width,
                height: size.height,
                aspectRatio: scale == LeafImageScale.none ? null : 1,
                ...style,
            }}
        />
    );
};

export default LeafImage;
