import React from 'react';

export interface IRoute {
  path: string;
  key: string;
  name: string;
  exact?: boolean | undefined;
  component?: React.ComponentType;
}
