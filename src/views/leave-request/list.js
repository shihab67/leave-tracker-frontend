import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Badge from '@mui/joy/Badge';
import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getAllLeaves } from 'store/modules/adminLogin/adminLoginSlice';
import AuthContext from 'store/modules/authContext';
import { useAppDispatch } from 'store/reducer';
import MainCard from 'ui-component/cards/MainCard';

export default function LeaveList({ ...others }) {
  const sortIcon = <ArrowDownward />;
  const columns = [
    {
      name: '#',
      selector: (row) => row.serial
    },
    {
      name: 'Employee',
      selector: (row) => row.employee
    },
    {
      name: 'Leave Type',
      selector: (row) => row.leaveType
    },
    {
      name: 'Start Date',
      selector: (row) => row.startDate
    },
    {
      name: 'End Date',
      selector: (row) => row.endDate
    },
    {
      name: 'Status',
      selector: (row) => row.status
    },
    {
      name: 'Approved By',
      selector: (row) => row.approvedBy
    }
  ];
  const dispatch = useAppDispatch();
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState([]);

  const handleStats = (status) => {
    switch (status) {
      case 'pending':
        return (
          <Badge color="warning" size="md" variant="outlined">
            Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge color="success" size="md" variant="outlined">
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge color="danger" size="md" variant="outlined">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge color="warning" size="md" variant="outlined">
            Pending
          </Badge>
        );
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(
        getAllLeaves({
          token: authCtx.currentUser.token
        })
      );
      if (response.payload && response.payload.data && response.payload.data.length > 0) {
        const events = response.payload.data.map((leave, index) => {
          console.log(leave);
          return {
            serial: ++index,
            employee: leave.user.name,
            leaveType: leave.leave_type.name,
            startDate: leave.start_date,
            endDate: leave.end_date,
            status: handleStats(leave.status),
            approvedBy: leave.approved_by?.name
          };
        });
        setData(events);
      }
    };

    fetchData();
  }, [dispatch, authCtx.currentUser.token, setData]);
  return (
    <>
      <MainCard title="Leave List" {...others}>
        <Grid container>
          <Grid md={12} xs={12} item>
            <DataTable pagination responsive sortIcon={sortIcon} columns={columns} data={data} />
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}
