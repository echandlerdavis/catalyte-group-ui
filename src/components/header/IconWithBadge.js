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
    anchorOriginTopRightRectangle: {
      marginRight: 'auto',
      marginLeft: '1.5vh'
    }
  }));

/**
 *
 * @param {Component} baseIcon - The component that will have the badge on top of it
 * @param {*} displayValue - Value that will be displayed in badge
 * @returns baseIcon with a badge in the upper left corner
 */
const IconWithBadge = ({ baseIcon, displayValue }) => {
  const muiClasses = useStyles();

  return (
    <Badge
      overlap="rectangular"
      badgeContent={displayValue}
      classes={{
        anchorOriginTopRightRectangular: muiClasses.anchorOriginTopRightRectangle
      }}
      color="secondary"
    >
      {baseIcon}
    </Badge>
  );
};

export default IconWithBadge;
