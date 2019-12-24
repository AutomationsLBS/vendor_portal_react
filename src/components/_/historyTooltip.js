import React from "react"
import InfiniteScroll from "react-infinite-scroll-component";
const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };
  

export default class Tooltip extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        displayTooltip: false,
        items: Array.from({ length: 20 }),
        hasMore: true
      }
      this.hideTooltip = this.hideTooltip.bind(this)
      this.showTooltip = this.showTooltip.bind(this)
    }
    
    hideTooltip () {
      this.setState({displayTooltip: false})
      
    }
    showTooltip () {
      this.setState({displayTooltip: true})
    }
  
   
    fetchMoreData = () => {
        if (this.state.items.length >= 500) {
          this.setState({ hasMore: false });
          return;
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        setTimeout(() => {
          this.setState({
            items: this.state.items.concat(Array.from({ length: 20 }))
          });
        }, 500);
      };

    render() {
      let message = this.props.message
      let position = this.props.position
      return (
        <span className='tooltip'
            onMouseLeave={this.hideTooltip}
          >
          {this.state.displayTooltip &&
          <div className={`tooltip-bubble tooltip-${position}`}>
                       <InfiniteScroll
                                dataLength={this.state.items.length}
                                next={this.fetchMoreData}
                                hasMore={this.state.hasMore}
                                loader={<h4>Loading...</h4>}
                                height={400}
                                endMessage={
                                    <p style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all</b>
                                    </p>
                                }
                                >
                                {this.state.items.map((i, index) => (
                                    <div style={style} key={index}>
                                    div - #{index}
                                    </div>
                                ))}
                    </InfiniteScroll>
          </div>
          }
          <span 
            className='tooltip-trigger'
            onMouseOver={this.showTooltip}
            >
            {this.props.children}
          </span>
        </span>
      )
    }
  }