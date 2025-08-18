// src/GAProvider.jsx
import React from 'react';
import useGAPageview from './hooks/useGAPageview';

export default function GAProvider({ children }) {
  useGAPageview();
  return children;
}
