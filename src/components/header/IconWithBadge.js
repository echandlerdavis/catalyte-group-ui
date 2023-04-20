import React from 'react';
import { Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classes from '../app/App.css';

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles((styleClass) => {
  const cls = classes[styleClass];
  return (
    {
      anchorOriginTopRightRectangle: {
        right: 'auto',
        flexBasis: cls.flexBasis
      }
    });
});

/**
 *
 * @param {Component} baseIcon - The component that will have the badge on top of it
 * @param {*} displayValue - Value that will be displayed in badge
 * @returns basIcon with a badge in the upper left corner
 */
const iconWithBadge = ({ baseIcon, displayValue, styleClass }) => {
  const muiClasses = useStyles(styleClass);

  return (
    <Badge
      lasses={{ anchorOriginTopRightRectangle: muiClasses.anchorOriginTopRightRectangle }}
      badgeContent={displayValue}
    >
      {baseIcon}
    </Badge>
  );
};

export default iconWithBadge;
