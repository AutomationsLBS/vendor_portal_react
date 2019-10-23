import React, {Component, Fragment} from 'react';
import {
  Button,
  Grid,
  Menu,
  MenuList,
  MenuItem,
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel,
  Typography,
  IconButton,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  TextField
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Scrollbars} from 'react-custom-scrollbars';
import axios from 'axios';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import {callUsers} from '../../actions';
import store from '../../store';
import {getAllUsers} from '../../actions';
import ListComponent from '../employees/list';
import './visit.scss';

import DatePicker from 'react-datepicker';
import moment from 'moment';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel'
];

const ITEM_HEIGHT = 48;

export default class Visit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visitors: [],
      anchorEl: null,
      open: false,
      filter: {
		  open: false,
		  date:{}
      }
    }
    this.handleClick = this
      .handleClick
      .bind(this);
    this.handleClose = this
      .handleClose
      .bind(this);
    this.getVisitorsList = this
      .getVisitorsList
      .bind(this);
    this.handleToggle = this
      .handleToggle
      .bind(this);
  }
  componentWillMount() {}
  componentDidMount() {
    console.log("All Props", this.props);
    // this.getVisitorsList();
  }

  getVisitorsList() {
    axios
      .get(axios.getPosts())
      .then((response) => {
        // console.log("Employee Response", response);
        this.setState({visitors: response.data});
        // console.log("At First Response", this.state.visitors);
        store.dispatch(getAllUsers(response.data));
      })
      /* .then(allUsers =>
                  dispatch({
                    type: ALL_USERS,
                    users: allUsers
                  })
                ) */
      .catch(function (error) {
        console.log("At First Error", error);
      });
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleToggle = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({open: false});
  };
  toggleFilter = () => {
    let state = this.state.filter;
    state.open = !state.open
    if (state.open == false) {
      state.search = "";
      this.setState({filter: state});
    }
    this.setState({'filter': state});
  }
  renderFilter = () => {
    if (this.state.filter.open) {
      return (
        <Fragment>
          Rendering Filter
        </Fragment>
      )
    }
  }
  doFilter = (field) => {
    console.log("Filter Searching", field, this.state.filter[field]);
  }
  updateFilterField = (event, field) => {
    console.log("Updating Field", field, event);
    let state = this.state;
    state.filter[field] = event.target.value;
    this.setState(state)
  }
  handleSelectedDate = name => event => {
	 	console.log("Selected Date", name, event, moment(event).format("DD-MM-YYYY"));
	 	let state = this.state.filter;
		 state.date[name] = moment(event);
		this.setState(state);
  }
  doSearch = event => {
	  console.log("Searching", this.state.filter);
  }
  render() {
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);
    return (
      <Grid container className="visitContainer">
        <Grid container>
          <Grid item sm={6}>
            <Typography className="pageTitle titleSection" variant="title" gutterBottom>
              Visits Page
            </Typography>
          </Grid>
          <Grid item sm={6} align="right">
            <Button 	buttonRef={node => { this.anchorEl = node; }}
              			aria-owns={open ? 'menu-list-grow' : null}
              			aria-haspopup="true"
              			onClick={(event) => {
										this.handleClose(event);
										this.handleToggle();
										this.toggleFilter();
									}}>
              <FilterListIcon/>
            </Button>            
          </Grid>
			 <Grid item sm={12} className={(this.state.filter.open) 
																? "filterContainer active"
																: "filterContainer inactive"}>
				<Grid item className="filterContent">
					<div className="filterHeading">
						<b>Filter</b>
					</div>
					<div className="filterFields">
						<div className="filterItem">
							<label>Search</label>
							<input
							type="text"
							placeholder="Search"
							value={this.state.filter.search}
							onChange={event => {
								this.doFilter('search');
								this.updateFilterField(event, 'search');
							}}/>
						</div>
						<div className="filterItem">
							<label>Date</label>
							<div className="startDate">
								<DatePicker
								placeholderText="Start Date"
								selected={this.state.filter.date.start}
								onChange={this.handleSelectedDate('start')}
								dateFormat="DD-MM-YYYY"
								maxDate={this.state.filter.date.end}/>
							</div>
							<div className="endDate">
								<DatePicker
								placeholderText="End Date"
								selected={this.state.filter.date.end}
								onChange={this.handleSelectedDate('end')}
								dateFormat="DD-MM-YYYY"
								minDate={this.state.filter.date.start}/>
							</div>
						</div>
					</div>
					<div className="submitFilter margin-top-20">
							<button className="btn btn-primary" onClick={this.doSearch}>Filter</button>
					</div>
				</Grid>
          </Grid>
          <Grid item sm={12}>
            <ListComponent
              {...this.props}
              data={this.state.visitors}
              header={["id", "title", "body", "userId"]}/>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}