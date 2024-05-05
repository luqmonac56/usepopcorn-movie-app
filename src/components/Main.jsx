import React from "react";
import { useState } from "react";
import ListBox from "./ListBox";
import WatchedMoviesBox from "./WatchedMoviesBox";

export default function Main({ children}) {
  return <main className="main">{children}</main>;
}
