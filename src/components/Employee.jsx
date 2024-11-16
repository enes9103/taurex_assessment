"use client";

import React from "react";
import CustomCheckbox from "./base/CustomCheckbox";

const Employee = React.memo(({ employee, selectedIds, handleCheck }) => {
  return (
    <li key={`primary-employees-item-${employee.id}`} className="list-[square]">
      <CustomCheckbox
        id={`employee-${employee.id}`}
        checked={selectedIds.includes(employee.id)}
        onChange={(e) => handleCheck(employee.id, e.target.checked)}
        label={`${employee.title} - ${employee.name}`}
      />
      <ul role="list" className="divide-y divide-gray-100">
        {employee.children.map((emp) => (
          <Employee
            key={`primary-employees-item-${emp.id}`}
            selectedIds={selectedIds}
            employee={emp}
            handleCheck={handleCheck}
          />
        ))}
      </ul>
    </li>
  );
});

export default Employee;
