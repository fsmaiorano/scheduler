import React from 'react';
import { PropTypes } from 'prop-types';

import { ErrorContainer } from './styles';

const Error = ({ error }) => (
  <ErrorContainer>
    <h1>{error}</h1>
  </ErrorContainer>
);

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;
