import React from 'react';
import { Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles((
  {
    anchorOriginTopRightRectangular: {
      right: 'auto',
      left: '.5vh'
    }
  }));

/**
 *
 * @param {Component} baseIcon - The component that will have the badge on top of it
 * @param {*} displayValue - Value that will be displayed in badge
 * @returns basIcon with a badge in the upper left corner
 */
const IconWithBadge = ({ baseIcon, displayValue, styleClass }) => {
  const muiClasses = useStyles();

  return (
    <Badge
      overlap="rectangular"
      className={styleClass}
      classes={{ anchorOriginTopRightRectangular: muiClasses.anchorOriginTopRightRectangular }}
      badgeContent={displayValue}
    >
      {baseIcon}
    </Badge>
  );
};

export default IconWithBadge;
