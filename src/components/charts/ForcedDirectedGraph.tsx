import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function ForcedDirectedGraph() {

    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const data: any = useSelector((store: any) => store.forcedDirectedGraphData);

    useEffect(() => {

        // Specify the dimensions of the chart.
        const width = containerRef.current?.offsetWidth ?? 1600;
        const height = containerRef.current?.offsetHeight ?? 900;

        // Specify the color scale.
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // The force simulation mutates links and nodes, so create a copy
        // so that re-evaluating this cell produces the same result.
        const links: any = data.links.map((d: any) => ({ ...d }));
        const nodes: any = data.nodes.map((d: any) => ({ ...d }));

        // Create a simulation with several forces.
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).distance(100).id((d: any) => d.id))
            .force("charge", d3.forceManyBody().strength(-300))
            .force('collision', d3.forceCollide().radius(10))
            .force("x", d3.forceX())
            .force("y", d3.forceY());

        // Create the SVG container.
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        // Add a line for each link, and a circle for each node.
        const link = svg.append("g")
            .attr("stroke", "#999").attr("stroke-opacity", 0.6)
            .selectAll("line").data(links).enter()
            .append("line").attr("stroke-width", 1.5);

        // Add a group for each node.
        const nodeGroup = svg.append("g").selectAll("g").data(nodes).join("g");

        // Append circle to each node group.
        nodeGroup.append("circle")
            .attr("stroke", "#fff").attr("stroke-width", 1)
            .attr("r", 30).attr("fill", (d: any) => color(d.group))
            .attr('cursor', 'pointer')
            .append("title").text((d: any) => d.id);

        // Append text inside each node group.
        nodeGroup.append("text")
            .attr("text-anchor", "middle").attr("alignment-baseline", "central")
            .attr("fill", "white").attr('cursor', 'pointer')
            .attr("font-size", '9px').text((d: any) => String(d.id).substring(0, d.id.length > 10 ? 10 : d.id.length));

        // Add a drag behavior.
        nodeGroup.call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended) as any);

        // Set the position attributes of links and nodes each time the simulation ticks.
        simulation.on("tick", () => {
            link.attr("x1", (d: any) => d.source.x).attr("y1", (d: any) => d.source.y);
            link.attr("x2", (d: any) => d.target.x).attr("y2", (d: any) => d.target.y);
            // Update node positions.
            nodeGroup.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
        });

        // Reheat the simulation when drag starts, and fix the subject position.
        function dragstarted(event: any) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        // Update the subject (dragged node) position during drag.
        function dragged(event: any) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        // Restore the target alpha so the simulation cools after dragging ends.
        // Unfix the subject position now that it’s no longer being dragged.
        function dragended(event: any) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        // Cleanup logic.
        return () => {
            console.log('deleting elements');
            svg.selectAll().remove();
            if (svgRef.current) svgRef.current.innerHTML = "";
        }

    }, [data]);

    return (
        <div style={{ height: '100vh', width: '100%', overflow: 'hidden', backgroundColor: '#333' }} ref={containerRef}>
            <svg ref={svgRef}></svg>
        </div>
    );
}