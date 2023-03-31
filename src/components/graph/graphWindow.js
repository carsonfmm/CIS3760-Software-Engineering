import '../../App.css';
import { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';


const GraphWindow = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, setNodes, oldNodes, oldEdges, setEdges  }) => {
  const [lastClickedNode, setLastClickedNode] = useState("");
  const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

  const onNodeClick = async (e, node) => {
    // scuffed deep copy lol
    let newNodes = JSON.parse(JSON.stringify(oldNodes));
    let newEdges = JSON.parse(JSON.stringify(oldEdges));
    let id = node.data.label;

    if (lastClickedNode === id) {
      setNodes([]);
      setLastClickedNode("");
      setNodes(newNodes);
      setEdges([]);
      setEdges(newEdges);
    } else {
      // setting id to node label
      // ex. CIS*2500
      let id = node.data.label;
      let arr = [];
      arr.push(id);
      while (arr.length > 0) {
        let curId = arr.pop();
        for (let i = 0; i < edges.length; i++) {
          // checking if edge label matches current node, and if it is an AND edge
          if (edges[i].source == curId && edges[i].animated == null) {
            arr.push(edges[i].target);
            newEdges[i].style.stroke = "#C51C1C";
          }
        }
        for (let i = 0; i < newNodes.length; i++) {
          // if node id matches current node set node background color to red
          if (newNodes[i].id == curId) {
            newNodes[i].style.background = "#C51C1C";
          }
        }
      }

      setNodes([]);
      setLastClickedNode(id);
      setNodes(newNodes);
      setEdges([]);
      setEdges(newEdges);
    }
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView={true}
      onNodeClick={onNodeClick}
      minZoom={0}
      attributionPosition="top-right">
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default GraphWindow;
