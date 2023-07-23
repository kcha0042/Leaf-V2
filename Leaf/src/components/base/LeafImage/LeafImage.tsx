import React, { useEffect, useState } from "react";
import { Image, ImageResizeMode, ImageStyle } from "react-native";
import { UnreachableCaseError } from "../../../language/errors/UnreachableCaseError";
import { LeafImageScale } from "./LeafImageScale";
import { ImageMap } from "../../../assets/LeafImages";
import Environment from "../../../state/environment/Environment";
import { OS } from "../../../state/environment/types/OS";

interface Props {
    // File name found in assets/images
    // REMEMBER TO REGISTER IMAGE (ImageMap, found in LeafImages.ts)
    fileName: string;
    // The component width
    width?: number;
    // The component height
    height?: number;
    // The way the image scales into the provided width/height
    scale?: LeafImageScale;
    // Style props
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
        if (Environment.instance.getOS() == OS.web) {
            const image = new window.Image();
            image.onload = function () {
                setImageSize({ width: image.width, height: image.height });
            };
            image.src = ImageMap[fileName];
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
        } else {
            const source = ImageMap[fileName];
            const image = Image.resolveAssetSource(source);
            setImageSize({ width: image.width, height: image.height });
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
            source={ImageMap[fileName]}
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
