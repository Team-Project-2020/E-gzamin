import React, { ReactElement } from 'react';
import Spinner from 'react-loader-spinner';

const Loader = (): ReactElement => (
  <div>
    <Spinner type="Circles" color="#00BFFF" height={150} width={150} />
  </div>
);

export default Loader;
