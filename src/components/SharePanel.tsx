import * as React from 'react';
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton} from "react-share";
import {Button, IconButton, Paper, Snackbar, Stack, styled} from "@mui/material";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {ContentCopy} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';

export function SharePanel({url, onSelect}: { url: string, onSelect?: () => void }) {
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const onCopy = function () {
        setSnackBarOpen(true);
        if (onSelect) onSelect();
    }

    const handleSnackBarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        setSnackBarOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackBarClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>)

    return <>
        <Stack direction="row" spacing={2}>
            <Item>
                <CopyToClipboard text={url} onCopy={onCopy}>
                    <Button>
                        <ContentCopy sx={{fontSize: 48}}/>
                    </Button>
                </CopyToClipboard>
            </Item>
            <Item>
                <FacebookShareButton url={url} onClick={onSelect}>
                    <FacebookIcon/>
                </FacebookShareButton>
            </Item>
            <Item>
                <TwitterShareButton url={url} onClick={onSelect}>
                    <TwitterIcon/>
                </TwitterShareButton>
            </Item>
        </Stack>
        <Snackbar
            open={snackBarOpen}
            autoHideDuration={6000}
            onClose={handleSnackBarClose}
            message="클립보드에 복사되었습니다."
            action={action}
        />
    </>
}
