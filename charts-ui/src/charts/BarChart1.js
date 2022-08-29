import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function BarChart({ width1, height1, data, columns }){
    const ref = useRef();
    const margin = 20;
    const width = width1 - 2 * margin;
    const height = height1 - 2 * margin;

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black")
    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        
        const svg = d3.select(ref.current);
        const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);
        var selection = svg.selectAll("rect").data(data);
        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(columns)
            .padding(0.4);
        
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([height, 0]);

        chart.append('g')
            .attr('transform', `translate(0, ${height-20})`)
            .call(d3.axisBottom(xScale));

        chart.append('g')
            .call(d3.axisLeft(yScale));

        // selection
        //     .transition().duration(300)
        //         .attr("height", (d) => yScale(d))
        //         .attr("y", (d) => height - yScale(d))

        // selection
        //     .enter()
        //     .append("rect")
        //     .attr("x", (d, i) => i * 45)
        //     .attr("y", (d) => height)
        //     .attr("width", 40)
        //     .attr("height", 0)
        //     .attr("fill", "orange")
        //     .transition().duration(300)
        //         .attr("height", (d) => yScale(d))
        //         .attr("y", (d) => height - yScale(d))
        
        // selection
        //     .exit()
        //     .transition().duration(300)
        //         .attr("y", (d) => height)
        //         .attr("height", 0)
        //     .remove()
    }


    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
        </div>
        
    )

}

export default BarChart;