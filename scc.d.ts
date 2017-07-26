export interface ISCCNode {
    id: string;
}
export interface ISCCLink {
    source: string;
    target: string;
}
export declare function scc<Node extends ISCCNode, Link extends ISCCLink>(nodes: Node[], links: Link[]): Node[][];
