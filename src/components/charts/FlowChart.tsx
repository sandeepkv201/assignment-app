import { Typography } from "@mui/material";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function FlowChart(): JSX.Element {

    const data: any = useSelector((store: any) => store.flowChartData);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {

        console.log('adding elements');

        const width = 1000;

        // Compute the tree height; this approach will allow the height of the
        // SVG to scale according to the breadth (width) of the tree layout.
        const root: any = d3.hierarchy(data);
        const dx = 10;
        const dy = width / (root.height + 1);

        // Create a tree layout.
        const tree = d3.tree().nodeSize([dx, dy]);

        // Sort the tree and apply the layout.
        root.sort((a: any, b: any) => d3.ascending(a.data.name, b.data.name));
        tree(root);

        // Compute the extent of the tree. Note that x and y are swapped here
        // because in the tree layout, x is the breadth, but when displayed, the
        // tree extends right rather than down.
        let x0 = Infinity;
        let x1 = -x0;
        root.each((d: any) => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        // Compute the adjusted height of the tree.
        const height = x1 - x0 + dx * 2;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-dy / 3, x0 - dx, width, height])
            .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

        const _link = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5)
            .selectAll()
            .data(root.links())
            .join("path")
            .attr("d", d3.linkHorizontal().x((d: any) => d.y).y((d: any) => d.x) as any);

        const node = svg.append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll()
            .data(root.descendants())
            .join("g")
            .attr("transform", (d: any) => `translate(${d.y},${d.x})`)
            .on('click', (_el, { data }: any): void => {
                console.log('clicked', data);
            });

        node.append("circle")
            .attr("fill", (d: any) => d.children ? "#555" : "#999")
            .attr("r", 4);

        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", (d: any) => d.children ? -6 : 6)
            .attr("text-anchor", (d: any) => d.children ? "end" : "start")
            .text((d: any) => `${d.data.type ?? ''} ${d.data.name}`)
            .attr("stroke", "white")
            .attr("paint-order", "stroke");

        // Cleanup logic.
        return () => {
            console.log('deleting elements');
            svg.selectAll().remove();
            if (svgRef.current) {
                svgRef.current.innerHTML = "";
            }
        }

    }, [data]);

    return (
        <>
            <Typography>Flow Chart</Typography>
            <svg ref={svgRef}></svg>
        </>
    );
}