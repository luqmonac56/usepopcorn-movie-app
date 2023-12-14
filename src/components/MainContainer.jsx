import React, { useState } from "react";

export default function MainContainer({children}) {
  

  return (
    <main className="main">
      {children}
    </main>
  );
}
