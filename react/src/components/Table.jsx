/** @format */

import React, { useState, useEffect } from "react"
import { Table as SAntTable, Input, Button, Space } from "antd"
import Highlighter from "react-highlight-words"
import { SearchOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { API_URL } from "../utils/config"
import styled from "styled-components"
import tableData from "../utils/tableData"

const Div = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	a {
		color: ${props => (props.whiteColor ? "white" : "red")};
		font-family: ${props => props.theme.fontFamily};
	}
`

export default function Table() {
	const [state, setState] = useState({ searchText: "", searchedColumn: "" })
	let linkKeyClosure = ""
	const [data, setData] = useState(tableData)
	useEffect(() => {
		fetch(`${API_URL}/data/projects`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				const filteredData = data.map(row => {
					return {
						name: row.name,
					}
				})
				setData(filteredData)
				console.log(filteredData)
			})
			.catch(err => console.log(err))

		return () => null
	}, [])

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(
				`selectedRowKeys: ${selectedRowKeys}`,
				"selectedRows: ",
				selectedRows
			)
		},
		getCheckboxProps: record => ({
			disabled: record.name === "Disabled User",
			// Column configuration not to be checked
			name: record.name,
		}),
	}

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm()
		setState({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex,
		})
	}

	const handleReset = clearFilters => {
		clearFilters()
		setState({ searchText: "" })
	}

	const onChange = (pagination, filters, sorter, extra) => {
		console.log("params", pagination, filters, sorter, extra)
	}

	const getColumnSearchProps = (dataIndex, isLinked, linkKey) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					// ref = { node => this.searchInput = node }
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys, confirm, dataIndex)
					}
					style={{ width: 188, marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(selectedKeys, confirm, dataIndex)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: filtered => (
			<SearchOutlined
				style={{ color: filtered ? "#1890ff" : undefined }}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				? record[dataIndex]
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase())
				: "",
		// onFilterDropdownVisibleChange: visible => {
		//   if (visible) {
		//     setTimeout(() => this.searchInput.select(), 100);
		//   }
		// },
		render: (text, record) => {
			if (isLinked) {
				linkKeyClosure = linkKey
				return <a href={record[linkKeyClosure]}> {text} </a>
			} else if (state.searchedColumn === dataIndex) {
				return (
					<Highlighter
						highlightStyle={{
							backgroundColor: "#ffc069",
							padding: 0,
						}}
						searchWords={[state.searchText]}
						autoEscape
						textToHighlight={text ? text.toString() : ""}
					/>
				)
			} else {
				return text
			}
		},
	})

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			width: "30%",
			filters: [{ text: "zee", value: "zee" }],

			onFilter: (value, record) => record.name.indexOf(value) === 0,
			sorter: (a, b) => a.name.localeCompare(b.name),
			...getColumnSearchProps("name", true, "address"),
    },
    {
			title: "Owner",
			dataIndex: "owner",
			width: "20%",
			filters: [{ text: "zee", value: "zee" }],

			onFilter: (value, record) => record.name.indexOf(value) === 0,
			sorter: (a, b) => a.name.localeCompare(b.name),
			...getColumnSearchProps("name", true, "address"),
		},
    {
      title: "Country",
      dataIndex: "country",
      width: "15%",
      defaultSortOrder: "descend",
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ["descend", "ascend"],
    },
		{
			title: "Area",
			dataIndex: "area",
			width: "8.75%",
			defaultSortOrder: "descend",
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: "Output",
			dataIndex: "output",
			width: "8.75%",
			...getColumnSearchProps("address"),
		},
		{
			title: "Year",
			dataIndex: "year",
			width: "8.75%",
			...getColumnSearchProps("address"),
    },
    {
			title: "Location",
			dataIndex: "lat",
			width: "8.75%",
			...getColumnSearchProps("address"),
		}
	]

	return (
		<Div>
			<SAntTable
				// styles={{height:'100%'}}
				// bodyStyle={{ height: "100vh", overflow: "auto" }}
				columns={columns}
				// tableLayout="auto"
				title={() => (
					<h4
						style={{
							margin: "0px",
							padding: "0px",
							textAlign: "center",
						}}
					>
						Hello
					</h4>
				)}
				scroll={{ y: "300px" }}
				dataSource={data}
				onChange={onChange}
				pageSize={50}
				pagination={{
					defaultPageSize: 50,
					showQuickJumper: true,
				}}
				// rowSelection={{ type: "checkbox", ...rowSelection }}
			/>
		</Div>
	)
}
