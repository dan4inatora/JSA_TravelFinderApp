import {createMuiTheme} from '@material-ui/core/styles';

export const channelsTableTheme = createMuiTheme({
    overrides: {
        MuiContainer: {
            root:{
                width: "auto",
                display: "flex",
                justifyContent: "flex-end"
            }
        },
        MuiDialog: {
            root: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            paper: {
                borderRadius: '25px'
            }
        },
        MuiInputBase: {
            root: {
                marginLeft: '40px',
                width: '80%'
            }
        },
        MuiFormGroup: {
            root: {
                display: "flex",
                flexDirection: 'column',
                textAlign: 'center'
            }
        },
        MuiFormLabel: {
            root: {
                marginLeft: '40px',
                color: 'black',
                fontWeight: 'bold'
            }
        },
        MuiFormControl: {
            root: {
                width: '100%',
            }
        },
        MuiListItem: {
            root: {
                '&$selected': {
                    border: '2px solid #36D2B3'
                }
            }
        },
        MuiFormControlLabel:
        {
            root:
            {
                marginLeft: "30px"
            }
        }
    }
});