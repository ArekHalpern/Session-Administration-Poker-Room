// src/components/TablesList.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTablesThunk } from '../store/tables';
import { Card, CardGroup, Container } from 'react-bootstrap';

const TablesList = ({ tables, getTables }) => {
  useEffect(() => {
    getTables();
  }, [getTables]);

  return (
    <Container className="mt-4">
      <CardGroup>
        {tables.map(table => (
          <Card key={table.id} className="mb-4">
            <Card.Body>
              <Card.Title>{table.name}</Card.Title>
              {/* <Card.Text>Status: {table.status}</Card.Text> */}
              <Card.Text>Seats: {table.seats}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    </Container>
  );
};

const mapStateToProps = state => ({
  tables: state.tables,
});

const mapDispatchToProps = dispatch => ({
  getTables: () => dispatch(getTablesThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TablesList);
