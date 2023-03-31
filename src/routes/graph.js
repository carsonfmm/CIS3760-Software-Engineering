import '../App.css';
import { useState, useEffect } from 'react';
import Header from '../components/header/header';
import GraphWindow from '../components/graph/graphWindow';
import GraphColumn from '../components/graph/graphColumn';
import axios from 'axios';
import dagre from 'dagre';
import { addEdge, useNodesState, useEdgesState } from 'react-flow-renderer';

// initializing dagre
let dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// dagre graphing, determines locations for our nodes in react-flow
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  // setting the node height and width
  const nodeWidth = 200; const nodeHeight = 60;

  // direction is top to bottom, seperation between each rank of nodes is 300px
  dagreGraph.setGraph({ rankdir: direction, ranksep: 300 });

  // initializing nodes in dagre
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // initializing edges in dagre
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  // setting the position of each node in dagre
  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = 'top';
    node.sourcePosition = 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const Graph = () => {
  const [disabledSelect, setDisabledSelect] = useState(true);
  const [guelphSubjects, setGuelphSubjects] = useState([]);
  const [carletonSubjects, setCarletonSubjects] = useState([]);
  const [waterlooSubjects, setWaterlooSubjects] = useState([]);
  const [uniSelect, setUniSelect] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [guelphMajors, setGuelphMajors] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [oldNodes, setOldNodes] = useState([]);
  const [oldEdges, setOldEdges] = useState([]);


  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  useEffect(() => {
    document.title = "Graph";
    // upon page load open these files and store the data as state
    const getCourses = async () => {
      fetch('/guelphSubjects.txt').then((r) => r.text()).then(text => {
        // splitting the text into an array to store in state
        setGuelphSubjects(text.split('\n').map((sub) => {
          return { "value": sub, "label": sub };
        }));
      })

      fetch('/carletonSubjects.txt').then((r) => r.text()).then(text => {
        // splitting the text into an array to store in state
        setCarletonSubjects(text.split('\n').map((sub) => {
          return { "value": sub, "label": sub };
        }));
      })

      fetch('/waterlooSubjects.txt').then((r) => r.text()).then(text => {
        // splitting the text into an array to store in state
        setWaterlooSubjects(text.split('\n').map((sub) => {
          return { "value": sub, "label": sub };
        }));
      })

      fetch('/guelphMajors.txt').then((r) => r.json()).then(majorList => {
        // splitting the text into an array to store in state
        setGuelphMajors(majorList.map((majorObj) => {
          return { "value": majorObj.majorCode, "label": majorObj.majorCode };
        }));
      })
    }

    // call the async function, log if error
    getCourses().catch(console.error);
  }, [])

  const uniOnChange = (uni) => {
    // enable other select box
    setDisabledSelect(false);
    setUniSelect(uni.value);
    setSelectedSubject(null);
  }

  const getSearchResults = async (url, params) => {
    // get response from server for containing nodes and edges
    const response = await axios.get(url, { params });

    let edgeList = await response.data.edgeList;
    let nodeList = await response.data.nodeList;

    // reinitialize dagre
    dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    // call our graph positioning function
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodeList, edgeList);

    // scuffed deep copy lol
    setOldNodes(JSON.parse(JSON.stringify(layoutedNodes)));
    setOldEdges(JSON.parse(JSON.stringify(layoutedEdges)));
    // set state
    setEdges(layoutedEdges);
    setNodes(layoutedNodes);
  }

  // function that handles events regarding the subject graphing button
  const buttonClick = () => {
    const params = {
      university: uniSelect,
      subject: selectedSubject
    }

    getSearchResults('https://131.104.49.101/api/graph', params).catch(console.error);
  }

  // method that handles events regarding the major graphing button
  const majorButtonClick = () => {
    const params = {
      major: selectedDegree.value
    }

    // calling function that calls an api and sets state for us
    getSearchResults('https://131.104.49.101/api/graph-major', params).catch(console.error);
  }


  return (
    <div className="container">
      <Header />
      <div className="mainContainer">
        <GraphColumn
          uniOnChange={uniOnChange}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedDegree={selectedDegree}
          setSelectedDegree={setSelectedDegree}
          disabledSelect={disabledSelect}
          subjects={[guelphSubjects, carletonSubjects, waterlooSubjects]}
          guelphMajors={guelphMajors}
          uniSelect={uniSelect}
          buttonClick={buttonClick}
          majorButtonClick={majorButtonClick}
        />
        <GraphWindow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          setNodes={setNodes}
          setEdges={setEdges}
          oldNodes={oldNodes}
          oldEdges={oldEdges}
        />
      </div>
    </div>

  );
}

export default Graph;
