"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function scc(nodes, links) {
    var index = makeIndex(nodes);
    var done = [];
    var preOrder = [];
    var S = [];
    var P = [];
    var C = 0;
    var components = [];
    function edges(v) {
        var node = nodes[v];
        return links.filter(function (l) { return l.source === node.id; }).map(function (l) { return index[l.target]; });
    }
    function process(v) {
        // 1. Set the preorder number of v to C, and increment C.
        preOrder[v] = C++;
        // 2. Push v onto S and also onto P.
        S.push(v);
        P.push(v);
        // 3. For each edge from v to a neighboring vertex w:
        for (var _i = 0, _a = edges(v); _i < _a.length; _i++) {
            var w = _a[_i];
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
            var component = [];
            do {
                var x = S.pop();
                done[x] = true;
                component.push(x);
            } while (component[component.length - 1] !== v);
            components.push(component);
            // Pop v from P.
            P.pop();
        }
    }
    for (var i = 0; i < nodes.length; i++) {
        if (preOrder[i] === undefined)
            process(i);
        index[nodes[i].id] = i;
    }
    return components.map(function (c) { return c.map(function (x) { return nodes[x]; }); });
}
exports.scc = scc;
function makeIndex(nodes) {
    var index = {};
    for (var i = 0; i < nodes.length; i++) {
        index[nodes[i].id] = i;
    }
    return index;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsYUFBa0UsS0FBYSxFQUFFLEtBQWE7SUFDNUYsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzlCLElBQU0sSUFBSSxHQUFjLEVBQUUsQ0FBQTtJQUMxQixJQUFNLFFBQVEsR0FBYSxFQUFFLENBQUE7SUFDN0IsSUFBTSxDQUFDLEdBQWEsRUFBRSxDQUFBO0lBQ3RCLElBQU0sQ0FBQyxHQUFhLEVBQUUsQ0FBQTtJQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFNLFVBQVUsR0FBZSxFQUFFLENBQUE7SUFFakMsZUFBZSxDQUFTO1FBQ3RCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQWYsQ0FBZSxDQUFDLENBQUE7SUFDMUUsQ0FBQztJQUVELGlCQUFpQixDQUFTO1FBQ3hCLHlEQUF5RDtRQUN6RCxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUE7UUFDakIsb0NBQW9DO1FBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDVCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ1QscURBQXFEO1FBQ3JELEdBQUcsQ0FBQyxDQUFZLFVBQVEsRUFBUixLQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBUixjQUFRLEVBQVIsSUFBUTtZQUFuQixJQUFNLENBQUMsU0FBQTtZQUNWLCtF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