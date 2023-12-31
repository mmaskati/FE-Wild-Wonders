import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
<footer className="bg-dark fixed-bottom py-3">
  <div className="container-fluid px-3">
    <small className="text-white mb-1">Wild Wonders App</small><br />
    <small className="text-white mb-0">&copy; 2024 | <code className="text-bd-primary">SEI7 Project 3</code></small>
  </div>
</footer>
  )
}
