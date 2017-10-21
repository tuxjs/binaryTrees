"use strict";

const {replaceIn,minOf} = require("../../utils/tools");

function addNode(newNode, treeNode) {
  return treeNode.getKey() > newNode.getKey()
    ? treeNode.leftChild === undefined || treeNode.leftChild.isALeaf()
      ? treeNode.insertChild(newNode)
      : addNode(newNode, treeNode.leftChild)
    : treeNode.rightChild === undefined || treeNode.rightChild.isALeaf()
      ? treeNode.insertChild(newNode)
      : addNode(newNode, treeNode.rightChild);
}

function findNode(value, rootNode) {
  if (rootNode === undefined) {
    return undefined;
  } else {
    const nodeValue = rootNode.getKey();
    return nodeValue === value
      ? rootNode
      : nodeValue < value
        ? findNode(value, rootNode.rightChild)
        : findNode(value, rootNode.leftChild);
  }
}

function maxOf(rootNode) {
  return rootNode.rightChild === undefined
    ? rootNode
    : maxOf(rootNode.rightChild);
}

function removeFrom(tree, node) {
  if (!node.hasChildrens()) {
    replaceIn(tree, node, undefined);
  } else if (node.hasOneChild()) {
    const nodeChild =
      node.leftChild !== undefined ? node.leftChild : node.rightChild;
    replaceIn(tree, node, nodeChild);
  } else {
    const succesor = minOf(node.rightChild);
    node.setKey(succesor.getKey());
    removeFrom(tree,succesor);
  }

  return tree;
}

function insertIn(tree, newNode) {
  tree.rootNode === undefined
    ? tree.setRootNodeWith(newNode)
    : addNode(newNode, tree.rootNode);
  return tree;
}

function reduceTree(fn, acc, treeNode) {
  return treeNode === undefined
    ? acc
    : reduceTree(fn, fn(acc, treeNode), treeNode.succesor());
}

module.exports = {
  removeFrom,
  addNode,
  minOf,
  reduceTree,
  maxOf,
  findNode,
  insertIn
};
