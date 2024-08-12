import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-4xl">Page not found</p>
      <img src="/assets/404.png" alt="" width={500} />
      <Link to={"/"}>
        Back to <strong>Web Internal PT Ondel</strong>
      </Link>
    </div>
  );
}

export default PageNotFound;
