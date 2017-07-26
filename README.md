# Path-based strong component algorithm

Find all strongly-connected components in a graph structure. These can be used to identify cycles (= components with more than one node).

## Usage

```javascript
const scc = require('scc').scc // or: import {scc} from 'scc'
const nodes = [{ id: 'A' }, { id: 'B' }]
const links = [{ source: 'A', target: 'B' }, { source: 'B', target: 'A' }]
const components = scc(nodes, links)
components == [{ id: 'A' }, { id: 'B' }]
```

TypeScript type declarations are included.

## Description

Source: [WikiPedia](https://en.wikipedia.org/wiki/Path-based_strong_component_algorithm)

The algorithm performs a depth-first search of the given graph G, maintaining as it does two stacks S and P (in addition to the normal call stack for a recursive function). Stack S contains all the vertices that have not yet been assigned to a strongly connected component, in the order in which the depth-first search reaches the vertices. Stack P contains vertices that have not yet been determined to belong to different strongly connected components from each other. It also uses a counter C of the number of vertices reached so far, which it uses to compute the preorder numbers of the vertices.

When the depth-first search reaches a vertex v, the algorithm performs the following steps:

1. Set the preorder number of v to C, and increment C.
2. Push v onto S and also onto P.
3. For each edge from v to a neighboring vertex w:
    * If the preorder number of w has not yet been assigned, recursively search w;
    * Otherwise, if w has not yet been assigned to a strongly connected component:
        * Repeatedly pop vertices from P until the top element of P has a preorder number less than or equal to the preorder number of w.
4. If v is the top element of P:
    * Pop vertices from S until v has been popped, and assign the popped vertices to a new component.
    * Pop v from P.

The overall algorithm consists of a loop through the vertices of the graph, calling this recursive search on each vertex that does not yet have a preorder number assigned to it.
