//! Functions related to data structures
export const createEmployeeHierarchy = (employees) => {
  let employeeList = {};

  employees.forEach((emp) => {
    employeeList[emp.id] = { ...emp, children: [] };
  });
  let primaryEmployees = [];
  let employeesWithoutManager = [];

  employees.forEach((emp) => {
    if (emp.managerId === null) {
      primaryEmployees.push(employeeList[emp.id]);
    } else if (employeeList[emp.managerId]) {
      employeeList[emp.managerId].children.push(employeeList[emp.id]);
    } else {
      employeesWithoutManager.push(emp);
    }
  });

  return { primaryEmployees, employeesWithoutManager, employeeList };
};
