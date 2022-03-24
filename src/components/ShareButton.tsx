import * as React from 'react';
import {Button, SwipeableDrawer} from "@mui/material";
import {SharePanel} from "./SharePanel";

export function ShareButton() {
    const [sharePanelOpen, setSharePanelOpen] = React.useState(false);

    const url = window.location.href;
    const share = function () {
        if (window.navigator.share) {
            window.navigator.share({
                url: url
            });
        } else {
            setSharePanelOpen(true)
        }
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setSharePanelOpen(newOpen);
    };

    return <>
        <Button onClick={share}>공유하기</Button>
        <SwipeableDrawer open={sharePanelOpen}
                         onClose={toggleDrawer(false)}
                         onOpen={toggleDrawer(true)}
                         anchor="bottom">
            <SharePanel url={url} onSelect={toggleDrawer(false)}/>
        </SwipeableDrawer>
    </>
}
