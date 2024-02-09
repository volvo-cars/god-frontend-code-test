import React from "react";
import { IconButton } from "vcc-ui/dist/components"

type SlideButtonProps = {
    isDisabled: boolean;
    iconName: 'navigation-chevronforward' | 'navigation-chevronback';
    areaLabel?: string;
    className?: string;
    onClick: () => void;
}


const SlideButton = (props: SlideButtonProps) => {
    return (
        <IconButton iconName={props.iconName} variant="outline" aria-label={props.areaLabel ?? "Slider Button"} onClick={props.onClick} disabled={props.isDisabled}></IconButton>
    )
}

export default SlideButton