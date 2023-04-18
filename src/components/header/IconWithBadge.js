import React from 'react';
import { Badge } from '@material-ui/core';

const iconWithBadge = (baseIcon, displayValue) => (
  <Badge badgeContent={displayValue}>
    {baseIcon}
  </Badge>
);

export default iconWithBadge;
