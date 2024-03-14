import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function ClearButton(props: any): JSX.Element {
    return (
        <IconButton {...props} size="small" sx={{ mr: 2 }}><Close /></IconButton>
    );
}