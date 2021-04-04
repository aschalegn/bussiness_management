import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import * as d3 from "d3";
import "./Statistics.css";
import { IAppointment, IService } from '../../../../interfaces';

export default function Statistics() {
    const d3Board = useRef(null);
    const [from_date, setFrom] = useState<String>("");
    const [to_date, setTo] = useState<String>("");
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [services, setServices] = useState<IService[]>([]);
    const width = 600, height = 300;

    useEffect(() => {
        getStat();
    }, []);

    useEffect(() => {
        if (appointments.length > 0 && services.length > 0) {
            drawBar(appointments, services);
        }
    }, [appointments, services]);

    const chart = d3.select(d3Board.current)
        .attr("width", width + 60)
        .attr("height", height + 80)

    const drawBar = (aps: IAppointment[], services: IService[]) => {
        let minDate = new Date(aps[0].date);
        let maxDate = new Date(aps[0].date);
        for (let i = 0; i < aps.length; i++) {
            const current = new Date(aps[i].date);
            if (current > maxDate) {
                maxDate = current;
            }
            if (current < minDate) {
                minDate = current;
            }
        };

        const xAxix = d3.scaleTime()
            .domain([minDate, maxDate])
            .range([0, width]);

        const yAxis = d3.scaleLinear()
            .domain([100, 0])
            .range([0, height]);

        chart.append("g")
            .attr('transform', `translate(20, ${height + 30})`)
            .call(d3.axisBottom(xAxix))
            .append("text")
            .text("תאריכים");

        chart.append("g")
            .attr("transform", "rotate(-90)")
            .attr("transform", "translate(20,30)")
            .style("text-anchor", "middle")
            .call(d3.axisLeft(yAxis));
    }

    const getStat = () => {
        axios.get(`/api/statistics?business_id=6028e4f2ed8a283230f4bc6c&from_date=2021-03-21&to_date=2021-03-26`)
            .then(res => {
                if (res.status === 200) {
                    setAppointments(res.data.dates);
                    setServices(res.data.services);
                }
            }).catch(err => {
                console.log(err);
            });
    };

    return (
        <section className="Statistics">
            <div>
                <h1> עמוד סטטיסטיקהה</h1>
                <form>
                    <div className="group">
                        <label htmlFor="from_date">החל מתאריך:</label>
                        <input type="date" name="from_date" id="from_date"
                            onChange={(e) => { setFrom(e.target.value) }} />
                    </div>
                    <div className="group">
                        <label htmlFor="to_date">עד תאריך:</label>
                        <input type="date" name="to_date" id="to_date"
                            onChange={(e) => { setTo(e.target.value) }} />
                    </div>
                </form>
                <button title="load chart" onClick={() => { drawBar(appointments, services) }}>Load Chart</button>
            </div>
            <svg ref={d3Board}></svg>
        </section>
    );
}
