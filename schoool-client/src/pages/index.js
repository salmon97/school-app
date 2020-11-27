import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

export default function () {
  return (
    <div>
      <h1>Index page</h1>
      <h1><Link to="/cabinet">Caninet</Link></h1>
    </div>
  );
}
