// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
import React from 'react'

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

const Proposal = () => {
  return (
    <div
    style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        height: '750px',
    }}
>
    <Viewer fileUrl="/assets/pdf-open-parameters.pdf" />
    </div>
  )
}

export default Proposal
