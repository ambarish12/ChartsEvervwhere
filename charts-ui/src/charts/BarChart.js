import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function BarChart(props) {
    const ref = useRef();
    useEffect(() => {
        var svg = d3.select(ref.current),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin


        svg.append("text")
            .attr("transform", "translate(100,0)")
            .attr("x", 50)
            .attr("y", 50)
            .attr("font-size", "24px")
            .text("Top 10 Earthquakes by Magnitude")

        var xScale = d3.scaleBand().range([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range([height, 0]);

        var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");


        xScale.domain(props.data.map(function (d) { return d.x; }));
        // yScale.domain([0, d3.max(props.data, function (d) { return d.y; })]);
        yScale.domain([0, 10]);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("y", height - 250)
            .attr("x", width - 100)
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Year");

        g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function (d) {
                return d;
            })
                .ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -100)
            .attr("y", 6)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Stock Price");

        let group = g.selectAll(".bar")
            .data(props.data);
        group
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return xScale(d.x); })
            .attr("y", function (d) { return yScale(d.y); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return height - yScale(d.y); });

        group
            .exit()
            .remove()
    }, [props.data]);
    return (
        <svg ref={ref} width="600" height="500"></svg>
    )
}

export default BarChart