"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function scc(nodes, links) {
    const index = makeIndex(nodes);
    const done = [];
    const preOrder = [];
    const S = [];
    const P = [];
    let C = 0;
    const components = [];
    function edges(v) {
        const node = nodes[v];
        return links.filter(l => l.source === node.id).map(l => index[l.target]);
    }
    function process(v) {
        // 1. Set the preorder number of v to C, and increment C.
        preOrder[v] = C++;
        // 2. Push v onto S and also onto P.
        S.push(v);
        P.push(v);
        // 3. For each edge from v to a neighboring vertex w:
        for (const w of edges(v)) {
            // If the preorder number of w has not yet been assigned, recursively search w;
            if (preOrder[w] === undefined)
                process(w);
            // Otherwise, if w has not yet been assigned to a strongly connected component:
            // Repeatedly pop vertices from P until the top element of P has a preorder number
            // less than or equal to the preorder number of w.
            if (!done[w]) {
                while (preOrder[P[P.length - 1]] > preOrder[w]) {
                    P.pop();
                }
            }
        }
        // 4. If v is the top element of P:
        if (v === P[P.length - 1]) {
            // Pop vertices from S until v has been popped, and assign the popped vertices to a new component.
            const component = [];
            do {
                const x = S.pop();
                done[x] = true;
                component.push(x);
            } while (component[component.length - 1] !== v);
            components.push(component);
            // Pop v from P.
            P.pop();
        }
    }
    for (let i = 0; i < nodes.length; i++) {
        if (preOrder[i] === undefined)
            process(i);
        index[nodes[i].id] = i;
    }
    return components.map(c => c.map(x => nodes[x]));
}
exports.scc = scc;
function makeIndex(nodes) {
    const index = {};
    for (let i = 0; i < nodes.length; i++) {
        index[nodes[i].id] = i;
    }
    return index;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsYUFBa0UsS0FBYSxFQUFFLEtBQWE7SUFDNUYsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzlCLE1BQU0sSUFBSSxHQUFjLEVBQUUsQ0FBQTtJQUMxQixNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUE7SUFDN0IsTUFBTSxDQUFDLEdBQWEsRUFBRSxDQUFBO0lBQ3RCLE1BQU0sQ0FBQyxHQUFhLEVBQUUsQ0FBQTtJQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxNQUFNLFVBQVUsR0FBZSxFQUFFLENBQUE7SUFFakMsZUFBZSxDQUFTO1FBQ3RCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDMUUsQ0FBQztJQUVELGlCQUFpQixDQUFTO1FBQ3hCLHlEQUF5RDtRQUN6RCxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUE7UUFDakIsb0NBQW9DO1FBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDVCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ1QscURBQXFEO1FBQ3JELEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsK0VBQStFO1lBQy9FLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUM7Z0JBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3pDLCtFQUErRTtZQUMvRSxrRkFBa0Y7WUFDbEYsa0RBQWtEO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUMvQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7Z0JBQ1QsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsbUNBQW1DO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsa0dBQWtHO1lBQ2xHLE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQTtZQUM5QixHQUFHLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRyxDQUFBO2dCQUNsQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFBO2dCQUNkLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbkIsQ0FBQyxRQUFRLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQztZQUMvQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQzFCLGdCQUFnQjtZQUNoQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDVCxDQUFDO0lBQ0gsQ0FBQztJQUVELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUM7WUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDekMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2xELENBQUM7QUF0REQsa0JBc0RDO0FBRUQsbUJBQW1CLEtBQWlCO0lBQ2xDLE1BQU0sS0FBSyxHQUEyQixFQUFFLENBQUE7SUFDeEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDdEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxLQUFLLENBQUE7QUFDZCxDQUFDIn0=