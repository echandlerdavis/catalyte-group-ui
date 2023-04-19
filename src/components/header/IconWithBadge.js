import React from 'react';
import { Badge } from '@material-ui/core';

/**
 *
 * @param {Component} baseIcon - The component that will have the badge on top of it
 * @param {*} displayValue - Value that will be displayed in badge
 * @returns basIcon with a badge in the upper left corner
 */
const iconWithBadge = ({ baseIcon, displayValue, styleClass }) => (
  <Badge className={styleClass} badgeContent={displayValue}>
    {baseIcon}
  </Badge>
);

export default iconWithBadge;
