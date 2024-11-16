//! Functions related to tree structures
export const checkCyclicDependencies = (primaryEmployees) => {
  const visited = new Set();
  const stack = new Set();

  const dfs = (node) => {
    // If the node is already in the recursion stack, we have a cycle
    if (stack.has(node.id)) return true;
    // If the node is already visited, skip it
    if (visited.has(node.id)) return false;

    visited.add(node.id);
    stack.add(node.id);

    // Traverse all children of the node
    for (const child of node.children) {
      if (dfs(child)) return true;
    }

    stack.delete(node.id);
    return false;
  };

  // Check all primaryEmployees for cycles
  return primaryEmployees.some((root) => dfs(root));
};

export const getParentIdsWithChildren = (treeData, targetId) => {
  // Recursive function to find a node's parent by its ID
  const findParentNode = (treeData, childId) => {
    for (const node of treeData) {
      if (node.children && node.children.length > 0) {
        const child = node.children.find((child) => child.id === childId);
        if (child) {
          return node;
        }

        const result = findParentNode(node.children, childId);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  let currentId = targetId;
  let parent = findParentNode(treeData, currentId);
  let parentIds = [];

  // Recursive function to calculate total children for a node
  const self = parent
    ? parent.children.find((n) => n.id === targetId)
    : treeData.find((n) => n.id === targetId);

  let childCount = 0;
  const calculateChildCount = (node) => {
    if (node.children.length > 0) {
      if (node.id === targetId) {
        childCount += node.children.length;
      } else {
        childCount += node.children.length - 1;
      }
    }
    if (node.children && node.children.length > 1) {
      node.children.forEach((child) => calculateChildCount(child));
    }
  };
  calculateChildCount(self);
  // Traverse tree to collect parent IDs
  while (parent) {
    currentId = parent.id;
    parentIds.unshift(currentId);
    parent = findParentNode(treeData, currentId);
  }

  if (childCount === 0) {
    parentIds.push(self.id);
    return parentIds;
  }

  const result = [];
  for (let i = 0; i < childCount; i++) {
    result.push(...parentIds);
    result.push(self.id);
  }

  return result;
};
