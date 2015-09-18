var Countdown = React.createClass({
  getInitialState: function() {
    var endDate = new Date(this.props.endsOn),
        secRemained = Math.floor((endDate.getTime() - (new Date().getTime())) / 1000);

    if (endDate < new Date()) {
      throw {
          name:        "endDate", 
          message:     "Invalid endDate.", 
          toString:    function(){return this.name + ": " + this.message;} 
      };
    }

    return {
      secondsRemained: secRemained
    };
  },
  
  componentDidMount: function() {
    this.setState(this.calculateTime(this.state.secondsRemained));
    var _this = this;
    this.timer = setInterval(function(){
      _this.state.secondsRemained -= 1;
      _this.setState(_this.calculateTime(_this.state.secondsRemained));
    }, 1000);
  },

  calculateTime: function(sec) {
    var days, hours, minutes, sec = this.state.secondsRemained;
    days = Math.floor(sec / 86400);
    sec -= days * 86400;
    
    hours = Math.floor(sec / 3600);
    sec -= hours * 3600;
    
    minutes = Math.floor(sec / 60);
    sec -= minutes * 60;
    
    return {
      days: days,
      hours: ('0' + hours).slice(-2),
      minutes: ('0' + minutes).slice(-2),
      seconds: ('0' + sec).slice(-2)
    };
  },

  render: function() {
    return <div>
      {(this.state.days > 0)
        ? <label>{this.state.days}</label>
        : null
      }
      {(this.state.days > 0)
        ? " days : "
        : null
      }
      <label>{this.state.hours}</label> : <label>{this.state.minutes}</label> : <label>{this.state.seconds}</label>
    </div>;
  }
 
});

React.render(<Countdown endsOn="12-31-2015 12:00:00"  />, document.body);