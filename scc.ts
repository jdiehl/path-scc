// see: https://en.wikipedia.org/wiki/Path-based_strong_component_algorithm
export interface ISCCNode { id: string }
export interface ISCCLink { source: string, target: string }

export function scc<Node extends ISCCNode, Link extends ISCCLink>(nodes: Node[], links: Link[]): Node[][] {
  const index = makeIndex(nodes)
  const done: boolean[] = []
  const preOrder: number[] = []
  const S: number[] = []
  const P: number[] = []
  let C = 0
  const components: number[][] = []

  function edges(v: number) {
    const node = nodes[v]
    return links.filter(l => l.source === node.id).map(l => index[l.target])
  }

  function process(v: number) {
    // 1. Set the preorder number of v to C, and increment C.
    preOrder[v] = C++
    // 2. Push v onto S and also onto P.
    S.push(v)
    P.push(v)
    // 3. For each edge from v to a neighboring vertex w:
    for (const w of edges(v)) {
      // If the preorder number of w has not yet been assigned, recursively search w;
      if (preOrder[w] === undefined) process(w)
      // Otherwise, if w has not yet been assigned to a strongly connected component:
      // Repeatedly pop vertices from P until the top element of P has a preorder number
      // less than or equal to the preorder number of w.
      if (!done[w]) {
        while (preOrder[P[P.length - 1]] > preOrder[w]) {
          P.pop()
        }
      }
    }
    // 4. If v is the top element of P:
    if (v === P[P.length - 1]) {
      // Pop vertices from S until v has been popped, and assign the popped vertices to a new component.
      const component: number[] = []
      do {
        const x = S.pop()!
        done[x] = true
        component.push(x)
      } while (component[component.length - 1] !== v)
      components.push(component)
      // Pop v from P.
      P.pop()
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    if (preOrder[i] === undefined) process(i)
    index[nodes[i].id] = i
  }

  return components.map(c => c.map(x => nodes[x]))
}

function makeIndex(nodes: ISCCNode[]): Record<string, number> {
  const index: Record<string, number> = {}
  for (let i = 0; i < nodes.length; i++) {
    index[nodes[i].id] = i
  }
  return index
}
