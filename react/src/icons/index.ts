import React from 'react';

const requireAll = (requireContext: any) => requireContext.keys().forEach(requireContext);
requireAll(require.context('./svg', false, /\.svg$/));
