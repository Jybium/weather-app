/**
 * This component renders the spinner component to show that a process is going on
 *
 */

"use client";
import { Spinner } from "flowbite-react";

import React from "react";

const Spinners = () => {
  return (
    <div className="text-center grid justify-center py-2">
      <Spinner color="gray" size="lg" />
    </div>
  );
};

export default Spinners;
