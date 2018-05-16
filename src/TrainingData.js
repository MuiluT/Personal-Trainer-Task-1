import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'moment';


class TrainingData extends Component
{

	constructor(props)
	{
	super(props);
	this.state = {
					trainings: [],
					requestFailed: false,
				 	};
	}

	//Once component mounts, it'll load the data
	componentDidMount()
	{
		this.loadData();
	}


	loadData = () =>
	{
		 fetch('https://customerrest.herokuapp.com/gettrainings')
			.then((response) =>
			{ if (!response.ok) //If the response is not ok
				{
				throw Error("Network request failed");
				}
				return response;
			})

			//Get the data in json form
			.then(data => data.json())
			.then((jsonedData) =>
				{
					this.setState({	trainings: jsonedData	});
					//return jsonedData;
				})

	}


	render() {
		return (
		<div>
			<br></br>
			<h1>Training Data</h1>
			<br></br>
		{/* Pass data into table */}
		 <ReactTable data={this.state.trainings}
				filterable

						/*	We filter the row data by what it included in the row
 				 		instead of what it begins with */
				defaultFilterMethod={(filter, row) =>
            (row[filter.id].toLowerCase().includes(filter.value.toLowerCase()))}
		    	columns=
					{[
		      			{
		              columns:
									[
		                {
		                  accessor: "links.self.href",
		                  show: false
		                },
		                {
											id: "fullname",
		                  Header: "Full name",
		                  accessor: trainingsData => trainingsData.customer.firstname +
																" " + trainingsData.customer.lastname,
		                },
		                {
		                  Header: "Activity",
		                  accessor: "activity",
		                },
		                {
											id: "date", //Needs id because our accessor is not a string
		                  Header: "Time of activity",
		                  accessor: trainingsData => Moment(trainingsData.date).format('L')
																								+ ", " +Moment(trainingsData.date).format('HH:mm')
																								+ " - " + Moment(trainingsData.date).add(trainingsData.duration, 'minutes').format('HH:mm a')
																								+ ",	" + trainingsData.duration + " minutes",
		                },
		              ]
		            }
		        ]}
		          className="-striped -highlight" >
		        </ReactTable>

		</div>
    );
  }


}

export default TrainingData;
