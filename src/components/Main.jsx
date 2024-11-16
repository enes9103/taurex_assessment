"use client";

import React, { useCallback, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import Employee from "./Employee";
import { createEmployeeHierarchy } from "../utils/helpers/dataHelpers";
import {
  checkCyclicDependencies,
  getParentIdsWithChildren,
} from "../utils/helpers/treeHelpers";
import Loading from "./Loading";
import Modal from "./base/Modal";

const Main = () => {
  const { employees, loading, error } = useFetch("/data/employee_list.json");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedUniqueData, setSelectedUniqueData] = useState([]);
  const [cyclicError, setCyclicError] = useState(false); // Cyclic controller

  const { primaryEmployees, employeesWithoutManager, employeeList } =
    useMemo(() => {
      if (!employees || employees.length === 0)
        return {
          primaryEmployees: [],
          employeesWithoutManager: [],
          employeeList: {},
        };

      const { primaryEmployees, employeesWithoutManager, employeeList } =
        createEmployeeHierarchy(employees);

      // Cyclic dependency check
      if (checkCyclicDependencies(primaryEmployees)) {
        setCyclicError(true);
      }

      return { primaryEmployees, employeesWithoutManager, employeeList };
    }, [employees]);

  // Recursively handle check/uncheck behavior
  const handleCheck = useCallback(
    (id, checked) => {
      let newIds = [];
      const parents = getParentIdsWithChildren(primaryEmployees, id);
      newIds = [...parents];
      const employee = employeeList[id];
      const addChildIdsRecursively = (emp) => {
        if (emp.children.length > 0) {
          emp.children.forEach((child) => {
            if (child.children.length > 0) {
              child.children.forEach(() => newIds.push(child.id));
            } else {
              newIds.push(child.id);
            }
            addChildIdsRecursively(child);
          });
        }
      };
      addChildIdsRecursively(employee);

      if (checked) {
        setSelectedIds((prevIds) => [...prevIds, ...newIds]);
      } else {
        let filteredIds = [...selectedIds];
        newIds.forEach((item, i) => {
          let index = filteredIds.indexOf(item);
          if (index !== -1) {
            filteredIds.splice(index, 1);
          }
        });

        setSelectedIds(filteredIds);
      }
    },
    [employees, selectedIds]
  );

  const handleSubmit = () => {
    const uniqArray = [...new Set(selectedIds)];
    setSelectedUniqueData(uniqArray);
    console.log("Selected IDs:", uniqArray);

    // Show the success modal after submission
    setIsSuccessModalOpen(true);
  };

  const closeModal = () => {
    setIsSuccessModalOpen(false);
  };

  if (loading) return <Loading />;
  if (error || cyclicError)
    return (
      <div className="mt-3 px-10">
        <p className="text-red-500 font-bold">
          {cyclicError
            ? "Cyclic dependencies detected in the employee hierarchy!"
            : `Error: ${error}`}
        </p>
      </div>
    );

  return (
    <div className="mt-3 px-10">
      <h2 className="text-2xl text-cyan-500 font-bold">Employee Hierarchy</h2>
      <ul>
        {primaryEmployees.map((emp) => (
          <Employee
            key={`primary-employees-${emp.id}`}
            selectedIds={selectedIds}
            employee={emp}
            handleCheck={handleCheck}
          />
        ))}
      </ul>
      {employeesWithoutManager.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl text-red-500 font-bold">
            Employees without Manager
          </h2>
          <ul role="list" className="divide-y divide-gray-100">
            {employeesWithoutManager.map((emp) => (
              <li key={`employees-without-manager-${emp.id}`}>
                {emp.title} - {emp.name} (No valid manager assigned)
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Submit Selected Employees
      </button>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={closeModal}
        uniqArray={selectedUniqueData}
      />
    </div>
  );
};

export default Main;
