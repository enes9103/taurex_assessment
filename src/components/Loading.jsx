"use client";

import React from "react";

// Sub-component for individual loading items
const LoadingItem = ({ childrenCount }) => (
  <li className="space-y-3">
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 rounded-md bg-gray-700"></div>
      <div className="w-56 h-3 rounded-md bg-gray-700"></div>
    </div>
    <ul className="pl-6 space-y-3 mt-2">
      {Array.from({ length: childrenCount }).map((_, j) => (
        <li key={`loading-child-${j}`}>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-md bg-gray-700"></div>
            <div className="w-48 h-3 rounded-md bg-gray-700"></div>
          </div>
        </li>
      ))}
    </ul>
  </li>
);

const Loading = () => {
  const parentCount = 7;
  const childCount = 2;

  return (
    <div className="mt-3 px-10">
      <h2 className="text-2xl text-cyan-500 font-bold">Employee Hierarchy</h2>
      <ul className="mt-4 animate-pulse space-y-3">
        {Array.from({ length: parentCount }).map((_, i) => (
          <LoadingItem key={`loading-parent-${i}`} childrenCount={childCount} />
        ))}
      </ul>
    </div>
  );
};

export default Loading;
