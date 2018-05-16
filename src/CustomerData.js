import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


class CustomerData extends Component
{

	constructor(props)
	{
	super(props);
	this.state = {
					customers: [],
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
		 fetch('https://customerrest.herokuapp.com/api/customers')
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
					this.setState({	customers: jsonedData.content	});
					//return jsonedData;
				})

				/* I wanted to join the data into one table so you could see
				name and activity with a collapsible data table on activities if there
				were more than one

			.then((linkData) =>
				{ //A personal link to the trainings
				this.setState({ urlLinks: linkData.content[0].links[2].href	});
			}) // Wanted to do another fetch and then combine to the customers state*/

	}


	render() {
		return (
		<div>
			<br></br>
			<h1>Customer Data</h1>
			<br></br>
			{/* Pass data into table */}
		 <ReactTable data={this.state.customers}
			 filterable

			 		/* We filter the row data by what it included in the row
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
                  show: false,
                },
								{
									id: "fullName",
									Header: "Full name",
									accessor: customerData => customerData.firstname +
														" " + customerData.lastname,
								},
                {
									id: "fullAddress",
                  Header: "Full address",
                  accessor: customerData => customerData.streetaddress +
														", " + customerData.postcode +
														", " + customerData.city,
                },
                {
                  Header: "E-mail",
                  accessor: "email",
                },
								{
                  Header: "Phone Number",
                  accessor: "phone",
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

export default CustomerData;
