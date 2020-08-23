import React, { Component } from "react";
import './Statistics.scss'
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import { bitcoinService } from "../../services/bitcoinService";
import { LoadingCmp } from "../../cmps/LoadingCmp/LoadingCmp";
export class Statistics extends Component {
  state = { marketData: null, avgData: null, tradeData: null };
  async componentDidMount() {
    const marketData = await bitcoinService.getMarketPrice();
    const avgData = await bitcoinService.getAvgBlockSize();
    const tradeData = await bitcoinService.getTradeData();
    this.setState({ marketData, avgData, tradeData });
  }

  render() {
    const { marketData, avgData, tradeData } = this.state;
    if (!marketData || !avgData || !tradeData) return <LoadingCmp />;
    return (
      <section className="statistics-page col-layout">
        <h1>Average USD market price across major bitcoin exchanges</h1>
        <Sparklines data={marketData}>
          <SparklinesLine style={{ stroke: "black", fill: "none" }} />
          <SparklinesSpots style={{ fill: "orange" }} />
        </Sparklines>
        <hr/>
        <h1>The average block size in MB</h1>
        <Sparklines data={avgData}>
          <SparklinesLine style={{ stroke: "black", fill: "none" }} />
          <SparklinesSpots style={{ fill: "orange" }} />
        </Sparklines>
        <h1>
          The total USD value of trading volume on major bitcoin exchanges.
        </h1>
        <Sparklines data={tradeData}>
          <SparklinesLine style={{ stroke: "black", fill: "none" }} />
          <SparklinesSpots style={{ fill: "orange" }} />
        </Sparklines>
      </section>
    );
  }
}
