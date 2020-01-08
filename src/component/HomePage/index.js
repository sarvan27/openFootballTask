import React from 'react';
import { connect } from 'react-redux';
import { getTeams, getMatches } from '../../redux/actions';
import { Bubble } from 'react-chartjs-2';

class HomePage extends React.Component{
  constructor() {
    super();
    this.state = {
      chartData: []
    }
  }
  componentDidMount(){
    this.props.fetchTeams();
    this.props.fetchMatches();
  }

  UNSAFE_componentWillReceiveProps(prevProps, nexProps) {
    if(prevProps !== nexProps && prevProps.matches) {
      this.getJSONData(prevProps.matches)
    }
  }

  getJSONData = (matches) => {
    if(matches && matches.rounds) {
      let teamObj = {};
      matches.rounds.forEach(round => {
        round.matches.forEach(match => {
          if(teamObj[match.team1.key]) {
            if(match.score1 > match.score2) {
              teamObj[match.team1.key].data.x +=1;
            }else if(match.score1 < match.score2){
              teamObj[match.team1.key].data.y +=1; 
            } else {
              teamObj[match.team1.key].draw += 1
            }
            teamObj[match.team1.key].data.r += match.score1;
            teamObj[match.team1.key].against += match.score2;
          } else {
            teamObj[match.team1.key] = {
              label: match.team1,
              data: {
                x: 0,
                y: 0,
                r: 0
              },
              draw: 0,
              against: 0
            };
            if(match.score1 > match.score2) {
              teamObj[match.team1.key].data.x +=1;
            }else if(match.score1 < match.score2){
              teamObj[match.team1.key].data.y +=1; 
            } else {
              teamObj[match.team1.key].draw += 1
            }
            teamObj[match.team1.key].data.r += match.score1;
            teamObj[match.team1.key].against += match.score2;
          }
          if(teamObj[match.team2.key]) {
            if(match.score2 > match.score1) {
              teamObj[match.team2.key].data.x +=1;
            }else if(match.score2 < match.score1){
              teamObj[match.team2.key].data.y +=1; 
            } else {
              teamObj[match.team2.key].draw += 1
            }
            teamObj[match.team2.key].data.r += match.score2;
            teamObj[match.team2.key].against += match.score1;
          } else {
            teamObj[match.team2.key] = {
              label: match.team2,
              data: {
                x: 0,
                y: 0,
                r: 0
              },
              draw: 0,
              against: 0
            };
            if(match.score2 > match.score1) {
              teamObj[match.team2.key].data.x +=1;
            }else if(match.score2 < match.score1){
              teamObj[match.team2.key].data.y +=1; 
            } else {
              teamObj[match.team2.key].draw += 1
            }
            teamObj[match.team2.key].data.r += match.score2;
            teamObj[match.team2.key].against += match.score1;
          }
        })
      });
      const bgColor = ['#336699', '#99CCFF', '#999933', '#666699', '#CC9933', '#006666', '#3399FF', '#993300', '#CCCC99', '#666666', '#FFCC66', '#6699CC', '#663366', '#9999CC', '#CCCCCC', '#669999', '#CCCC66', '#CC6600', '#9999FF', '#0066CC'];
      let chartData = [];
      Object.keys(teamObj).forEach((teamKey,index) => {
        let bubObj = {
          label: teamObj[teamKey].label.code,
          data: [
            teamObj[teamKey].data
          ],
          backgroundColor:bgColor[index],
          totalMatches: teamObj[teamKey].draw+teamObj[teamKey].data.x+teamObj[teamKey].data.y,
          draw: teamObj[teamKey].draw,
          against: teamObj[teamKey].against
        }
        chartData.push(bubObj)
      })
      this.setState({
        chartData: chartData
      })
    }
  }

  bubbleChartUI = () => {
    const options = {
      maintainAspectRatio: false	// Don't maintain w/h ratio
    }
    const { chartData } = this.state;
    return(
      <Bubble 
        data={{
          datasets: chartData
        }}
        options={options}
      />
    )
  }

  tableUI = () => {
    let headers = ['Teams', 'Total Matches', 'Won', 'Lost', 'Ties', 'Total Goals Scored For', 'Total Goals Scored Against']
    const { chartData } = this.state;
    return(
      <table style={{ border: '1px solid lightgrey', width: '100%'}}>
        <thead>
          <tr>
            {headers.map((head, index) => (
              <th key={index} style={{ padding: '10px', borderBottom: '1px solid lightgrey'}}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chartData.map((team, index) => (
            <tr key={index} style={{textAlign: 'center'}}>
              <td style={{ padding: '10px', borderBottom: '1px solid lightgrey'}}>{team.label}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid lightgrey'}}>{team.totalMatches}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid lightgrey'}}>{team.data[0].x}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid lightgrey'}}>{team.data[0].y}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid lightgrey'}}>{team.draw}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid lightgrey'}}>{team.data[0].r}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid lightgrey'}}>{team.against}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render(){
    return(
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{fontSize: '28px', fontWeight: '600', padding: '20px 0'}}>
          {this.props.teams.name}
        </div>
        <div style={{ width: '900px', height: '400px', margin: '20px 0px'}}>
          {this.bubbleChartUI()}
        </div>
        <div style={{ width: '900px', height: '400px', margin: '20px 0px'}}>
          {this.tableUI()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  teams: state.openFB.teams,
  matches: state.openFB.matches
})

const mapDispatchToProps = dispatch => ({
  fetchTeams: () => dispatch(getTeams()),
  fetchMatches: () => dispatch(getMatches())
})

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);