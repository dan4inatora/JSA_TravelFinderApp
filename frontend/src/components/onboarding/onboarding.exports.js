import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Slider} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textRoot: {
        width: '50%'
    },
    submit: {
        margin: '20px auto',
    }
}));

export function valueLabelFormat(value) {
    if(value % 1000 === 0 && value > 10) {
        return `${value / 1000}k`;
    } else if(value <= 10) {
        return `${value}`;
    } else {
        return `${value}$`;
    }
}

export const BudgetSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
          boxShadow: 'inherit',
        },
      },
      active: {},
      valueLabel: {
        left: 'calc(-50% + 4px)',
      },
      track: {
        height: 8,
        borderRadius: 4,
      },
      rail: {
        height: 8,
        borderRadius: 4,
      },
})(Slider);