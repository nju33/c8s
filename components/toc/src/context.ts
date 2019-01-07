import React from 'react';
import {TocItemRequiredProps, TocItemPrivateProps} from './organisms';

export default React.createContext<{
  items: (TocItemRequiredProps & TocItemPrivateProps)[];
}>({items: []});
